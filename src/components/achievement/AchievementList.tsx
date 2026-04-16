import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { AchievementResponse } from "../../../types/achievement.api";
import { AddAchievementModal } from "./AddAchievementModal";
import { UpdateAchievementModal } from "./UpdateAchievementModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTrophy,
  FaCalendarAlt,
  FaBuilding,
  FaTag,
  FaSyncAlt,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../../services/achievement.service";
import { AchievementRequest } from "../../../types/achievement.api";
import Spinner from "../ui/Spiner";

export const AchievementList: React.FC = () => {
  const [achievements, setAchievements] = useState<AchievementResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Fetch achievements on component mount
  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAchievements();
      
      if (response.success && response.data) {
        setAchievements(response.data);
      } else {
        console.error("Failed to load achievements:", response.message);
      }
    } catch (error) {
      console.error("Error loading achievements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: AchievementRequest) => {
    try {
      const response = await createAchievement(data);
      
      if (response.success && response.data) {
        await loadAchievements(); // Reload the list
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add achievement:", response.message);
      }
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  const handleUpdate = async (data: AchievementRequest) => {
    if (!selectedAchievement?.id) return;

    try {
      const response = await updateAchievement(selectedAchievement.id, data);
      
      if (response.success && response.data) {
        await loadAchievements(); // Reload the list
        setIsUpdateModalOpen(false);
        setSelectedAchievement(null);
      } else {
        console.error("Failed to update achievement:", response.message);
      }
    } catch (error) {
      console.error("Error updating achievement:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      const response = await deleteAchievement(id);
      
      if (response.success) {
        await loadAchievements(); // Reload the list
      } else {
        console.error("Failed to delete achievement:", response.message);
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
    
    setShowActionMenu(null);
  };

  const openUpdateModal = (achievement: AchievementResponse) => {
    setSelectedAchievement(achievement);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "award":
        return "🏆";
      case "certification":
        return "📜";
      case "competition":
        return "🎯";
      case "hackathon":
        return "💻";
      case "publication":
        return "📚";
      default:
        return "🎖️";
    }
  };

  const columns: Column<AchievementResponse>[] = [
    {
      key: "title",
      label: "Achievement",
      className: "min-w-[250px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">
            {getCategoryIcon(row.category || "")}
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
      key: "issuer",
      label: "Issuer",
      className: "min-w-[180px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaBuilding className="text-gray-400 text-xs" />
          <span className="text-sm text-gray-700">{row.issuer || "-"}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      className: "min-w-[130px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400 text-xs" />
          <span className="text-sm text-gray-700">
            {row.date
              ? new Date(row.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "-"}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      className: "min-w-[140px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaTag className="text-gray-400 text-xs" />
          <span className="text-sm capitalize text-gray-700">
            {row.category || "-"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      className: "min-w-[140px]",
      sortable: true,
      render: (_value, row) => (
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
            row.status || ""
          )}`}
        >
          {row.status?.replace("-", " ").replace(/\b\w/g, (l) =>
            l.toUpperCase()
          )}
        </span>
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

  const stats = {
    total: achievements.length,
    verified: achievements.filter((a) => a.status === "verified").length,
    pending: achievements.filter((a) => a.status === "pending").length,
    inProgress: achievements.filter((a) => a.status === "in-progress").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaTrophy className="text-yellow-500" />
            Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your achievements, awards, and certifications
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <FaTrophy className="text-2xl" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Verified</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.verified}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white">
              <FaEye className="text-2xl" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <FaCalendarAlt className="text-2xl" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {stats.inProgress}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <FaEdit className="text-2xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Table Card */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Achievement List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {achievements.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={achievements}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={loadAchievements}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      {/* Add Modal */}
      <AddAchievementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      {/* Update Modal */}
      <UpdateAchievementModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedAchievement(null);
        }}
        onUpdate={handleUpdate}
        data={selectedAchievement}
      />
    </div>
  );
};
