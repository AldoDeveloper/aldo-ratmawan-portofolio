
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { LayoutContextModeConfig } from '../../layout/layoutContext';
import { MenuItem } from 'primereact/menuitem';
import { FirebaseContextProvider } from '../../context/ContextApp';
import { resumeUrlData } from '../../firebase/storage/showStorage';

export default function Navbars() {
    const { changesMode, layoutMode } = React.useContext(LayoutContextModeConfig);
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [urlResume, setUrlResume] = React.useState<string>();
    React.useEffect(() =>{
        (async() =>{
             const urlResume = await resumeUrlData(firebaseApp?.appFirestore, 'CV.pdf');
             setUrlResume(urlResume)
        })();
    }, []);

    const handleClick = () =>{
        const createElementA  = document.createElement('a');
        createElementA.href   = urlResume as string;
        createElementA.target = '__blank';
        createElementA.click();
    }
    const start = () => {
        return (
            <React.Fragment>
                <div className="col-6">
                    <div className="flex gap-4">
                        <Image
                            alt="logo"
                            src={layoutMode?.theme === 'light' ? '/assets/image/logo-dev-light.png' : '/assets/image/logo-dev-dark.png'}
                            height={40}
                            width={40}
                            className="mr-2" />
                        <span className='align-self-center fs-2'>Aldo</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    const end = () => {
        return (
            <React.Fragment>
                <div className="flex gap-2">
                    <Button
                        rounded
                        style={{ color: 'GrayText' }}
                        icon={`pi ${layoutMode?.theme === 'dark' ? 'pi-sun' : 'pi-moon'}`}
                        size='small'
                        className={layoutMode?.theme === 'dark' ? 'bg-light' : 'bg-dark'}
                        onClick={() => changesMode(layoutMode?.theme === 'dark' ? 'light' : 'dark', 'light')} />
                    <Button
                        onClick={handleClick}
                        icon={'pi pi-arrow-down'}
                        label="Resume"
                        size='small'
                        severity="success"
                        rounded />
                </div>
            </React.Fragment>
        )
    }

    const itemsData : MenuItem[] = [
        {
            label: 'Project',
            icon: 'pi pi-home',
            url: '#project',
            style: {fontSize: '15px'}
        },
        {
            label: 'Service',
            icon: 'pi pi-wrench',
            url: '#service',
            style: {fontSize: '15px'}
        },
        {
            label: 'Advantage',
            icon: 'pi pi-eject',
            url: '#advantage',
            style: {fontSize: '15px'}
        },
        {
            label: 'Experience',
            icon: 'pi pi-user',
            url: '#exp',
            style: {fontSize: '15px'}
        },
    ];
    return (
        <React.Fragment>
            <div className="nav-head" style={{ width: '100%' }}>
                <Menubar
                    className={`container ${layoutMode?.theme== 'dark' ? 'text-white' : ''}`}
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    model={itemsData}
                    start={start}
                    end={end} />
            </div>
        </React.Fragment>
    )
}