import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ContactRequest } from "../../../types/contact.api";
import InputText from "../ui/Inputtext";

interface ContactFormProps {
  register: UseFormRegister<ContactRequest>;
  errors: FieldErrors<ContactRequest>;
  data?: Partial<ContactRequest>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Type *"
        {...register("type")}
        defaultValue={data.type || ""}
        error={errors.type?.message}
        placeholder="e.g., Email, LinkedIn, GitHub"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="URL *"
        {...register("url")}
        defaultValue={data.url || ""}
        error={errors.url?.message}
        placeholder="https://example.com"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Label *"
        {...register("label")}
        defaultValue={data.label || ""}
        error={errors.label?.message}
        placeholder="e.g., My Email"
        fullWidth
        variant="outlined"
      />
    </div>
  );
};
