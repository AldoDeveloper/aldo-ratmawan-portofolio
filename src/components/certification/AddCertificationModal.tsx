import React from "react";
import Modal from "../ui/Modal";
import { CertificationRequest } from "../../../types/certification.api";
import { useForm } from "react-hook-form";
import { CertificationForm } from "./CertificationForm";
import { FaSpinner } from "react-icons/fa";

interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: CertificationRequest) => Promise<void>;
}

export const AddCertificationModal: React.FC<AddCertificationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CertificationRequest>({
    defaultValues: {
      name: "",
      issuer: "",
      issue_date: "",
      credential_url: "",
      description: "",
    },
  });

  const onSubmit = async (data: CertificationRequest) => {
    await onAdd(data);
    reset();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Add Certification
          </h3>
        </div>
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
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
            form="certification-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Add Certification</span>
          </button>
        </div>
      }
    >
      <form id="certification-form" onSubmit={handleSubmit(onSubmit)}>
        <CertificationForm
          register={register}
          errors={errors}
        />
      </form>
    </Modal>
  );
};
