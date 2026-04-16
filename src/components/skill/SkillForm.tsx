import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SkillRequest } from "../../../types/skill.api";
import InputText from "../ui/Inputtext";

interface SkillFormProps {
  register: UseFormRegister<SkillRequest>;
  errors: FieldErrors<SkillRequest>;
  data?: Partial<SkillRequest>;
}

export const SkillForm: React.FC<SkillFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Name *"
        {...register("name")}
        defaultValue={data.name || ""}
        error={errors.name?.message}
        placeholder="e.g., React, TypeScript"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Category"
        {...register("category")}
        defaultValue={data.category || ""}
        error={errors.category?.message}
        placeholder="e.g., Frontend, Backend"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Level (1-100)"
        type="number"
        {...register("level", { valueAsNumber: true })}
        defaultValue={data.level || 50}
        error={errors.level?.message}
        placeholder="50"
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
          placeholder="Describe your skill level..."
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
