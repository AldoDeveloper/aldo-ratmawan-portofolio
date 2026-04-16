import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ExpertiseRequest } from "../../../types/expertise.api";
import InputText from "../ui/Inputtext";

interface ExpertiseFormProps {
  register: UseFormRegister<ExpertiseRequest>;
  errors: FieldErrors<ExpertiseRequest>;
  data?: Partial<ExpertiseRequest>;
}

export const ExpertiseForm: React.FC<ExpertiseFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      {/* Title */}
      <InputText
        label="Title *"
        {...register("title")}
        defaultValue={data.title || ""}
        error={errors.title?.message}
        placeholder="e.g., Full Stack Development"
        fullWidth
        variant="outlined"
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description *
        </label>
        <textarea
          {...register("description")}
          defaultValue={data.description || ""}
          placeholder="Describe your expertise..."
          rows={4}
          className={`w-full px-4 py-3 text-base bg-white border rounded-lg focus:ring-1 outline-none transition-all duration-200 text-gray-700 resize-none placeholder-gray-400 ${
            errors.description
              ? "border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
};
