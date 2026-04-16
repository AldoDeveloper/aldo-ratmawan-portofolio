import React, { useEffect } from "react";
import Modal from "../ui/Modal";
import { ExperienceRequest, ExperienceResponse } from "../../../types/experience.api";
import { useForm } from "react-hook-form";
import { ExperienceForm } from "./ExperienceForm";
import { FaSpinner, FaBriefcase } from "react-icons/fa";

interface UpdateExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: ExperienceRequest) => Promise<void>;
  data: ExperienceResponse | null;
}

export const UpdateExperienceModal: React.FC<UpdateExperienceModalProps> = ({
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

  useEffect(() => {
    if (data) {
      reset({
        company_name: data.company_name || "",
        position: data.position || "",
        employment_type: data.employment_type || "",
        location: data.location || "",
        is_remote: data.is_remote || false,
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        is_current: data.is_current || false,
        description: data.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ExperienceRequest) => {
    await onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
            <FaBriefcase className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Update Experience</h3>
        </div>
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Cancel
          </button>
          <button type="submit" form="experience-update-form" disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Experience</span>
          </button>
        </div>
      }
    >
      {data && (
        <form id="experience-update-form" onSubmit={handleSubmit(onSubmit)}>
          <ExperienceForm register={register} errors={errors} data={data} />
        </form>
      )}
    </Modal>
  );
};
