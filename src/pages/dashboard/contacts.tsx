import React from "react";
import { ContactList } from "../../components/contact/ContactList";

export default function ContactPage() {
  return (
    <React.Fragment>
      <ContactList />
    </React.Fragment>
  );
};

ContactPage.getLayoutDashboard = function(page: any){
    return page;
}
