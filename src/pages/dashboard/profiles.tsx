import React from "react";
import { ProfileList } from "../../components/profile/ProfileList";

export default function ProfilePage() {
  return (
    <React.Fragment>
      <ProfileList />
    </React.Fragment>
  );
};

ProfilePage.getLayoutDashboard = function(page: any){
    return page;
}
