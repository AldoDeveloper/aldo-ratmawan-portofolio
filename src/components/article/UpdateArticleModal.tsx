import React, { useEffect } from "react";
import Modal from "../ui/Modal";
import { ArticleRequest, ArticleResponse } from "../../../types/article.api";
import { useForm } from "react-hook-form";
import { ArticleForm } from "./ArticleForm";
import { FaSpinner, FaFileAlt } from "react-icons/fa";

interface UpdateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: ArticleRequest) => Promise<void>;
  data: ArticleResponse | null;
}

export const UpdateArticleModal: React.FC<UpdateArticleModalProps> = ({
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
  } = useForm<ArticleRequest>({
    defaultValues: {
      title: "",
      slug: "",
      content_md: "",
      thumbnail_url: "",
      published: false,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title || "",
        slug: data.slug || "",
        content_md: data.content_md || "",
        thumbnail_url: data.thumbnail_url || "",
        published: data.published || false,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ArticleRequest) => {
    await onUpdate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
            <FaFileAlt className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Update Article
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
            form="article-update-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            <span>Update Article</span>
          </button>
        </div>
      }
    >
      {data && (
        <form id="article-update-form" onSubmit={handleSubmit(onSubmit)}>
          <ArticleForm
            register={register}
            errors={errors}
            data={data}
          />
        </form>
      )}
    </Modal>
  );
};
