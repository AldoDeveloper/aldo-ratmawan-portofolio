import React from "react";
import { CertificationList } from "../../components/certification/CertificationList";

export default function CertificationPage() {
  return (
    <React.Fragment>
      <CertificationList />
    </React.Fragment>
  );
};

CertificationPage.getLayoutDashboard = function(page: any){
    return page;
}
