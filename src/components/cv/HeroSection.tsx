import { AnimationSlideInShow } from "@/animation/AnimationContext";
import { configSlideInShow } from "@/animation/config";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Skeletons } from "../ui/Skelton";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";


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
        <section className="flex flex-row justify-center gap-6 bg-gray-50 dark:bg-gray-950 min-h-svh items-center">
            <div className="basis-1/2 mr-6">
                <AnimationSlideInShow id={'ansfa'} config={configSlideInShow}>
                    <div className="space-y-4">
                        {/* <h2 className="text-gray-900"><span>Hello,</span> I Am Aldo</h2> */}
                        {
                            isLoading ? (
                                <>
                                    <Skeletons>
                                        <Skeleton count={1} width={"100%"} height={60} className="mb-2" />
                                        <Skeleton count={1} width={"70%"} height={40} className="mb-2" />
                                        <Skeleton count={5} width={"90%"} height={28} className="mb-2" />
                                    </Skeletons>
                                    <div className='flex items-center space-x-4'>
                                        <Skeletons>
                                            <Skeleton count={1} width={120} height={45} className="mt-3" />
                                            <Skeleton count={1} width={150} height={45} className="mt-3" />
                                        </Skeletons>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-gray-900 space-y-3">
                                        {/* <h1 className="text-8xl font-bold text-yellow-500">Hello</h1> */}
                                        <h1 className="space-x-3">
                                            <span className="text-7xl text-blue-500 font-semibold">I Am</span>
                                            <span className="text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">{profile?.full_name}</span>
                                        </h1>
                                    </div>

                                    <h4 className='text-gray-600 dark:text-gray-100 font-semibold text-2xl'>{profile?.headline}</h4>
                                    <p className="text-gray-900 dark:text-gray-100 text-xl">
                                        {profile?.bio}
                                    </p>
                                    <div className='flex items-center space-x-4'>
                                        <button className="bg-gradient-to-r transition-all transform hover:scale-105 text-gray-100 dark:text-gray-800 from-cyan-500 to-blue-500 px-2 py-3 rounded-lg shadow w-[10rem] mt-3">
                                            <div className="flex justify-center items-center space-x-3">
                                                <FaGithub size={22} />
                                                <span className="font-semibold text-[17px]">Github</span>
                                            </div>
                                        </button>
                                        <button className="bg-gradient-to-r transition-all transform hover:scale-105 text-gray-100 dark:text-gray-800 from-cyan-500 to-blue-500 px-2 py-3 rounded-lg shadow w-[13rem] mt-3">
                                            <div className="flex justify-center items-center space-x-3">
                                                <FaChevronRight size={20} />
                                                <span className="font-semibold text-[17px]">Get In Touch</span>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </AnimationSlideInShow>
            </div>

            <div className="avatar">
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
                                height={300}
                                className='d-block mx-auto rounded-full' />
                        </>
                    )
                }
            </div>
        </section>
    )
}