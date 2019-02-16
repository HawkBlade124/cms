import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { documentChangedEvent } from '../documents.service'
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] =[];

  constructor(private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    // private dChange: documentChangedEvent
    ) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    // this.dChange.subscribe(
    //   (document: Document) =>
    //   this.dChange = document
    //   );
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
