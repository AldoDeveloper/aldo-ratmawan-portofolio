import React, { useState, useEffect } from "react";
import { Table, Column } from "../ui/Table";
import Card from "../ui/Card";
import { ArticleResponse } from "../../../types/article.api";
import { AddArticleModal } from "./AddArticleModal";
import { UpdateArticleModal } from "./UpdateArticleModal";
import {
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaEye,
  FaPen,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/article.service";
import { ArticleRequest } from "../../../types/article.api";

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleResponse | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetchArticles();

      if (response.success && response.data) {
        setArticles(response.data);
      } else {
        console.error("Failed to load articles:", response.message);
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: ArticleRequest) => {
    try {
      const response = await createArticle(data);

      if (response.success && response.data) {
        await loadArticles(); // Reload the list
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add article:", response.message);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleUpdate = async (data: ArticleRequest) => {
    if (!selectedArticle?.id) return;

    try {
      const response = await updateArticle(selectedArticle.id, data);

      if (response.success && response.data) {
        await loadArticles(); // Reload the list
        setIsUpdateModalOpen(false);
        setSelectedArticle(null);
      } else {
        console.error("Failed to update article:", response.message);
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const response = await deleteArticle(id);

      if (response.success) {
        await loadArticles(); // Reload the list
      } else {
        console.error("Failed to delete article:", response.message);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }

    setShowActionMenu(null);
  };

  const openUpdateModal = (article: ArticleResponse) => {
    setSelectedArticle(article);
    setIsUpdateModalOpen(true);
    setShowActionMenu(null);
  };

  const getPublishedStatusColor = (published: boolean | undefined) => {
    if (published) {
      return "bg-green-100 text-green-700 border border-green-200";
    }
    return "bg-gray-100 text-gray-700 border border-gray-200";
  };

  const columns: Column<ArticleResponse>[] = [
    {
      key: "title",
      label: "Title",
      className: "min-w-[300px]",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-start gap-3">
          {row.thumbnail_url ? (
            <img
              src={row.thumbnail_url}
              alt={row.title}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaFileAlt className="text-blue-500 text-xl" />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {row.title}
            </div>
            {row.slug && (
              <div className="text-xs text-gray-500 mt-1 font-mono">
                /{row.slug}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      className: "min-w-[180px]",
      sortable: true,
      render: (_value, row) => (
        <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
          {row.slug || "-"}
        </span>
      ),
    },
    {
      key: "published",
      label: "Status",
      className: "min-w-[140px]",
      sortable: true,
      render: (_value, row) => (
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getPublishedStatusColor(
            row.published
          )}`}
        >
          {row.published ? "Published" : "Draft"}
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
    total: articles.length,
    published: articles.filter((a) => a.published).length,
    draft: articles.filter((a) => !a.published).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaFileAlt className="text-blue-500" />
            Articles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your blog posts and articles
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FaPlus />
          <span>Add Article</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <FaFileAlt className="text-2xl" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Published</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.published}
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
              <p className="text-sm text-gray-600 font-medium">Draft</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.draft}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <FaPen className="text-2xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Table Card */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Article List
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1.5 bg-gray-100 rounded-lg">
                {articles.length} items
              </span>
            </div>
          </div>
        }
      >
        <Table
          columns={columns}
          data={articles}
          isLoading={isLoading}
          showGridLine={false}
        />
      </Card>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={loadArticles}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Loading..." : "Refresh"}</span>
        </button>
      </div>

      {/* Add Modal */}
      <AddArticleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      {/* Update Modal */}
      <UpdateArticleModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedArticle(null);
        }}
        onUpdate={handleUpdate}
        data={selectedArticle}
      />
    </div>
  );
};
