import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-area',
  standalone: false,
  templateUrl: './tabs-area.component.html',
  styleUrl: './tabs-area.component.css'
})
export class TabsAreaComponent {
  get activeTab(): string {
    return this._activeTab;
  }

  set activeTab(value: string) {
    this._activeTab = value;
  }
  private _activeTab: any;
  baseUrl: any;

}
