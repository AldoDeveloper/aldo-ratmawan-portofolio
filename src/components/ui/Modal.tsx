import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: string | React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEsc, onClose]);

  // Handle click outside modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 z-[10000] transition-all duration-400 flex items-center justify-center p-4 bg-gray-900/50"
      style={{ zIndex: 10000 }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`
          relative flex flex-col w-full slide-up duration-500 max-h-[90vh] bg-white rounded-xl shadow-xl
          ${sizeClasses[size]}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {title && (
          <div
            className={`
              flex items-center justify-between px-6 py-4 border-b border-gray-200
              ${headerClassName}
            `}
          >
            {typeof title === "string" ? (
              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-500"
              >
                {title}
              </h3>
            ) : (
              <div id="modal-title">{title}</div>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div
          className={`
            flex-1 overflow-y-auto p-6
            ${bodyClassName}
          `}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={`
              px-6 py-4 border-t border-gray-200
              ${footerClassName}
            `}
          >
            {typeof footer === "string" ? (
              <p className="text-gray-600">{footer}</p>
            ) : (
              footer
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;