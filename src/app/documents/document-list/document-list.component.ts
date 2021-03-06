import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  documents: Document[] =[];

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) =>
      this.documents = documents
      );
      this.documentService.getDocuments();
     }
  onNewDocument() {

    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
