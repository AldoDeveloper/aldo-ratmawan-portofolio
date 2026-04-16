import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { OpenSourceResponse } from "../../../types/opensource.api";
import { AddOpenSourceModal } from "./AddOpenSourceModal";
import { UpdateOpenSourceModal } from "./UpdateOpenSourceModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaCode,
  FaGithub,
  FaStar,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchOpenSources,
  createOpenSource,
  updateOpenSource,
  deleteOpenSource,
} from "../../services/open-source.service";
import { OpenSourceRequest } from "../../../types/opensource.api";
import Dropdown from "../ui/Dropdown";
import { BsPenFill } from "react-icons/bs";

export const OpenSourceList: React.FC = () => {
  const [openSources, setOpenSources] = useState<OpenSourceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOpenSource, setSelectedOpenSource] =
    useState<OpenSourceResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    loadOpenSources();
  }, []);

  const loadOpenSources = async () => {
    try {
      setIsLoading(true);
      const response = await fetchOpenSources();
      if (response.success && response.data) {
        setOpenSources(response.data);
      }
    } catch (error) {
      console.error("Error loading open sources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: OpenSourceRequest) => {
    try {
      const response = await createOpenSource(data);
      if (response.success) {
        await loadOpenSources();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding open source:", error);
    }
  };

  const handleUpdate = async (data: OpenSourceRequest) => {
    if (!selectedOpenSource?.id) return;
    try {
      const response = await updateOpenSource(selectedOpenSource.id, data);
      if (response.success) {
        await loadOpenSources();
        setIsUpdateModalOpen(false);
        setSelectedOpenSource(null);
      }
    } catch (error) {
      console.error("Error updating open source:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      const response = await deleteOpenSource(id);
      if (response.success) await loadOpenSources();
    } catch (error) {
      console.error("Error deleting open source:", error);
    }
    setShowActionMenu(null);
  };

  const openUpdateModal = (openSource: OpenSourceResponse) => {
    setSelectedOpenSource(openSource);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<OpenSourceResponse>[] = [
    {
      key: "project_name",
      label: "Project",
      className: "min-w-[250px]",
      sortable: true,
      render: (_value, row) => (
        <div>
          <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-2">
            <FaCode className="text-blue-500" />
            {row.project_name}
          </div>
          {row.description && (
            <div className="text-sm text-gray-600 mt-1 line-clamp-2 max-w-md">
              {row.description}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "repo_url",
      label: "Repository",
      className: "min-w-[250px]",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaGithub className="text-gray-700" />
          {row.repo_url ? (
            <a
              href={row.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
            >
              {row.repo_url}
            </a>
          ) : (
            <span className="text-sm text-gray-500">-</span>
          )}
        </div>
      ),
    },
    {
      key: "stars",
      label: "Stars",
      className: "min-w-[120px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaStar className="text-yellow-500" />
          <span>{row.stars || 0}</span>
        </div>
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
                setSelectedOpenSource(row);
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
            <FaCode className="text-blue-500" />
            Open Source Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your open source contributions
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Project</span>
        </button>
      </div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Open Source List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {openSources.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={openSources}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      <div className="flex justify-center">
        <button
          onClick={loadOpenSources}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddOpenSourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateOpenSourceModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedOpenSource(null);
        }}
        onUpdate={handleUpdate}
        data={selectedOpenSource}
      />
    </div>
  );
};
