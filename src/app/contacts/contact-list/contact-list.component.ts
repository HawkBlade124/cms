<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
=======
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
<<<<<<< HEAD

=======
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
<<<<<<< HEAD
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
=======
    this.subscription = this.contactService.contactSelectedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
}
