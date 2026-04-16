import React from "react";
import { EducationList } from "../../components/education/EducationList";

export default function EducationPage() {
  return (
    <React.Fragment>
      <EducationList />
    </React.Fragment>
  );
};

EducationPage.getLayoutDashboard = function(page: any){
    return page;
}
