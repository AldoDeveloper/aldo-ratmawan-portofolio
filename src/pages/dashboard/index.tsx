import React from "react";
import { DashboardIndex } from "@/components/dashboard/Index";

export default function Dashboard() {
    return <DashboardIndex/>
}

Dashboard.getLayoutDashboard = function(page: any){
    return page;
}