import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { ExpertiseResponse } from "../../../types/expertise.api";
import { AddExpertiseModal } from "./AddExpertiseModal";
import { UpdateExpertiseModal } from "./UpdateExpertiseModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaBookOpen,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchExpertiseItems,
  createExpertiseItem,
  updateExpertiseItem,
  deleteExpertiseItem,
} from "../../services/expertise.service";
import { ExpertiseRequest } from "../../../types/expertise.api";
import Spinner from "../ui/Spiner";

export const ExpertiseList: React.FC = () => {
  const [expertiseItems, setExpertiseItems] = useState<ExpertiseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedExpertise, setSelectedExpertise] =
    useState<ExpertiseResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Fetch expertise on component mount
  useEffect(() => {
    loadExpertise();
  }, []);

  const loadExpertise = async () => {
    try {
      setIsLoading(true);
      const response = await fetchExpertiseItems();

      if (response.success && response.data) {
        setExpertiseItems(response.data);
      } else {
        console.error("Failed to load expertise:", response.message);
      }
    } catch (error) {
      console.error("Error loading expertise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: ExpertiseRequest) => {
    try {
      const response = await createExpertiseItem(data);

      if (response.success && response.data) {
        await loadExpertise();
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add expertise:", response.message);
      }
    } catch (error) {
      console.error("Error adding expertise:", error);
    }
  };

  const handleUpdate = async (data: ExpertiseRequest) => {
    if (!selectedExpertise?.id) return;

    try {
      const response = await updateExpertiseItem(selectedExpertise.id, data);

      if (response.success && response.data) {
        await loadExpertise();
        setIsUpdateModalOpen(false);
        setSelectedExpertise(null);
      } else {
        console.error("Failed to update expertise:", response.message);
      }
    } catch (error) {
      console.error("Error updating expertise:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this expertise?")) {
      return;
    }

    try {
      const response = await deleteExpertiseItem(id);

      if (response.success) {
        await loadExpertise();
      } else {
        console.error("Failed to delete expertise:", response.message);
      }
    } catch (error) {
      console.error("Error deleting expertise:", error);
    }

    setShowActionMenu(null);
  };

  const openUpdateModal = (expertise: ExpertiseResponse) => {
    setSelectedExpertise(expertise);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<ExpertiseResponse>[] = [
    {
      key: "title",
      label: "Title",
      className: "min-w-[250px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">
            <FaBookOpen />
          </div>
          <div>
            <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {row.title}
            </div>
            {row.description && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-2 max-w-md">
                {row.description}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      className: "min-w-[300px]",
      render: (_value, row) => (
        <div className="text-sm text-gray-600 max-w-sm line-clamp-3">
          {row.description || "-"}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "min-w-[120px]",
      sortable: false,
      render: (_value, row) => (
        <div className="relative">
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

          {showActionMenu === row.id && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowActionMenu(null)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <button
                  onClick={() => openUpdateModal(row)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <FaEdit className="text-blue-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(row.id as string)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaTrash className="text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaBookOpen className="text-blue-500" />
            Expertise
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your areas of expertise
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Expertise</span>
        </button>
      </div>

      {/* Table Card */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Expertise List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {expertiseItems.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={expertiseItems}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={loadExpertise}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      {/* Add Modal */}
      <AddExpertiseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      {/* Update Modal */}
      <UpdateExpertiseModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedExpertise(null);
        }}
        onUpdate={handleUpdate}
        data={selectedExpertise}
      />
    </div>
  );
};
