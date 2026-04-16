import React, { useState, forwardRef, InputHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  variant?: "filled" | "outlined" | "flushed";
  inputClassName?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      fullWidth = false,
      variant = "outlined",
      inputClassName = "",
      className = "",
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determine the base classes based on variant
    const getVariantClasses = () => {
      const baseClasses = "px-4 py-3 text-base transition-all duration-200";

      switch (variant) {
        case "filled":
          return `${baseClasses} bg-gray-100 border border-gray-100 rounded-lg focus:bg-white focus:border-blue-500`;
        case "flushed":
          return `${baseClasses} bg-transparent border-b-2 border-gray-300 rounded-none focus:border-blue-500`;
        default: // outlined
          return `${baseClasses} bg-white border border-gray-300 rounded-lg focus:border-blue-500`;
      }
    };

    // Determine border color based on state
    const getBorderColor = () => {
      if (error) return "border-red-500 focus:border-red-500";
      if (success) return "border-green-500 focus:border-green-500";
      if (isFocused) return "border-blue-500";
      return "";
    };

    // Determine text color based on state
    const getTextColor = () => {
      if (error) return "text-red-500";
      if (success) return "text-green-500";
      return "text-gray-700";
    };

    // Combine all input classes
    const combinedInputClasses = `
      ${getVariantClasses()}
      ${getBorderColor()}
      ${inputClassName}
      ${props.disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
      placeholder-gray-400
      text-gray-600
      outline-none
      focus:ring-1
      focus:ring-blue-300
      w-full
    `.trim();

    // Container classes
    const containerClasses = `
      ${className}
      ${fullWidth ? "w-full" : ""}
    `.trim();

    return (
      <div className={containerClasses}>
        {label && (
          <label className={`block text-sm font-medium mb-1 ${getTextColor()}`}>
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={combinedInputClasses}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Status icons */}
          {error && (
            <div className="absolute z-0 inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {success && !error && (
            <div className="absolute z-0 inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(helperText || error) && (
          <p
            className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;