import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { ContactResponse } from "../../../types/contact.api";
import { AddContactModal } from "./AddContactModal";
import { UpdateContactModal } from "./UpdateContactModal";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaAddressBook,
  FaLink,
  FaTag,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../../services/contact.service";
import { ContactRequest } from "../../../types/contact.api";

export const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<ContactResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] =
    useState<ContactResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetchContacts();
      if (response.success && response.data) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: ContactRequest) => {
    try {
      const response = await createContact(data);
      if (response.success) {
        await loadContacts();
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleUpdate = async (data: ContactRequest) => {
    if (!selectedContact?.id) return;
    try {
      const response = await updateContact(selectedContact.id, data);
      if (response.success) {
        await loadContacts();
        setIsUpdateModalOpen(false);
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }
    try {
      const response = await deleteContact(id);
      if (response.success) await loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
    setShowActionMenu(null);
  };

  const openUpdateModal = (contact: ContactResponse) => {
    setSelectedContact(contact);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const columns: Column<any>[] = [
    {
      key: "type",
      label: "Type",
      className: "min-w-[150px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-3">
          <div className="text-xl flex-shrink-0">
            <FaAddressBook className="text-blue-500" />
          </div>
          <span className="font-semibold text-gray-900 capitalize">{row.type}</span>
        </div>
      ),
    },
    {
      key: "url",
      label: "URL",
      className: "min-w-[300px]",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaLink className="text-gray-400 text-xs" />
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
          >
            {row.url}
          </a>
        </div>
      ),
    },
    {
      key: "label",
      label: "Label",
      className: "min-w-[180px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <FaTag className="text-gray-400 text-xs" />
          <span className="text-sm text-gray-700">{row.label}</span>
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
            <FaAddressBook className="text-blue-500" />
            Contacts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your contact information
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Contact</span>
        </button>
      </div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {contacts.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={contacts}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      <div className="flex justify-center">
        <button
          onClick={loadContacts}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateContactModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedContact(null);
        }}
        onUpdate={handleUpdate}
        data={selectedContact}
      />
    </div>
  );
};
