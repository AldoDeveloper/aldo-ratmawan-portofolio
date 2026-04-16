import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { AchievementRequest, AchievementResponse } from "../../../types/achievement.api";
import { AchievementForm } from "./AchievementForm";
import { FaSpinner } from "react-icons/fa";

interface UpdateAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: AchievementRequest) => Promise<void>;
  data: AchievementResponse | null;
}

export const UpdateAchievementModal: React.FC<UpdateAchievementModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  data,
}) => {
  const [formData, setFormData] = useState<AchievementRequest>({
    title: "",
    description: "",
    issuer: "",
    date: "",
    certificate_url: "",
    image_url: "",
    category: "",
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        issuer: data.issuer || "",
        date: data.date || "",
        certificate_url: data.certificate_url || "",
        image_url: data.image_url || "",
        category: data.category || "",
        status: data.status || "pending",
      });
    }
  }, [data]);

  const handleChange = (field: keyof AchievementRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onUpdate(formData);
      setErrors({});
    } catch (error) {
      console.error("Error updating achievement:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            Update Achievement
          </h3>
        </div>
      }
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Achievement</span>
          </button>
        </div>
      }
    >
      {data && (
        <AchievementForm
          data={formData}
          onChange={handleChange}
          errors={errors}
        />
      )}
    </Modal>
  );
};
