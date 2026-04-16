import React, { useEffect } from "react";
import Modal from "../ui/Modal";
import { ContactRequest, ContactResponse } from "../../../types/contact.api";
import { useForm } from "react-hook-form";
import { ContactForm } from "./ContactForm";
import { FaSpinner } from "react-icons/fa";

interface UpdateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: ContactRequest) => Promise<void>;
  data: ContactResponse | null;
}

export const UpdateContactModal: React.FC<UpdateContactModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  data,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactRequest>({
    defaultValues: {
      type: "",
      url: "",
      label: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        type: data.type || "",
        url: data.url || "",
        label: data.label || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ContactRequest) => {
    await onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Update Contact
          </h3>
        </div>
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="contact-update-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Contact</span>
          </button>
        </div>
      }
    >
      {data && (
        <form id="contact-update-form" onSubmit={handleSubmit(onSubmit)}>
          <ContactForm
            register={register}
            errors={errors}
            data={data}
          />
        </form>
      )}
    </Modal>
  );
};
