import React from "react";
import { ContactList } from "../../components/contact/ContactList";
import { NextPageContext } from "next";

export default function ContactPage() {
  return (
    <React.Fragment>
      <ContactList />
    </React.Fragment>
  );
};

ContactPage.getLayoutDashboard = function(page: any){
    return page;
};

ContactPage.getInitialProps = async(ctx: NextPageContext) => {
  console.log(ctx)
  return {}
}