import React from "react";
import {
  FaCode,
  FaBriefcase,
  FaEnvelope,
  FaEye,
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTools,
} from "react-icons/fa";
import Card from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  description,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div
          className={` px-2 py-2 rounded-full ${color.replace("text-", "bg-").replace("-600", "-100")} ${color}`}
        >
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    </Card>
  );
};

interface ProjectItem {
  id: number;
  name: string;
  techno: string[];
  deployed?: string;
  repo?: string;
  weblink?: string;
  date: string;
  status: "completed" | "in-progress" | "maintenance";
}

interface ActivityItem {
  id: number;
  type: "project" | "message" | "update" | "deploy";
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

export const DashboardIndex: React.FC<{}> = () => {
  // Sample data - replace with actual data from your API/database
  const stats = {
    totalProjects: 24,
    skills: 15,
    messages: 8,
    totalViews: 1250,
  };

  const recentProjects: ProjectItem[] = [
    {
      id: 1,
      name: "E-Commerce Platform",
      techno: ["Next.js", "TypeScript", "TailwindCSS"],
      deployed: "https://ecommerce.example.com",
      repo: "https://github.com/example/ecommerce",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 2,
      name: "Portfolio Website",
      techno: ["React", "Firebase", "Framer Motion"],
      weblink: "https://portfolio.example.com",
      date: "2024-03-10",
      status: "completed",
    },
    {
      id: 3,
      name: "Task Management App",
      techno: ["Vue.js", "Node.js", "MongoDB"],
      repo: "https://github.com/example/taskapp",
      date: "2024-03-05",
      status: "in-progress",
    },
    {
      id: 4,
      name: "Real-time Chat",
      techno: ["React", "Socket.io", "Express"],
      date: "2024-02-28",
      status: "maintenance",
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: "project",
      title: "New Project Added",
      description: "E-Commerce Platform has been added to portfolio",
      date: "2 hours ago",
      icon: <FaCode />,
    },
    {
      id: 2,
      type: "message",
      title: "New Message Received",
      description: "John Doe sent you a message regarding collaboration",
      date: "5 hours ago",
      icon: <FaEnvelope />,
    },
    {
      id: 3,
      type: "deploy",
      title: "Project Deployed",
      description: "Portfolio Website successfully deployed to production",
      date: "1 day ago",
      icon: <FaExternalLinkAlt />,
    },
    {
      id: 4,
      type: "update",
      title: "Profile Updated",
      description: "Work experience section has been updated",
      date: "2 days ago",
      icon: <FaTools />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "maintenance":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-500";
      case "message":
        return "bg-purple-500";
      case "deploy":
        return "bg-green-500";
      case "update":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <React.Fragment>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
           {`Welcome back! Here's what's happening with your portfolio.`}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={<FaCode />}
            color="text-blue-600"
            description="Active & completed"
          />
          <StatCard
            title="Skills"
            value={stats.skills}
            icon={<FaBriefcase />}
            color="text-green-600"
            description="Technologies mastered"
          />
          <StatCard
            title="Messages"
            value={stats.messages}
            icon={<FaEnvelope />}
            color="text-purple-600"
            description="Unread messages"
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            icon={<FaEye />}
            color="text-orange-600"
            description="This month"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Projects Table */}
          <div className="lg:col-span-2">
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Recent Projects
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                    View All
                  </button>
                </div>
              }
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Technologies
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Links
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <FaCalendarAlt className="text-xs" />
                              {project.date}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.techno.slice(0, 2).map((tech, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techno.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                +{project.techno.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                          >
                            {project.status.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {project.repo && (
                              <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                title="View Repository"
                              >
                                <FaGithub className="text-lg" />
                              </a>
                            )}
                            {(project.deployed || project.weblink) && (
                              <a
                                href={project.deployed || project.weblink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                title="View Live"
                              >
                                <FaExternalLinkAlt className="text-sm" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <Card
              header={
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Recent Activity
                </h2>
              }
            >
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full ${getActivityIconColor(activity.type)} flex items-center justify-center text-white`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card
          header={
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Quick Actions
            </h2>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <FaCode className="text-2xl" />
              <div className="text-left">
                <p className="font-semibold">Add Project</p>
                <p className="text-xs opacity-90">New portfolio item</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <FaEnvelope className="text-2xl" />
              <div className="text-left">
                <p className="font-semibold">Messages</p>
                <p className="text-xs opacity-90">View inbox</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <FaBriefcase className="text-2xl" />
              <div className="text-left">
                <p className="font-semibold">Update Skills</p>
                <p className="text-xs opacity-90">Manage technologies</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <FaEye className="text-2xl" />
              <div className="text-left">
                <p className="font-semibold">Analytics</p>
                <p className="text-xs opacity-90">View statistics</p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};