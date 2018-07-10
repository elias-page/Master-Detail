import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../shared/contact.service";
import { Contact } from "../shared/contact.model";
@Component({
  selector: "app-employee-contact",
  templateUrl: "./employee-contact.component.html",
  styleUrls: ["./employee-contact.component.css"]
})
export class EmployeeContactComponent implements OnInit {
  contacts: Contact[];
  currentContact: Contact;



  constructor(private contactService: ContactsService) {}

  ngOnInit() {
this.getContacts()

  }

  getContacts() {
    this.contactService.getAllContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

selectContact(contact) {
  this.currentContact = contact;
}

cancel(contact) {
    this.reset();
}
reset() {
  this.currentContact = {
    id: null,
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };
}

  save(contact) {
if(contact.id) {
  this.updateContact(contact);
} else {
  this.createContact(contact);
}
  }
  createContact(contact) {
this.contactService.create(contact)
  .subscribe(create => {
    this.contacts.push(contact);
    this.getContacts();
    this.reset();
  });
  }
  updateContact(contact) {
this.contactService.update(contact)
  .subscribe(update => {
    this.getContacts();
    this.reset();

  });

  }
  deleteContact(contact) {
    this.contactService.delete(contact.id)
      .subscribe(deleted => {
        this.getContacts();
        this.reset();
      });
  }

}
