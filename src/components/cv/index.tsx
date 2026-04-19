import React from 'react';
import { HeroSection } from './HeroSection';
import { Navbar } from './Navbar';
import { ProjectSection } from './ProjectSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperinceSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { ServiceSection } from './ServiceSection';
import { ProfileDetailResponse, ProfileRequest } from 'types/profile.api';

interface ArgsPageIndex{
    profile?: ProfileDetailResponse
}

const CV: React.FC<ArgsPageIndex> = ({ profile }) => {

    const [activeSection, setActiveSection] = React.useState('home');

    // Scroll to section handler
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <React.Fragment>
            <div className='w-full overflow-x-hidden bg-gray-50 dark:bg-gray-950'>
                <Navbar 
                    profile={profile?.data} 
                    activeSection={activeSection} 
                    scrollToSection={scrollToSection} />

                {/* Hero Section */}
                <HeroSection 
                    scrollSection={scrollToSection} 
                    profile={profile?.data as any}
                />

                {/* Projects Section */}
                <ProjectSection />

                {/* Services Section */}
                <ServiceSection />

                {/* Skills Section */}
                <SkillsSection />

                {/* Experience Section */}
                <ExperienceSection />

                {/* Contact Section */}
                <ContactSection />

                {/* Footer */}
                <Footer profile={profile?.data as any}/>
            </div>
        </React.Fragment>
    );
};

export default CV;
