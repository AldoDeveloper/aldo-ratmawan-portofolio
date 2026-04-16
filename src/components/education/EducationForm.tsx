import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EducationRequest } from "../../../types/education.api";
import InputText from "../ui/Inputtext";

interface EducationFormProps {
  register: UseFormRegister<EducationRequest>;
  errors: FieldErrors<EducationRequest>;
  data?: Partial<EducationRequest>;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Institution Name *"
        {...register("institution_name")}
        defaultValue={data.institution_name || ""}
        error={errors.institution_name?.message}
        placeholder="e.g., University of Indonesia"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Education Level *"
        {...register("education_level")}
        defaultValue={data.education_level || ""}
        error={errors.education_level?.message}
        placeholder="e.g., Bachelor, Master, PhD"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Major"
        {...register("major")}
        defaultValue={data.major || ""}
        error={errors.major?.message}
        placeholder="e.g., Computer Science"
        fullWidth
        variant="outlined"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputText
          label="Start Date"
          type="date"
          {...register("start_date")}
          defaultValue={data.start_date || ""}
          fullWidth
          variant="outlined"
        />

        <InputText
          label="End Date"
          type="date"
          {...register("end_date")}
          defaultValue={data.end_date || ""}
          fullWidth
          variant="outlined"
        />
      </div>

      <InputText
        label="Grade"
        {...register("grade")}
        defaultValue={data.grade || ""}
        error={errors.grade?.message}
        placeholder="e.g., 3.8 GPA"
        fullWidth
        variant="outlined"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_current"
          {...register("is_current")}
          defaultChecked={data.is_current as boolean}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_current" className="text-sm font-medium text-gray-700">
          Currently studying here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={data.description || ""}
          placeholder="Describe your education experience..."
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
