import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ExperienceRequest } from "../../../types/experience.api";
import InputText from "../ui/Inputtext";

interface ExperienceFormProps {
  register: UseFormRegister<ExperienceRequest>;
  errors: FieldErrors<ExperienceRequest>;
  data?: Partial<ExperienceRequest>;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Company Name *"
        {...register("company_name")}
        defaultValue={data.company_name || ""}
        error={errors.company_name?.message}
        placeholder="e.g., Google"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Position *"
        {...register("position")}
        defaultValue={data.position || ""}
        error={errors.position?.message}
        placeholder="e.g., Senior Software Engineer"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Employment Type"
        {...register("employment_type")}
        defaultValue={data.employment_type || ""}
        error={errors.employment_type?.message}
        placeholder="e.g., Full-time, Part-time, Contract"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Location"
        {...register("location")}
        defaultValue={data.location || ""}
        error={errors.location?.message}
        placeholder="e.g., San Francisco, CA"
        fullWidth
        variant="outlined"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_remote"
          {...register("is_remote")}
          defaultChecked={data.is_remote as boolean}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_remote" className="text-sm font-medium text-gray-700">
          Remote
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputText
          label="Start Date"
          type="date"
          {...register("start_date")}
          defaultValue={data.start_date || ""}
          error={errors.start_date?.message}
          fullWidth
          variant="outlined"
        />

        <InputText
          label="End Date"
          type="date"
          {...register("end_date")}
          defaultValue={data.end_date || ""}
          error={errors.end_date?.message}
          fullWidth
          variant="outlined"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_current"
          {...register("is_current")}
          defaultChecked={data.is_current as boolean}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_current" className="text-sm font-medium text-gray-700">
          Currently working here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={data.description || ""}
          placeholder="Describe your role and responsibilities..."
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
