import Skeleton from "react-loading-skeleton";
import { useFetchJson } from "../../../hooks/useFetchJson";
import { SkillListResponse, SkillResponse } from "../../../types/skill.api";
import { Skeletons } from "../ui/Skelton";

interface Skill {
    id: number;
    name: string;
    icon_svg: string;
    category?: string;
    level?: string;
    level_percent?: number;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export const SkillsSection: React.FC = () => {

    const { data, loading, error } = useFetchJson<SkillListResponse>('/api/skills');

    return (
        <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Technical <span className="text-blue-500">Skills</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Technologies and tools I work with
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {
                        loading && (
                            <>
                                <Skeletons>
                                    <Skeleton width={'100%'} height={'7rem'}/>
                                </Skeletons>
                                <Skeletons>
                                    <Skeleton width={'100%'} height={'7rem'}/>
                                </Skeletons>
                                <Skeletons>
                                    <Skeleton width={'100%'} height={'7rem'}/>
                                </Skeletons>
                            </>
                        )
                    }

                    {!error && data?.success && data?.data?.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-blue-500 text-3xl">
                                    <div style={{ width: 40, height: 40 }} dangerouslySetInnerHTML={{ __html: skill.icon_svg }} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${skill.level_percent}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2">{skill.level_percent}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}