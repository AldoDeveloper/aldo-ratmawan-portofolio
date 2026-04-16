import React from "react";
import { SidebarItemProps } from "./interface";
import { BsChevronRight } from "react-icons/bs";
import { motion } from "motion/react"
import Link from "next/link";

export const SidebarChild: React.FC<SidebarItemProps> = ({
  label,
  title,
  icon,
  className,
  style,
  onClick,
  to,
  hierarchy,
  href,
  render,
  childrens,
}) => {
  const animation = {
    hidden: { opacity: 0, y: 0, height: 0 },
    enter: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
  };

  const RenderChild: React.FC<{ child: SidebarItemProps }> = ({ child }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <li
        className="block mb-4 text-[14px] font-semibold text-gray-600"
        // key={index}
      >
        <div className="relative">
          {isOpen && (
            <>
              {child.childrens && child.childrens.length > 0 && (
                <div className="absolute w-[1.1px] bg-gray-300 inset-y-0 left-2 top-6" />
              )}
            </>
          )}
          <Link
            onClick={child.href ? undefined : () => setIsOpen(!isOpen)}
            className={`relative`}
            href={child.href ?? (undefined as any)}
          >
            <div className="flex items-center space-x-3">
              {child.icon && <span className="">{child.icon}</span>}
              <span className="block font-normal">{child.label}</span>
            </div>
            {child.childrens && child.childrens.length > 0 && (
              <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <BsChevronRight
                  className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                />
              </span>
            )}
          </Link>
          <motion.div
            variants={animation}
            initial={"hidden"}
            animate={isOpen ? "enter" : "exit"}
            exit={"exit"}
            className={`w-full`}
          >
            {child.childrens && child.childrens.length > 0 && (
              <div
                className={`ml-5 transition-all duration-300 transform ${isOpen ? "mt-3" : ""}`}>
                {child.childrens.map((item, idx) =>  <SidebarChild key={idx} {...item} /> )}
              </div>
            )}
          </motion.div>
        </div>

        {/*{
                   child?.to && !child?.href && (
                     <Link className='' href={ child.to }>
                       <div className='flex items-center space-x-3'>
                         {icon && <span>{icon}</span>}
                         <span className='block font-normal'>{child.label}</span>
                       </div>
                     </Link>
                   )
                 }*/}
      </li>
    );
  }

  return (
    <React.Fragment>
      <ul>
        <div>
          {childrens?.map((child, index) => <RenderChild key={index} child={child}/>)}
        </div>
      </ul>
    </React.Fragment>
  );
};