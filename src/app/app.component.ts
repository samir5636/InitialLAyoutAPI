import {Component, Inject, OnInit, PLATFORM_ID, ViewChild, AfterViewInit} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {SplitComponent} from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'apilotLayout';

  @ViewChild('mainSplit') mainSplit!: SplitComponent;
  @ViewChild('verticalSplit') verticalSplit!: SplitComponent;

  // Default split sizes
  sidebarSize: number = 20;
  mainContentSize: number = 60;
  toolsPanelSize: number = 20;

  // Vertical split settings
  requestPaneSize: number = 60;
  responsePaneSize: number = 40;
  panelMinSize: number = 20;

  // Flag to check if we're in browser
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadSplitSizes();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Use ResizeObserver to detect content changes
      const resizeObserver = new ResizeObserver(() => {
        this.adjustSplitSizes();
      });

      // Observe the request area for size changes
      const requestArea = document.querySelector('.request-editor');
      if (requestArea) {
        resizeObserver.observe(requestArea);
      }

      // Also observe the key-value tables for changes
      const tables = document.querySelectorAll('.key-value-table');
      tables.forEach(table => {
        resizeObserver.observe(table);
      });
    }
  }

  private adjustSplitSizes() {
    if (!this.isBrowser || !this.verticalSplit) return;

    const requestArea = document.querySelector('.request-editor');
    if (!requestArea) return;

    const requestHeight = requestArea.scrollHeight;
    const containerHeight = requestArea.parentElement?.clientHeight || 0;

    // If content height is greater than container height, adjust split sizes
    if (requestHeight > containerHeight) {
      // Calculate new sizes based on content
      const totalHeight = requestHeight + (this.responsePaneSize * containerHeight / 100);
      const newRequestSize = (requestHeight / totalHeight) * 100;
      const newResponseSize = 100 - newRequestSize;

      // Update split sizes with minimum and maximum constraints
      this.requestPaneSize = Math.min(Math.max(newRequestSize, 20), 80);
      this.responsePaneSize = 100 - this.requestPaneSize;

      // Update the split sizes using dragEnd event
      this.onVerticalDragEnd({
        sizes: [this.requestPaneSize, this.responsePaneSize]
      });
    }
  }

  onHorizontalDragEnd(event: any) {
    if (!event.sizes || event.sizes.length !== 3 || !this.isBrowser) return;

    this.sidebarSize = Number(event.sizes[0]);
    this.mainContentSize = Number(event.sizes[1]);
    this.toolsPanelSize = Number(event.sizes[2]);
    localStorage.setItem('horizontalSplitSizes', JSON.stringify(event.sizes));
  }

  onVerticalDragEnd(event: any) {
    if (!event.sizes || event.sizes.length !== 2 || !this.isBrowser) return;

    this.requestPaneSize = Number(event.sizes[0]);
    this.responsePaneSize = Number(event.sizes[1]);
    localStorage.setItem('verticalSplitSizes', JSON.stringify(event.sizes));
  }

  private loadSplitSizes() {
    if (!this.isBrowser) return;

    try {
      const horizontalSizesStr = localStorage.getItem('horizontalSplitSizes');
      if (horizontalSizesStr) {
        const sizes = JSON.parse(horizontalSizesStr);
        if (sizes && sizes.length === 3) {
          this.sidebarSize = Number(sizes[0]);
          this.mainContentSize = Number(sizes[1]);
          this.toolsPanelSize = Number(sizes[2]);
        }
      }

      const verticalSizesStr = localStorage.getItem('verticalSplitSizes');
      if (verticalSizesStr) {
        const sizes = JSON.parse(verticalSizesStr);
        if (sizes && sizes.length === 2) {
          this.requestPaneSize = Number(sizes[0]);
          this.responsePaneSize = Number(sizes[1]);
        }
      }
    } catch (e) {
      console.error('Failed to parse split sizes from localStorage', e);
    }
  }
}
