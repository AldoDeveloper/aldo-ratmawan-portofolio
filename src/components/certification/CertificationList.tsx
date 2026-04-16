import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { CertificationResponse } from "../../../types/certification.api";
import { AddCertificationModal } from "./AddCertificationModal";
import { UpdateCertificationModal } from "./UpdateCertificationModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaCertificate,
  FaBuilding,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../services/certification.service";
import { CertificationRequest } from "../../../types/certification.api";

export const CertificationList: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetchCertifications();
      if (response.success && response.data) {
        setCertifications(response.data);
      }
    } catch (error) {
      console.error("Error loading certifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: CertificationRequest) => {
    try {
      const response = await createCertification(data);
      if (response.success) {
        await loadCertifications();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };

  const handleUpdate = async (data: CertificationRequest) => {
    if (!selectedCertification?.id) return;
    try {
      const response = await updateCertification(selectedCertification.id, data);
      if (response.success) {
        await loadCertifications();
        setIsUpdateModalOpen(false);
        setSelectedCertification(null);
      }
    } catch (error) {
      console.error("Error updating certification:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this certification?")) {
      return;
    }
    try {
      const response = await deleteCertification(id);
      if (response.success) await loadCertifications();
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
    setShowActionMenu(null);
  };

  const openUpdateModal = (certification: CertificationResponse) => {
    setSelectedCertification(certification);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<CertificationResponse>[] = [
    {
      key: "name",
      label: "Certification",
      className: "min-w-[250px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">
            <FaCertificate className="text-yellow-500" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {row.name}
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
      key: "issue_date",
      label: "Issue Date",
      className: "min-w-[130px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400 text-xs" />
          <span className="text-sm text-gray-700">
            {row.issue_date
              ? new Date(row.issue_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "-"}
          </span>
        </div>
      ),
    },
    {
      key: "credential_url",
      label: "Credential",
      className: "min-w-[180px]",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaLink className="text-gray-400 text-xs" />
          {row.credential_url ? (
            <a
              href={row.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
            >
              {row.credential_url}
            </a>
          ) : (
            <span className="text-sm text-gray-500">-</span>
          )}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaCertificate className="text-yellow-500" />
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your professional certifications
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Certification</span>
        </button>
      </div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Certification List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {certifications.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={certifications}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      <div className="flex justify-center">
        <button
          onClick={loadCertifications}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddCertificationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateCertificationModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCertification(null);
        }}
        onUpdate={handleUpdate}
        data={selectedCertification}
      />
    </div>
  );
};
