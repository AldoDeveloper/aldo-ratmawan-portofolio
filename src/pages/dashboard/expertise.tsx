import React from "react";
import { ExpertiseList } from "../../components/expertise/ExpertiseList";

export default function ExpertisePage() {
  return (
    <React.Fragment>
      <ExpertiseList />
    </React.Fragment>
  );
};

ExpertisePage.getLayoutDashboard = function(page: any){
    return page;
}
