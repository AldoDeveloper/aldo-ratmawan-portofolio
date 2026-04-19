import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { ProfileRequest } from "types/profile.api";

export const Footer: React.FC<{ profile: ProfileRequest }> = ({ profile }) => {

    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent mb-2">
                            { profile?.full_name }
                        </h3>
                        <p className="text-gray-400 md:text-start text-center">{profile?.headline }</p>
                    </div>
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/AldoDeveloper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:aldo.ratmawan@email.com"
                            className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Aldo Ratmawan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}