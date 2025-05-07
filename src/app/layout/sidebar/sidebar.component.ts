// src/app/layout/sidebar/sidebar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeNavItem: string = 'collections';

  setActiveNavItem(item: string) {
    this.activeNavItem = item;
  }
}
