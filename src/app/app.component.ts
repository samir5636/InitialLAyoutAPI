import { Component, OnInit } from '@angular/core';
import {LayoutModule} from './layout/layout.module';
import {SplitAreaComponent, SplitComponent} from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    LayoutModule,
    SplitComponent,
    SplitAreaComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'apilotLayout';

  // Default split sizes
  sidebarSize = 20;
  mainContentSize = 60;
  toolsPanelSize = 20;

  // Vertical split settings
  requestPaneSize = 60;
  responsePaneSize = 40;

  ngOnInit() {
    // Load saved split sizes from localStorage if available
    this.loadSplitSizes();
  }

  // Save current split sizes when they change
  onHorizontalDragEnd(sizes: number[]) {
    if (sizes && sizes.length === 3) {
      this.sidebarSize = sizes[0];
      this.mainContentSize = sizes[1];
      this.toolsPanelSize = sizes[2];

      localStorage.setItem('horizontalSplitSizes', JSON.stringify(sizes));
    }
  }

  onVerticalDragEnd(sizes: number[]) {
    if (sizes && sizes.length === 2) {
      this.requestPaneSize = sizes[0];
      this.responsePaneSize = sizes[1];

      localStorage.setItem('verticalSplitSizes', JSON.stringify(sizes));
    }
  }

  private loadSplitSizes() {
    // Load horizontal split sizes
    const horizontalSizesStr = localStorage.getItem('horizontalSplitSizes');
    if (horizontalSizesStr) {
      try {
        const sizes = JSON.parse(horizontalSizesStr);
        if (sizes && sizes.length === 3) {
          this.sidebarSize = sizes[0];
          this.mainContentSize = sizes[1];
          this.toolsPanelSize = sizes[2];
        }
      } catch (e) {
        console.error('Failed to parse horizontal split sizes from localStorage');
      }
    }

    // Load vertical split sizes
    const verticalSizesStr = localStorage.getItem('verticalSplitSizes');
    if (verticalSizesStr) {
      try {
        const sizes = JSON.parse(verticalSizesStr);
        if (sizes && sizes.length === 2) {
          this.requestPaneSize = sizes[0];
          this.responsePaneSize = sizes[1];
        }
      } catch (e) {
        console.error('Failed to parse vertical split sizes from localStorage');
      }
    }
  }
}
