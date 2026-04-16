import React from "react";
import { OpenSourceList } from "../../components/opensource/OpenSourceList";

export default function OpenSourcePage() {
  return (
    <React.Fragment>
      <OpenSourceList />
    </React.Fragment>
  );
};

OpenSourcePage.getLayoutDashboard = function(page: any){
    return page;
}
