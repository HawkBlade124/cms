import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] =[];
  private subscription: Subscription;

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) =>
      this.documents = documents
      );
  }
  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }



}
