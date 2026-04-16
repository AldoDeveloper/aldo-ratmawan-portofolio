import React, { useEffect } from "react";
import Modal from "../ui/Modal";
import { ProfileRequest, ProfileResponse } from "../../../types/profile.api";
import { useForm } from "react-hook-form";
import { ProfileForm } from "./ProfileForm";
import { FaSpinner, FaUser } from "react-icons/fa";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: ProfileRequest) => Promise<void>;
  data: ProfileResponse | null;
}

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
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
  } = useForm<ProfileRequest>({
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      headline: "",
      bio: "",
      avatar_url: "",
      resume_url: "",
      location: "",
      is_available: false,
      years_of_experience: 0,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        full_name: data.full_name || "",
        username: data.username || "",
        email: data.email || "",
        headline: data.headline || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || "",
        resume_url: data.resume_url || "",
        location: data.location || "",
        is_available: data.is_available || false,
        years_of_experience: data.years_of_experience || 0,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ProfileRequest) => {
    await onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
            <FaUser className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Update Profile
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
            form="profile-update-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Profile</span>
          </button>
        </div>
      }
    >
      {data && (
        <form id="profile-update-form" onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            data={data}
          />
        </form>
      )}
    </Modal>
  );
};
