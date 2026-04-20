import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { LayoutDashboardContext } from "../../../context/ContextApp";
import { FaFilePdf } from "react-icons/fa";

export const Navbar: React.FC<{ activeSection: string; profile: any, scrollToSection: (activeSection: string) => void }> = ({ activeSection, scrollToSection, profile}) => {
    
    const { onToggleTheme, theme } = useContext(LayoutDashboardContext);
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">
                        {profile?.full_name}
                    </h1>
                    <div className="hidden md:flex space-x-8">
                        {['Home', 'Projects', 'Services', 'Skills', 'Experience', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`text-sm font-medium transition-colors hover:text-blue-500 ${activeSection === item.toLowerCase()
                                    ? 'text-blue-500'
                                    : 'text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3">
                        <a
                            href={`/assets/image/AldoRatmawanCv.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            <div className="flex items-center space-x-2">
                                <FaFilePdf className="text-xl"  />
                                <span>C V</span>
                            </div>
                        </a>
                         <button
                            onClick={onToggleTheme}
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r cursor-pointer from-cyan-500 to-yellow-500 text-white px-2 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            {
                                theme == 'dark' ? (
                                    <>
                                        <FaSun className="text-xl"/>
                                    </>
                                ) : (
                                    <>
                                        <FaMoon className="text-xl text-gray-600"/>
                                    </>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}