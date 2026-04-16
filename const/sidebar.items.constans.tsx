import { SidebarItemProps } from "@/components/sidebar/interface";

import {
  BsFileEarmarkCode,
  BsHouseDoor,
  BsBackpack2,
  BsGraphUpArrow,
  BsBagCheck,
  BsBox,
  BsCalendar2,
  BsGear,
  BsPerson,
  BsImages,
  BsFolder,
  BsBriefcase,
  BsTools,
  BsStars,
} from "react-icons/bs";

import { FaBlog, FaUserShield, FaProjectDiagram } from "react-icons/fa";

export const sidebarItems: SidebarItemProps[] = [
  {
    title: "Dashboard",
    childrens: [
      {
        label: "Achievement",
        icon: <BsStars size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "/dashboard/achievements"
      },
      {
        label: "Profile",
        icon: <BsPerson size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Expertise",
        icon: <BsTools size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "/dashboard/expertise"
      },
      {
        label: "Blog",
        icon: <FaBlog size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "/dashboard/articles"
      },
      {
        label: "Certification",
        icon: <FaUserShield size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Contact",
        icon: <BsPerson size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Education",
        icon: <BsBackpack2 size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Experience",
        icon: <BsBriefcase size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Images",
        icon: <BsImages size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Open Source",
        icon: <BsFolder size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Project",
        icon: <FaProjectDiagram size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Services",
        icon: <BsGear size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Skills",
        icon: <BsGraphUpArrow size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      },
      {
        label: "Users",
        icon: <BsPerson size={18} className="fill-gray-700 dark:fill-gray-300"/>,
        href: "#"
      }
    ]
  }
];