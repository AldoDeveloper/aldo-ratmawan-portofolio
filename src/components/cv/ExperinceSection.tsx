import { useFetchJson } from "../../../hooks/useFetchJson";
import { ExperienceListResponse } from "../../../types/experience.api";

interface Experience {
    id: number;
    position: string;
    company_name: string;
    start_date?: string;
    end_date?: string;
    employment_type?: string;
    is_remote?: boolean;
    is_current?: boolean;
    description: string;
}

const experiences: Experience[] = [
    {
        id: 1,
        position: 'Senior Full-Stack Developer',
        company_name: 'Tech Company Inc.',
        start_date: '2023-01-01',
        end_date: '2025-01-01',
        employment_type: 'Full-time',
        is_remote: false,
        is_current: true,
        description: 'Leading development of enterprise applications, mentoring junior developers, and implementing best practices across the team.'
    },
    {
        id: 2,
        position: 'Full-Stack Developer',
        company_name: 'Digital Agency',
        start_date: '2021-01-01',
        end_date: '2023-01-01',
        employment_type: 'Contract',
        is_remote: true,
        is_current: false,
        description: 'Developed multiple client projects including e-commerce platforms, CMS systems, and custom web applications.'
    },
    {
        id: 3,
        position: 'Junior Developer',
        company_name: 'Startup XYZ',
        start_date: '2019-01-01',
        end_date: '2021-01-01',
        employment_type: 'Part-time',
        is_remote: false,
        is_current: false,
        description: 'Started professional career building web applications and learning modern development frameworks and methodologies.'
    },
];

export const ExperienceSection: React.FC = () => {

    const { data ,loading, error } = useFetchJson<ExperienceListResponse>('/api/experiences'); // Replace with your actual API endpoint

    return (
        <section id="experience" className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Work <span className="text-yellow-500">Experience</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        My professional journey and career milestones
                    </p>
                </div>
                <div className="max-w-4xl mx-auto space-y-8">
                    {!error && data?.data?.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`relative bg-white dark:bg-gray-950 p-8 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition-all`}
                        >
                            <div className="absolute -left-3 top-8 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                                    <p className="text-blue-500 font-semibold mt-1">{exp.company_name}</p>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    {new Date(exp.start_date!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(exp.end_date!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}   