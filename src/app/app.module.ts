import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { WindRefService } from './wind-ref.service';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactViewComponent } from './contacts/contact-view/contact-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'node_modules/ng2-dnd';
import { MessagesService } from './messages/messages.service';
import { DocumentsService } from './documents/documents.service';
import { ContactService } from './contacts/contact.service';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    DocumentListComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentViewComponent,
    DocumentEditComponent,
    ContactEditComponent,
    ContactViewComponent,
    ContactListComponent,
    ContactsFilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
