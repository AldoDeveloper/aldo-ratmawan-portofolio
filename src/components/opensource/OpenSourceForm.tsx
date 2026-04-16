import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { OpenSourceRequest } from "../../../types/opensource.api";
import InputText from "../ui/Inputtext";

interface OpenSourceFormProps {
  register: UseFormRegister<OpenSourceRequest>;
  errors: FieldErrors<OpenSourceRequest>;
  data?: Partial<OpenSourceRequest>;
}

export const OpenSourceForm: React.FC<OpenSourceFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Project Name *"
        {...register("project_name")}
        defaultValue={data.project_name || ""}
        error={errors.project_name?.message}
        placeholder="e.g., My Awesome Library"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Repository URL"
        {...register("repo_url")}
        defaultValue={data.repo_url || ""}
        error={errors.repo_url?.message}
        placeholder="https://github.com/username/repo"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Stars"
        type="number"
        {...register("stars", { valueAsNumber: true })}
        defaultValue={data.stars || 0}
        error={errors.stars?.message}
        placeholder="0"
        fullWidth
        variant="outlined"
      />

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={data.description || ""}
          placeholder="Describe your open source project..."
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
