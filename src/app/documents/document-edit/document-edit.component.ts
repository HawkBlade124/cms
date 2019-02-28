import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model'
import { NgForm } from '@angular/forms'
@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') dlForm: NgForm;
  id: string;
  originalDocument: Document;
  document: Document;
  editMode = false;
  editedDocument: Document;
  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          // this.editMode = params['id'] != null;
          if (!this.id){
            this.editMode = false;
            return;
          }
          
          this.originalDocument = this.documentService.getDocument(this.id);

          if(!this.originalDocument){
           return;
          }

          this.editMode = true;

          this.document = JSON.parse(JSON.stringify(this.originalDocument));
  });
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newDocument = new Document(value.id,value.name,value.description,value.url);
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else{
      this.documentService.addDocument(newDocument);
    }
    this.editMode = false;
    form.reset();
    this.onCancel();
    this.router.navigate['/documents'];
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }



}
