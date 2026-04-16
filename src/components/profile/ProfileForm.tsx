import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileRequest } from "../../../types/profile.api";
import InputText from "../ui/Inputtext";

interface ProfileFormProps {
  register: UseFormRegister<ProfileRequest>;
  errors: FieldErrors<ProfileRequest>;
  data?: Partial<ProfileRequest>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Full Name *"
        {...register("full_name")}
        defaultValue={data.full_name || ""}
        error={errors.full_name?.message}
        placeholder="e.g., John Doe"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Username *"
        {...register("username")}
        defaultValue={data.username || ""}
        error={errors.username?.message}
        placeholder="e.g., johndoe"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Email *"
        type="email"
        {...register("email")}
        defaultValue={data.email || ""}
        error={errors.email?.message}
        placeholder="john@example.com"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Headline"
        {...register("headline")}
        defaultValue={data.headline || ""}
        error={errors.headline?.message}
        placeholder="e.g., Full Stack Developer"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Avatar URL"
        {...register("avatar_url")}
        defaultValue={data.avatar_url || ""}
        error={errors.avatar_url?.message}
        placeholder="https://example.com/avatar.jpg"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Resume URL"
        {...register("resume_url")}
        defaultValue={data.resume_url || ""}
        error={errors.resume_url?.message}
        placeholder="https://example.com/resume.pdf"
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

      <InputText
        label="Years of Experience"
        type="number"
        {...register("years_of_experience", { valueAsNumber: true })}
        defaultValue={data.years_of_experience || 0}
        error={errors.years_of_experience?.message}
        placeholder="0"
        fullWidth
        variant="outlined"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_available"
          {...register("is_available")}
          defaultChecked={data.is_available as boolean}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_available" className="text-sm font-medium text-gray-700">
          Available for hire
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Bio
        </label>
        <textarea
          {...register("bio")}
          defaultValue={data.bio || ""}
          placeholder="Tell us about yourself..."
          rows={4}
          className={`w-full px-4 py-3 text-base bg-white border rounded-lg focus:ring-1 outline-none transition-all duration-200 text-gray-700 resize-none placeholder-gray-400 ${
            errors.bio
              ? "border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
          }`}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
        )}
      </div>
    </div>
  );
};
