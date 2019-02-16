import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { ContactViewComponent } from './contacts/contact-view/contact-view.component';

const routes: Routes = [
  { path: '',  redirectTo: '/documents', pathMatch: 'full'},
  { path: 'documents', component: DocumentsComponent, children:[
    { path:'', component: DocumentViewComponent },
    { path:'new', component: DocumentEditComponent },
    { path:':id', component: DocumentDetailComponent },
    { path:':id/edit', component:DocumentEditComponent }
  ]},
  { path: 'message-list', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent, children:[
    { path: '', component: ContactViewComponent},
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactsDetailComponent},
    { path: ':id/edit', component: ContactEditComponent}
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
