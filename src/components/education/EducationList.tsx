import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { EducationResponse } from "../../../types/education.api";
import { AddEducationModal } from "./AddEducationModal";
import { UpdateEducationModal } from "./UpdateEducationModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../services/education.service";
import { EducationRequest } from "../../../types/education.api";
import Dropdown from "../ui/Dropdown";
import { BsPenFill } from "react-icons/bs";

export const EducationList: React.FC = () => {
  const [educations, setEducations] = useState<EducationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<EducationResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = async () => {
    try {
      setIsLoading(true);
      const response = await fetchEducations();
      if (response.success && response.data) {
        setEducations(response.data);
      }
    } catch (error) {
      console.error("Error loading educations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: EducationRequest) => {
    try {
      const response = await createEducation(data);
      if (response.success) {
        await loadEducations();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const handleUpdate = async (data: EducationRequest) => {
    if (!selectedEducation?.id) return;
    try {
      const response = await updateEducation(selectedEducation.id, data);
      if (response.success) {
        await loadEducations();
        setIsUpdateModalOpen(false);
        setSelectedEducation(null);
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this education?")) {
      return;
    }
    try {
      const response = await deleteEducation(id);
      if (response.success) await loadEducations();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
    setShowActionMenu(null);
  };

  const openUpdateModal = (education: EducationResponse) => {
    setSelectedEducation(education);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<EducationResponse>[] = [
    {
      key: "institution_name",
      label: "Institution",
      className: "min-w-[250px]",
      sortable: true,
      render: (_value, row) => (
        <div>
          <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-2">
            <FaGraduationCap className="text-blue-500" />
            {row.institution_name}
          </div>
          <div className="text-sm text-gray-600 mt-1">{row.education_level}</div>
          {row.major && (
            <div className="text-xs text-gray-500 mt-1">{row.major}</div>
          )}
        </div>
      ),
    },
    {
      key: "start_date",
      label: "Period",
      className: "min-w-[180px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCalendarAlt className="text-gray-500" />
          <div>
            {row.start_date
              ? new Date(row.start_date).toLocaleDateString("en-US", {
                  year: "numeric",
                })
              : "..."}
            {" - "}
            {row.is_current ? "Present" : row.end_date ? new Date(row.end_date).toLocaleDateString("en-US", { year: "numeric" }) : "..."}
          </div>
        </div>
      ),
    },
    {
      key: "grade",
      label: "Grade",
      className: "min-w-[120px]",
      sortable: true,
      render: (_value, row) => (
        <span className="text-sm text-gray-700">{row.grade || "-"}</span>
      ),
    },
    {
      key: "is_current",
      label: "Status",
      className: "min-w-[120px]",
      sortable: true,
      render: (_value, row) => (
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
            row.is_current
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
          }`}
        >
          {row.is_current ? "Current" : "Completed"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "min-w-[120px]",
      sortable: false,
      render: (_value, row) => (
        <Dropdown
          items={[
            {
              label: "Edit",
              icon: <BsPenFill size={16} />,
              onClick: () => {
                setSelectedEducation(row);
                setIsUpdateModalOpen(true);
                setShowActionMenu(null);
              },
            },
            {
              label: "Delete",
              icon: <FaTrash size={16} />,
              onClick: () => handleDelete(row.id as string),
              className: "text-red-600 hover:bg-red-50",
            },
          ]}
        >
          <button
            onClick={() =>
              setShowActionMenu(
                showActionMenu === row.id ? null : (row.id as string)
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BsThreeDotsVertical className="text-gray-600" />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaGraduationCap className="text-blue-500" />
            Education
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your education history and qualifications
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Education</span>
        </button>
      </div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Education List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {educations.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={educations}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      <div className="flex justify-center">
        <button
          onClick={loadEducations}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddEducationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateEducationModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedEducation(null);
        }}
        onUpdate={handleUpdate}
        data={selectedEducation}
      />
    </div>
  );
};
