import React from "react";
import { AchievementList } from "../../components/achievement/AchievementList";

export default function AchievementPage() {
  return (
    <React.Fragment>
      <AchievementList />
    </React.Fragment>
  );
};

AchievementPage.getLayoutDashboard = function(page: any){
    return page;
}

