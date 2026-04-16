import React from "react";
import { FaCode, FaGithub} from "react-icons/fa6";
import { useFetchJson } from "../../../hooks/useFetchJson";
import { ProjectListResponse } from "../../../types/project.api";

export interface Project {
    id: number;
    title: string;
    slug?: string;
    description: string;
    tech_stacks: string[];
    thumbnail_url: string;
    repo_url?: string;
    demo_url?: string;
    content_md?: string;
    created_at?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce with payment integration and admin dashboard',
        tech_stacks: ['Next.js', 'NestJS', 'PostgreSQL'],
        thumbnail_url: '/assets/thumbnail_url/project1.jpg',
        repo_url: '#',
        demo_url: '#'
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'Real-time collaboration tool with WebSocket integration',
        tech_stacks: ['React', 'Node.js', 'MongoDB'],
        thumbnail_url: '/assets/thumbnail_url/project2.jpg',
        repo_url: '#',
        demo_url: '#'
    },
    {
        id: 3,
        title: 'Portfolio CMS',
        description: 'Content management system for creative professionals',
        tech_stacks: ['Next.js', 'Laravel', 'MySQL'],
        thumbnail_url: '/assets/thumbnail_url/project3.jpg',
        repo_url: '#',
        demo_url: '#'
    },
];

export const ProjectSection: React.FC = () => {

    
    const { data, loading, error } = useFetchJson<ProjectListResponse>('/api/projects'); // Replace with your actual API endpoint

    return (
        <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Featured <span className="text-blue-500">Projects</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Showcasing my best work and recent developments
                    </p>
                </div>
                <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!error && data?.data?.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                            <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                                <FaCode className="text-white text-6xl" />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">{project.title}</h3>
                                <div className="max-h-[6.5rem] overflow-y-scroll">
                                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stacks?.map((tech_stacks, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {tech_stacks}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-3 pt-4">
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            className="flex-1 bg-gray-900 dark:bg-gray-700 text-white text-center py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <FaGithub className="inline mr-2" />
                                            Code
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition-all"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}