import React from "react";

export interface SidebarItemProps {
  label?: string | React.ReactNode;
  title?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  className?: string;
  style?: React.ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLLIElement>) => void;
  to?: string;
  href?: string;
  hierarchy?: boolean;
  render?: (item: SidebarItemProps) => React.ReactNode;
  childrens?: Array<SidebarItemProps>;
}

export interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  onClick  ?: (ev: any) => void;
  isVisible?: boolean;
  sidebarHeader?: () => React.ReactNode | React.ReactNode;
  sidebarFooter?: () => React.ReactNode;
  items: Array<SidebarItemProps>;
}