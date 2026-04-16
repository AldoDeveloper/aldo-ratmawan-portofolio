import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {header && (
        <div className="border-b border-gray-200 px-6 py-4">{header}</div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4">{footer}</div>
      )}
    </div>
  );
};

export default Card;