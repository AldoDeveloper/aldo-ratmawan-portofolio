import React from "react";
import { SidebarItemProps } from "./interface";
import { SidebarChild } from './sidebar.child'

export const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  ...props
}) => {
  return (
    <React.Fragment>
      {title && (
        <div className="px-2 py-1">
          <span className="block font-semibold text-gray-600 mb-4 text-[14px]">
            {title}
          </span>
          <SidebarChild title={title} {...props} />
        </div>
      )}
      {/*{!title && <SidebarChild {...props} />}*/}
    </React.Fragment>
  );
};