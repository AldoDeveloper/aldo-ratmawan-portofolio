import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HeroSection } from './HeroSection';
import { Navbar } from './Navbar';
import { ProjectSection } from './ProjectSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperinceSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { ServiceSection } from './ServiceSection';

const CV: React.FC = () => {

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
                <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

                {/* Hero Section */}
                <HeroSection />

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
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default CV;
