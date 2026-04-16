import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CertificationRequest } from "../../../types/certification.api";
import InputText from "../ui/Inputtext";

interface CertificationFormProps {
  register: UseFormRegister<CertificationRequest>;
  errors: FieldErrors<CertificationRequest>;
  data?: Partial<CertificationRequest>;
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
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
        placeholder="e.g., AWS Certified Developer"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Issuer *"
        {...register("issuer")}
        defaultValue={data.issuer || ""}
        error={errors.issuer?.message}
        placeholder="e.g., Amazon Web Services"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Issue Date"
        type="date"
        {...register("issue_date")}
        defaultValue={data.issue_date || ""}
        error={errors.issue_date?.message}
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Credential URL"
        {...register("credential_url")}
        defaultValue={data.credential_url || ""}
        error={errors.credential_url?.message}
        placeholder="https://example.com/credential"
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
          placeholder="Describe this certification..."
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
