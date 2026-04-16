import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProjectRequest } from "../../../types/project.api";
import InputText from "../ui/Inputtext";

interface ProjectFormProps {
  register: UseFormRegister<ProjectRequest>;
  errors: FieldErrors<ProjectRequest>;
  data?: Partial<ProjectRequest>;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Title *"
        {...register("title")}
        defaultValue={data.title || ""}
        error={errors.title?.message}
        placeholder="e.g., My Portfolio"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Slug *"
        {...register("slug")}
        defaultValue={data.slug || ""}
        error={errors.slug?.message}
        placeholder="e.g., my-portfolio"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Thumbnail URL"
        {...register("thumbnail_url")}
        defaultValue={data.thumbnail_url || ""}
        error={errors.thumbnail_url?.message}
        placeholder="https://example.com/thumbnail.jpg"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Demo URL"
        {...register("demo_url")}
        defaultValue={data.demo_url || ""}
        error={errors.demo_url?.message}
        placeholder="https://example.com"
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

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={data.description || ""}
          placeholder="Describe your project..."
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
