import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ArticleRequest } from "../../../types/article.api";
import InputText from "../ui/Inputtext";

interface ArticleFormProps {
  register: UseFormRegister<ArticleRequest>;
  errors: FieldErrors<ArticleRequest>;
  data?: Partial<ArticleRequest>;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  register,
  errors,
  data = {},
}) => {
  return (
    <div className="space-y-5">
      <InputText
        label="Title *"
        {...register("title")}
        defaultValue={data.title || ""}
        error={errors.title?.message}
        placeholder="e.g., Building a Portfolio with Next.js"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Slug *"
        {...register("slug")}
        defaultValue={data.slug || ""}
        error={errors.slug?.message}
        placeholder="e.g., building-portfolio-nextjs"
        fullWidth
        variant="outlined"
      />

      <InputText
        label="Thumbnail URL"
        {...register("thumbnail_url")}
        defaultValue={data.thumbnail_url || ""}
        error={errors.thumbnail_url?.message}
        placeholder="https://example.com/thumbnail.jpg"
        fullWidth
        variant="outlined"
      />

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Content (Markdown) *
        </label>
        <textarea
          {...register("content_md")}
          defaultValue={data.content_md || ""}
          placeholder="Write your article content in Markdown format..."
          rows={8}
          className={`w-full px-4 py-3 text-base bg-white border rounded-lg focus:ring-1 outline-none transition-all duration-200 text-gray-700 resize-none placeholder-gray-400 ${
            errors.content_md
              ? "border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
          }`}
        />
        {errors.content_md && (
          <p className="mt-1 text-sm text-red-500">{errors.content_md.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          {...register("published")}
          defaultChecked={data.published as boolean}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Published
        </label>
      </div>
    </div>
  );
};
