import React from "react";
import { SidebarProps } from "./interface";
import classNames from 'classnames'
import { SidebarItem } from "./sidebar.items";

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  size = "sm",
  isVisible = true,
  sidebarFooter,
  sidebarHeader,
  style,
  onClick,
  items,
}) => {
  const classNameOption = classNames({
    "w-[18.5rem]": size === "md",
    "w-[25rem]": size === "lg",
    "w-64": size === "sm",
  });

  const sidebarFooterElement = () => {
    if (!sidebarFooter) return null;
    return <div className="w-full p-2">{sidebarFooter()}</div>;
  };

  const sidebarHeaderElement = () => {
    if (!sidebarHeader) return null;
    return (
      <div className="w-full border-b border-b-gray-200 p-2">
        {sidebarHeader()}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        className={`flex flex-col h-screen bg-white transition-all duration-300 transform border-r border-r-gray-200 ${classNameOption} ${className}`}
      >
        {sidebarHeader && (
          <div id="sidebar-header">{sidebarHeaderElement()}</div>
        )}

        <div className="flex-1 overflow-y-scroll disabled-scrool">
          <aside>
            <ul className="list-none p-2">
              {items?.map((item, index) => (
                <SidebarItem {...item} key={index} />
              ))}
            </ul>
          </aside>
        </div>
        <div>
          {sidebarFooter && (
            <div className="w-full border-t border-t-gray-200 p-2">
              {sidebarFooterElement()}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};