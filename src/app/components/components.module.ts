import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DialogConfirmComponent,
    // ChipInputComponent,
    // MyLoaderComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DialogConfirmComponent
  ]
})
export class ComponentsModule { }
