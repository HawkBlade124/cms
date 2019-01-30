import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] =[
    new Document(1,"CIT 260 - Object Oriented Programming","Learn how to code Java programs","https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html"),

    new Document(2,"CIT 366 - Full Web Stack Development","This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.","https://content.byui.edu/file/ff3b043e-d5d2-4682-948d-06970f7db5fa/2/CIT 336 Syllabus.html"),

    new Document(3, "CIT 425 - Data Warehousing", "This course defines the theory and practice of data analysis. The course will compare and contrast the operational and analytical database models. Students will learn how to define, implement and query a database warehouse by leveraging sample data warehouses built from Enterprise Resource Planning (ERP) and Customer Resource Management (CRM) solutions.", "https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html" ),

    new Document(4, "CIT 230 - Web Frontend Development", "This course focuses on the planning and development of web sites using HTML, CSS, JavaScript and PHP with attention to usability principles.", "https://content.byui.edu/file/5272f5f7-2cdc-44ce-9861-8ac68276c3d7/5/cit230syllabus.html" )
  ]

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
