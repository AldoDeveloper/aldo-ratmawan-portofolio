import { useFetchJson } from '../../../hooks/useFetchJson';
import { ServiceListResponse } from '../../../types/service.api';
import { Skeletons } from '../ui/Skelton';
import Skeleton from 'react-loading-skeleton';

export const ServiceSection = () => {

    const { data, loading, error } = useFetchJson<ServiceListResponse>('/api/services'); // Replace with your actual API endpoint

    return (
        <section id="services" className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        My <span className="text-yellow-500">Services</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Comprehensive solutions for your development needs
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        loading ? (
                            <>
                            <Skeletons>
                                <Skeleton className='rounded-lg' count={1} width={"100%"} height={250}/>
                            </Skeletons>
                             <Skeletons>
                                <Skeleton className='rounded-lg' count={1} width={"100%"} height={250}/>
                            </Skeletons>
                             <Skeletons>
                                <Skeleton className='rounded-lg' count={1} width={"100%"} height={250}/>
                            </Skeletons>
                            </>
                        ) : (
                            <>
                                {loading == false && data?.data?.map((service) => (
                                    <div
                                        key={service.id}
                                        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="text-blue-500 mb-6">
                                            <i className={service.icon}></i>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                                    </div>
                                ))}
                            </>
                        )
                    }
                </div>
            </div>
        </section>
    )
}