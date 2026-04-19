import React from "react";
import { FaCode, FaGithub } from "react-icons/fa6";
import { useFetchJson } from "../../../hooks/useFetchJson";
import { ProjectListResponse } from "../../../types/project.api";
import { Skeletons } from "../ui/Skelton";
import Skeleton from "react-loading-skeleton";
import CustomCarousel from "../ui/Carousel";

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
                <CustomCarousel perPage={3} height="auto" breakpoints={{ desktop: 3, tablet: 3, mobile: 1 }}>
                    {!error && data?.success && data?.data?.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl md:h-[590px] overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                            <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                                <FaCode className="text-white text-6xl" />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">{project.title}</h3>
                                <div className="max-h-[6.5rem] overflow-y-scroll">
                                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                                </div>
                                <div className="w-full overflow-y-visible md:h-20">
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
                </CustomCarousel>
                {/*             
                <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        loading && (
                            <>
                                <Skeletons>
                                    <Skeleton className="rounded-lg" width={"100%"} height={'25rem'} />
                                </Skeletons>
                                <Skeletons>
                                    <Skeleton className="rounded-lg" width={"100%"} height={'25rem'} />
                                </Skeletons>
                                <Skeletons>
                                    <Skeleton className="rounded-lg" width={"100%"} height={'25rem'} />
                                </Skeletons>
                            </>
                        )
                    }
                </div> */}
            </div>
        </section>
    )
}