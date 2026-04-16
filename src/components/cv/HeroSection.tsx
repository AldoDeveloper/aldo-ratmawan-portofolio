import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Skeletons } from "../ui/Skelton";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { LayoutDashboardContext } from "../../../context/ContextApp";


export interface UserProfile {
    id: string;
    full_name: string;
    username: string;
    email: string;
    headline: string;
    bio: string;
    avatar_url: string;
    resume_url: string;
    location: string;
    is_available: number; // bisa diubah ke boolean jika di-mapping
    years_of_experience: number;
    created_at: string; // bisa diubah ke Date jika diparse
    updated_at: string; // bisa diubah ke Date jika diparse
}

export const HeroSection: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const { theme } = useContext(LayoutDashboardContext);


    const getProfile = async () => {
        try {
            const res = await fetch('/api/profiles/f1a2b3c4-1234-5678-9101-abcdefabcdef');
            if (!res.ok) {
                throw new Error('Failed to fetch profile data');
            }
            const { data } = await res.json();
            setProfile(data);
            // await new Promise(resolve => setTimeout(resolve, 5000));
            setIsLoading(false);
        } catch (err) {
            setErr((err as Error).message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);


    return (
        <section className="flex flex-col-reverse mt-20 md:mt-0 py-2 md:flex-row justify-center gap-6 bg-gray-50 dark:bg-gray-950 min-h-svh items-center">
            <div className="w-full md:basis-1/2 md:mr-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {
                        isLoading ? (
                            <div>
                                <Skeletons>
                                    <Skeleton count={1} width={"100%"} height={50} className="mb-2" />
                                    <Skeleton count={1} width={"70%"} height={35} className="mb-2" />
                                    <Skeleton count={4} width={"100%"} height={24} className="mb-2" />
                                </Skeletons>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Skeletons>
                                        <Skeleton width={120} height={45} />
                                        <Skeleton width={150} height={45} />
                                    </Skeletons>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Title */}
                                <div className="text-gray-900 space-y-2">
                                    <h1 className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center md:text-left">
                                        <span className="text-4xl sm:text-5xl md:text-6xl text-blue-500 font-semibold">
                                            I Am
                                        </span>
                                        <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                            {profile?.full_name}
                                        </span>
                                    </h1>
                                </div>

                                {/* Headline */}
                                <h4 className="text-center md:text-left text-gray-600 dark:text-gray-100 font-semibold text-lg sm:text-xl md:text-2xl">
                                    {profile?.headline}
                                </h4>

                                {/* Bio */}
                                <p className="text-justify md:text-left px-2 text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed">
                                    {profile?.bio}
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-row px-3 gap-2 md:gap-3 justify-center md:justify-start items-center">

                                    <button className="w-full sm:w-[10rem] bg-gradient-to-r from-cyan-500 to-blue-500 text-white dark:text-gray-800 px-3 py-3 rounded-lg shadow transition-all transform hover:scale-105">
                                        <div className="flex justify-center items-center gap-2">
                                            <FaGithub size={20} />
                                            <span className="font-semibold text-sm sm:text-base">Github</span>
                                        </div>
                                    </button>

                                    <button className="w-full sm:w-[13rem] bg-gradient-to-r from-cyan-500 to-blue-500 text-white dark:text-gray-800 px-3 py-3 rounded-lg shadow transition-all transform hover:scale-105">
                                        <div className="flex justify-center items-center gap-2">
                                            <FaChevronRight size={18} />
                                            <span className="font-semibold text-sm sm:text-base">
                                                Get In Touch
                                            </span>
                                        </div>
                                    </button>

                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={theme == 'dark' ? `avatar` : ""}>
                {
                    isLoading ? (
                        <>
                            <Skeletons>
                                <Skeleton circle={true} count={1} width={330} height={330} className="mx-auto" />
                            </Skeletons>
                        </>
                    ) : (
                        <>
                            <Image
                                alt="foto me"
                                src={'/assets/image/my-foto.png'}
                                width={`400`}
                                height={400}
                                className='d-block max-w-[300px] md:max-w-[400px] mx-auto rounded-full' />
                        </>
                    )
                }
            </div>
        </section>
    )
}