import React, { useState, useRef, useEffect } from "react";
import { BsX } from "react-icons/bs";

export interface Option {
  value: string | number;
  label: string;
}

// Define async function type
type LoadOptionsFunction = (inputValue: string) => Promise<Option[]>;

interface SelectProps {
  options?: Option[];
  value: string | number | (string | number)[];
  onChange: (
    value: string | number | (string | number)[],
  ) => void | Promise<void>;
  onSearch?: (searchTerm: string) => void | Promise<void>;
  placeholder?: string;
  isMulti?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  labelRequired?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  label?: string;

  // Async options props
  loadOptions?: LoadOptionsFunction;
  isAsync?: boolean;
  cacheOptions?: boolean;
  defaultOptions?: Option[]; // Default options to show before async loading
}

const Select: React.FC<SelectProps> = ({
  options: initialOptions = [],
  value,
  onChange,
  onSearch,
  placeholder = "Select...",
  isMulti = false,
  isLoading = false,
  disabled = false,
  labelRequired = "This field is required",
  required = false,
  error,
  className = "",
  inputClassName = "",
  label,
  loadOptions,
  isAsync = false,
  cacheOptions = true,
  defaultOptions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [asyncOptions, setAsyncOptions] = useState<Option[]>([]);
  const [loadingAsync, setLoadingAsync] = useState(false);
  const [optionsCache, setOptionsCache] = useState<Record<string, Option[]>>(
    {},
  );
  const [hasLoadedAsyncOptions, setHasLoadedAsyncOptions] = useState(false); // Track if async options have been loaded
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch async options when dropdown opens or search term changes
  useEffect(() => {
    if (!isAsync || !loadOptions || !isOpen) return;

    const fetchOptions = async (searchValue: string) => {
      // Check if we have cached options for this search term
      if (cacheOptions && optionsCache[searchValue]) {
        setAsyncOptions(optionsCache[searchValue]);
        setHasLoadedAsyncOptions(true);
        return;
      }

      setLoadingAsync(true);
      try {
        const results = await loadOptions(searchValue);
        setAsyncOptions(results);
        setHasLoadedAsyncOptions(true);

        if (cacheOptions) {
          setOptionsCache((prev) => ({
            ...prev,
            [searchValue]: results,
          }));
        }
      } catch (err) {
        console.error("Error loading async options:", err);
        setAsyncOptions([]);
        setHasLoadedAsyncOptions(true);
      } finally {
        setLoadingAsync(false);
      }
    };

    fetchOptions(searchTerm);
  }, [isOpen, searchTerm, isAsync, loadOptions, cacheOptions, optionsCache]);

  // Filter options based on search term (check both label and value)
  const filteredOptions = isAsync
    ? // If we haven't loaded async options yet and have default options, show default options
      !hasLoadedAsyncOptions && defaultOptions.length > 0
      ? defaultOptions.filter((option) => {
          const searchLower = searchTerm.toLowerCase();
          const labelMatch = option?.label
            ?.toLowerCase()
            ?.includes(searchLower);
          const valueMatch = option?.value
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchLower);
          return labelMatch || valueMatch;
        })
      : asyncOptions.filter((option) => {
          const searchLower = searchTerm.toLowerCase();
          const labelMatch = option?.label
            ?.toLowerCase()
            ?.includes(searchLower);
          const valueMatch = option?.value
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchLower);
          return labelMatch || valueMatch;
        })
    : initialOptions.filter((option) => {
        const searchLower = searchTerm.toLowerCase();
        const labelMatch = option?.label?.toLowerCase()?.includes(searchLower);
        const valueMatch = option?.value
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchLower);
        return labelMatch || valueMatch;
      });

  // Handle selection
  const handleSelect = (selectedValue: string | number) => {
    if (isMulti) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(selectedValue)
        ? currentValue.filter((v) => v !== selectedValue)
        : [...currentValue, selectedValue];
      onChange(newValue);
    } else {
      onChange(selectedValue);
      setIsOpen(false);
    }
  };

  // Remove selected item in multi mode
  const removeItem = (itemValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMulti && Array.isArray(value)) {
      const newValue = value.filter((v) => v !== itemValue);
      onChange(newValue);
    }
  };

  // Get display text for the select button
  const getDisplayText = () => {
    if (isLoading || loadingAsync) return "Loading...";
    if (isMulti && Array.isArray(value) && value.length > 0) {
      return `${value.length} item(s) selected`;
    }
    if (!isMulti && value !== undefined && value !== null && value !== "") {
      // Look for the selected option in async options, default options, or initial options
      let selectedOption;
      if (isAsync) {
        selectedOption =
          asyncOptions.find((option) => option.value === value) ||
          defaultOptions.find((option) => option.value === value);
      } else {
        selectedOption = initialOptions.find(
          (option) => option.value === value,
        );
      }
      return selectedOption ? selectedOption.label : placeholder;
    }
    return placeholder;
  };

  // Check if field is empty (for required validation)
  const isEmpty = () => {
    if (isMulti) {
      return !Array.isArray(value) || value.length === 0;
    }
    return value === undefined || value === null || value === "";
  };

  // Determine border color based on state
  const getBorderColor = () => {
    if (error) return "border-red-500 focus:border-red-500 ring-red-200";
    if (required && isEmpty())
      return "border-red-500 focus:border-red-500 ring-red-200";
    if (isOpen) return "border-blue-500 ring-2 ring-blue-200";
    return "border-gray-300";
  };

  // Render selected items in multi mode
  const renderSelectedItems = () => {
    if (!isMulti || !Array.isArray(value) || value.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 p-1">
        {value.map((itemValue) => {
          let item;
          if (isAsync) {
            item =
              asyncOptions.find((option) => option.value === itemValue) ||
              defaultOptions.find((option) => option.value === itemValue);
          } else {
            item = initialOptions.find((option) => option.value === itemValue);
          }
          return item ? (
            <div
              key={String(itemValue)}
              className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm"
            >
              <span>{item.label}</span>
              <button
                type="button"
                onClick={(e) => removeItem(itemValue, e)}
                className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                ×
              </button>
            </div>
          ) : null;
        })}
      </div>
    );
  };

  // Render loading state
  if (isLoading || loadingAsync) {
    return (
      <div className={`relative ${className}`}>
        <div
          className={`flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed ${inputClassName}`}
        >
          <span className="text-gray-500">Loading...</span>
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Determine error message
  const getErrorMessage = () => {
    if (error) return error;
    if (required && isEmpty()) return labelRequired;
    return "";
  };

  const errorMessage = getErrorMessage();

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <label
          className={`block text-sm font-medium mb-1 ${errorMessage ? "text-red-500" : "text-gray-700"}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Button */}
      <div
        className={`flex flex-wrap items-center justify-between px-4 py-2 border rounded-lg cursor-pointer transition-all ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:border-blue-500 focus:outline-none focus:ring-2"
        } ${getBorderColor()} ${inputClassName}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 min-w-0">
          {isMulti ? (
            renderSelectedItems()
          ) : (
            <span className={`truncate ${!value && "text-gray-400"}`}>
              {getDisplayText()}
            </span>
          )}
        </div>
        <div className="ml-2 flex items-center">
          {isMulti && Array.isArray(value) && value.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(isMulti ? [] : "");
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              Clear all
            </button>
          )}
          <div className="flex space-x-2 items-center">
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null as any);
                }}
                className="text-gray-600"
              >
                <BsX size={20} className="fill-gray-500" />
              </button>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          style={{ zIndex: 9000 }}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                const newSearchTerm = e.target.value;
                setSearchTerm(newSearchTerm);

                // For async selects, we want to trigger option loading when search changes
                if (isAsync && loadOptions && isOpen) {
                  // The useEffect will handle loading options
                }

                // Call onSearch if provided
                if (onSearch) {
                  onSearch(newSearchTerm);
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {loadingAsync ? (
              <div className="px-4 py-2 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                <span>Loading...</span>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = isMulti
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value;

                return (
                  <div
                    key={String(option.value)}
                    className={`px-4 py-2 cursor-pointer transition-colors flex items-center ${
                      isSelected
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {isMulti && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent div onClick
                        className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    )}
                    <span>{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;