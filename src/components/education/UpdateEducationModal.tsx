import React, { useEffect } from "react";
import Modal from "../ui/Modal";
import { EducationRequest, EducationResponse } from "../../../types/education.api";
import { useForm } from "react-hook-form";
import { EducationForm } from "./EducationForm";
import { FaSpinner, FaGraduationCap } from "react-icons/fa";

interface UpdateEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: EducationRequest) => Promise<void>;
  data: EducationResponse | null;
}

export const UpdateEducationModal: React.FC<UpdateEducationModalProps> = ({
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
  } = useForm<EducationRequest>({
    defaultValues: {
      institution_name: "",
      education_level: "",
      major: "",
      start_date: "",
      end_date: "",
      is_current: false,
      grade: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        institution_name: data.institution_name || "",
        education_level: data.education_level || "",
        major: data.major || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        is_current: data.is_current || false,
        grade: data.grade || "",
        description: data.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: EducationRequest) => {
    await onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
            <FaGraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Update Education
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
            form="education-update-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Education</span>
          </button>
        </div>
      }
    >
      {data && (
        <form id="education-update-form" onSubmit={handleSubmit(onSubmit)}>
          <EducationForm
            register={register}
            errors={errors}
            data={data}
          />
        </form>
      )}
    </Modal>
  );
};
