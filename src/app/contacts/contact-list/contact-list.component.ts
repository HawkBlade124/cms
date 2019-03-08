import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactsFilterPipe } from '../contacts-filter.pipe';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string;
  private subscription: Subscription;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactSelectedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }
  onKeyPress(value:string){
    this.term = value
  }
  filteredStatus = '';

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
