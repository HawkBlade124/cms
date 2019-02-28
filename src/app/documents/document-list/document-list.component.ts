import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { Subscription } from 'rxjs';

=======
import { Subscription } from 'rxjs/Subscription';
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
<<<<<<< HEAD
export class DocumentListComponent implements OnInit {
=======
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
  documents: Document[] =[];
  private subscription: Subscription;

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
<<<<<<< HEAD
    this.documentService.documentListChangedEvent.subscribe(
=======
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b
      (documents: Document[]) =>
      this.documents = documents
      );
  }
  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

<<<<<<< HEAD

=======
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b

}
