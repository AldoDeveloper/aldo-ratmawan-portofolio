import React from "react";
import Modal from "../ui/Modal";
import { OpenSourceRequest } from "../../../types/opensource.api";
import { useForm } from "react-hook-form";
import { OpenSourceForm } from "./OpenSourceForm";
import { FaSpinner, FaCode } from "react-icons/fa";

interface AddOpenSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: OpenSourceRequest) => Promise<void>;
}

export const AddOpenSourceModal: React.FC<AddOpenSourceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OpenSourceRequest>({
    defaultValues: {
      project_name: "",
      repo_url: "",
      description: "",
      stars: 0,
    },
  });

  const onSubmit = async (data: OpenSourceRequest) => {
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
            <FaCode className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Add Open Source Project
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
            form="opensource-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Add Project</span>
          </button>
        </div>
      }
    >
      <form id="opensource-form" onSubmit={handleSubmit(onSubmit)}>
        <OpenSourceForm
          register={register}
          errors={errors}
        />
      </form>
    </Modal>
  );
};
