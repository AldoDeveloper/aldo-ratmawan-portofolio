import React from "react";
import { ExperienceList } from "../../components/experience/ExperienceList";

export default function ExperiencePage() {
  return (
    <React.Fragment>
      <ExperienceList />
    </React.Fragment>
  );
};

ExperiencePage.getLayoutDashboard = function(page: any){
    return page;
}
