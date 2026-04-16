import React from "react";
import Modal from "../ui/Modal";
import { ExperienceRequest } from "../../../types/experience.api";
import { useForm } from "react-hook-form";
import { ExperienceForm } from "./ExperienceForm";
import { FaSpinner, FaBriefcase } from "react-icons/fa";

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: ExperienceRequest) => Promise<void>;
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExperienceRequest>({
    defaultValues: {
      company_name: "",
      position: "",
      employment_type: "",
      location: "",
      is_remote: false,
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
    },
  });

  const onSubmit = async (data: ExperienceRequest) => {
    await onAdd(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
            <FaBriefcase className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Add Experience</h3>
        </div>
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Cancel
          </button>
          <button type="submit" form="experience-form" disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Add Experience</span>
          </button>
        </div>
      }
    >
      <form id="experience-form" onSubmit={handleSubmit(onSubmit)}>
        <ExperienceForm register={register} errors={errors} />
      </form>
    </Modal>
  );
};
