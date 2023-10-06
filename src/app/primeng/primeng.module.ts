import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    DividerModule,
    TabViewModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToolbarModule,
    SidebarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TableModule,
    DialogModule,
    SlideMenuModule,
    InputMaskModule,
    ConfirmPopupModule,
    TooltipModule,
    ToggleButtonModule,
    DropdownModule,
    KeyFilterModule,
    CardModule,
    SkeletonModule,
    AutoCompleteModule
  ]
})
export class PrimengModule { }
