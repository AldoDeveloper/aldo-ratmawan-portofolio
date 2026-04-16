import React, { useState, useRef, useEffect } from "react";

export interface DropdownItem {
  label: string;
  onClick: () => void | Promise<void>;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface DropdownProps {
  children: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  position?: "left" | "right";
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  position = "right",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = async (onClick: () => void | Promise<void>) => {
    try {
      await onClick();
      setIsOpen(false);
    } catch (error) {
      console.error("Error executing dropdown item action:", error);
    }
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className={`${buttonClassName} ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {children}
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute z-[1000] mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-slate-300 ring-opacity-5 focus:outline-none ${
            position === "left" ? "left-0" : "right-0"
          } ${dropdownClassName}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-2 divide-y divide-gray-200" role="none">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.onClick)}
                disabled={item.disabled}
                className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                } ${item.className}`}
                role="menuitem"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;