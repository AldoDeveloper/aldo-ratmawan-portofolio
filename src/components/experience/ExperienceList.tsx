import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { ExperienceResponse } from "../../../types/experience.api";
import { AddExperienceModal } from "./AddExperienceModal";
import { UpdateExperienceModal } from "./UpdateExperienceModal";
import { FaPlus, FaEdit, FaTrash, FaSyncAlt, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { BsPenFill, BsThreeDotsVertical } from "react-icons/bs";
import { fetchExperiences, createExperience, updateExperience, deleteExperience } from "../../services/experience.service";
import { ExperienceRequest } from "../../../types/experience.api";
import Dropdown from "../ui/Dropdown";

export const ExperienceList: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => { loadExperiences(); }, []);

  const loadExperiences = async () => {
    try {
      setIsLoading(true);
      const response = await fetchExperiences();
      if (response.success && response.data) setExperiences(response.data);
    } catch (error) { console.error("Error loading experiences:", error); }
    finally { setIsLoading(false); }
  };

  const handleAdd = async (data: ExperienceRequest) => {
    try {
      const response = await createExperience(data);
      if (response.success) { await loadExperiences(); setIsAddModalOpen(false); }
    } catch (error) { console.error("Error adding experience:", error); }
  };

  const handleUpdate = async (data: ExperienceRequest) => {
    if (!selectedExperience?.id) return;
    try {
      const response = await updateExperience(selectedExperience.id, data);
      if (response.success) { await loadExperiences(); setIsUpdateModalOpen(false); setSelectedExperience(null); }
    } catch (error) { console.error("Error updating experience:", error); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      const response = await deleteExperience(id);
      if (response.success) await loadExperiences();
    } catch (error) { console.error("Error deleting experience:", error); }
    setShowActionMenu(null);
  };

  const columns: Column<ExperienceResponse>[] = [
    {
      key: "company_name", label: "Company", className: "min-w-[200px]", sortable: true,
      render: (_value, row) => (
        <div>
          <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-2">
            <FaBuilding className="text-gray-500" />
            {row.company_name}
          </div>
          <div className="text-sm text-gray-600 mt-1">{row.position}</div>
        </div>
      ),
    },
    {
      key: "employment_type", label: "Type", className: "min-w-[150px]", sortable: true,
      render: (_value, row) => (
        <div className="space-y-1">
          {row.employment_type && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
              {row.employment_type}
            </span>
          )}
          {row.is_remote && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 ml-2">
              Remote
            </span>
          )}
          {!row.employment_type && !row.is_remote && <span className="text-sm text-gray-500">-</span>}
        </div>
      ),
    },
    {
      key: "location", label: "Location", className: "min-w-[150px]", sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {row.location ? (
            <>
              <FaMapMarkerAlt className="text-gray-500" />
              {row.location}
            </>
          ) : (
            <span className="text-gray-500">-</span>
          )}
        </div>
      ),
    },
    {
      key: "start_date", label: "Duration", className: "min-w-[180px]", sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCalendarAlt className="text-gray-500" />
          <div>
            {row.start_date ? new Date(row.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '...'}
            {' - '}
            {row.is_current ? 'Present' : (row.end_date ? new Date(row.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '...')}
          </div>
        </div>
      ),
    },
    {
      key: "is_current", label: "Status", className: "min-w-[120px]", sortable: true,
      render: (_value, row) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${row.is_current ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
          {row.is_current ? "Current" : "Past"}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", className: "min-w-[120px]", sortable: false,
      render: (_value, row) => (
        <Dropdown
          items={[
            {
              label: "Edit",
              icon: <BsPenFill size={16} />,
              onClick: () => {
                setSelectedExperience(row);
                setIsUpdateModalOpen(true);
                setShowActionMenu(null);
              }
            },
            {
              label: "Delete",
              icon: <FaTrash size={16} />,
              onClick: () => handleDelete(row.id as string),
              className: "text-red-600 hover:bg-red-50"
            }
          ]}
        >
          <button onClick={() => setShowActionMenu(showActionMenu === row.id ? null : (row.id as string))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
            <FaBriefcase className="text-blue-500" />Work Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your professional experience and work history</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
          <FaPlus /><span>Add Experience</span>
        </button>
      </div>

      <Card header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Experience List</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg">{experiences.length} items</span>
          </div>
        </div>
      }>
        <Table columns={columns} data={experiences} isLoading={isLoading} showGridLine={false} />
      </Card>

      <div className="flex justify-center">
        <button onClick={loadExperiences} disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddExperienceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAdd} />
      <UpdateExperienceModal isOpen={isUpdateModalOpen} onClose={() => { setIsUpdateModalOpen(false); setSelectedExperience(null); }}
        onUpdate={handleUpdate} data={selectedExperience} />
    </div>
  );
};
