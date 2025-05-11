import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { FolderItemComponent } from './folder-item/folder-item.component';
import { RequestItemComponent } from './request-item/request-item.component';
import { ImportCollectionComponent } from './import-collection/import-collection.component';


@NgModule({
  declarations: [
    CollectionListComponent,
    CollectionItemComponent,
    FolderItemComponent,
    RequestItemComponent,
    ImportCollectionComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
