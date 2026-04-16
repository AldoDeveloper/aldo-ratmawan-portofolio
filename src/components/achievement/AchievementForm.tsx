import React from "react";
import InputText from "../ui/Inputtext";
import { AchievementRequest } from "../../../types/achievement.api";

interface AchievementFormProps {
  data?: AchievementRequest;
  onChange: (field: keyof AchievementRequest, value: string) => void;
  errors?: Record<string, string>;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  data = {},
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-5">
      {/* Title */}
      <InputText
        label="Title *"
        value={data.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        error={errors.title}
        placeholder="e.g., Best Developer Award"
        fullWidth
        variant="outlined"
      />

      {/* Issuer */}
      <InputText
        label="Issuer / Organization"
        value={data.issuer || ""}
        onChange={(e) => onChange("issuer", e.target.value)}
        error={errors.issuer}
        placeholder="e.g., Google Developer Group"
        fullWidth
        variant="outlined"
      />

      {/* Date & Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputText
          label="Date"
          type="date"
          value={data.date || ""}
          onChange={(e) => onChange("date", e.target.value)}
          fullWidth
          variant="outlined"
        />

        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category
          </label>
          <select
            value={data.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none transition-all duration-200 text-gray-700"
          >
            <option value="">Select Category</option>
            <option value="award">Award</option>
            <option value="certification">Certification</option>
            <option value="competition">Competition</option>
            <option value="hackathon">Hackathon</option>
            <option value="publication">Publication</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Certificate URL */}
      <InputText
        label="Certificate URL"
        value={data.certificate_url || ""}
        onChange={(e) => onChange("certificate_url", e.target.value)}
        placeholder="https://example.com/certificate"
        fullWidth
        variant="outlined"
      />

      {/* Image URL */}
      <InputText
        label="Image URL"
        value={data.image_url || ""}
        onChange={(e) => onChange("image_url", e.target.value)}
        placeholder="https://example.com/achievement-image.jpg"
        fullWidth
        variant="outlined"
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Description
        </label>
        <textarea
          value={data.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your achievement..."
          rows={4}
          className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none transition-all duration-200 text-gray-700 resize-none placeholder-gray-400"
        />
      </div>

      {/* Status */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Status
        </label>
        <select
          value={data.status || "pending"}
          onChange={(e) => onChange("status", e.target.value)}
          className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none transition-all duration-200 text-gray-700"
        >
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>
    </div>
  );
};
