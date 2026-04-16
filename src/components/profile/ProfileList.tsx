import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { ProfileResponse } from "../../../types/profile.api";
import { AddProfileModal } from "./AddProfileModal";
import { UpdateProfileModal } from "./UpdateProfileModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../../services/profile.service";
import { ProfileRequest } from "../../../types/profile.api";
import Dropdown from "../ui/Dropdown";
import { BsPenFill } from "react-icons/bs";

export const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] =
    useState<ProfileResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProfiles();
      if (response.success && response.data) {
        setProfiles(response.data);
      }
    } catch (error) {
      console.error("Error loading profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: ProfileRequest) => {
    try {
      const response = await createProfile(data);
      if (response.success) {
        await loadProfiles();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const handleUpdate = async (data: ProfileRequest) => {
    if (!selectedProfile?.id) return;
    try {
      const response = await updateProfile(selectedProfile.id, data);
      if (response.success) {
        await loadProfiles();
        setIsUpdateModalOpen(false);
        setSelectedProfile(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }
    try {
      const response = await deleteProfile(id);
      if (response.success) await loadProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
    setShowActionMenu(null);
  };

  const openUpdateModal = (profile: ProfileResponse) => {
    setSelectedProfile(profile);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<ProfileResponse>[] = [
    {
      key: "full_name",
      label: "Name",
      className: "min-w-[200px]",
      sortable: true,
      render: (_value, row) => (
        <div>
          <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-2">
            <FaUser className="text-blue-500" />
            {row.full_name}
          </div>
          {row.headline && (
            <div className="text-sm text-gray-600 mt-1">{row.headline}</div>
          )}
        </div>
      ),
    },
    {
      key: "username",
      label: "Username",
      className: "min-w-[150px]",
      sortable: true,
      render: (_value, row) => (
        <span className="text-sm text-gray-700">@{row.username}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      className: "min-w-[200px]",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-400 text-xs" />
          <span className="text-sm text-gray-700">{row.email}</span>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      className: "min-w-[180px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-gray-500" />
          {row.location || "-"}
        </div>
      ),
    },
    {
      key: "is_available",
      label: "Availability",
      className: "min-w-[140px]",
      render: (_value, row) => (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            row.is_available
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
          }`}
        >
          <FaCheckCircle className={row.is_available ? "text-green-600" : "text-gray-500"} />
          {row.is_available ? "Available" : "Not Available"}
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
                setSelectedProfile(row);
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
            <FaUser className="text-blue-500" />
            Profiles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your profile information
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Profile</span>
        </button>
      </div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Profile List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {profiles.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={profiles}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      <div className="flex justify-center">
        <button
          onClick={loadProfiles}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddProfileModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedProfile(null);
        }}
        onUpdate={handleUpdate}
        data={selectedProfile}
      />
    </div>
  );
};
