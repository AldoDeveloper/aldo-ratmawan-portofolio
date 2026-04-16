import React from "react";
import { ArticleList } from "../../components/article/ArticleList";

export default function ArticlePage() {
  return (
    <React.Fragment>
      <ArticleList />
    </React.Fragment>
  );
};

ArticlePage.getLayoutDashboard = function(page: any){
    return page;
}
