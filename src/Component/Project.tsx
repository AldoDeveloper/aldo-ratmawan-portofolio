import React from "react";
import { Carousel } from 'primereact/carousel';
import { Card, Row, Modal } from "react-bootstrap";
import { Button as Primebutton } from 'primereact/button'
import { useServiceProject } from "@/Service/firebase/ServiceFirebase";
import { PropsProject } from "../../types/type";
import SkeltonProject from "@/skelton/SkeltonProject";
import GaleriaProjects from "./galeria";
import { ScrollPanel } from 'primereact/scrollpanel';

const responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

export default function Project() {

    const [showVisibled, setVisible] = React.useState<boolean>(false);
    const { loading, error, project } = useServiceProject();
    const [selectedProject, setSelectedProject] = React.useState<PropsProject>();

    const handleClickShow = ({ project }: { project: PropsProject }) => {
        setSelectedProject(project);
        setVisible(true);
    }

    const handleCLick = ({ deploy, weblink, repo }: PropsProject) => {
        const createElementA = document.createElement('a');
        switch (deploy) {
            case true:
                createElementA.href = weblink as string;
                createElementA.target = '_blank'
                createElementA.click();
                break;
            default:
                createElementA.href = repo?.url as string;
                createElementA.target = '_blank'
                createElementA.click();
                break;
        }
    }

    const DeployConfig = ({ project }: { project: PropsProject }) => {
        if (project?.deploy) {
            return <Primebutton
                onClick={async () => handleCLick(project)}
                severity="warning"
                size="small"
                label="Web"
                icon="pi pi-link" />
        }
        return (
            <Primebutton
                size="small"
                onClick={async () => handleCLick(project)}
                label="Github"
                icon="pi pi-github" />
        )
    }
    const productTemplate = (project: PropsProject) => {
        return (
            <div
                className="card py-5 px-3 m-2">
                <Card.Header className="text-center">
                    <h4 className="fw-bold pt-3">{project?.name}</h4>
                    <h6 className="fw-bold text-success">{project?.techno}</h6>
                </Card.Header>
                <Card.Body>
                    <h5 className="text-center text-warning fw-bold"> {project?.title}</h5>
                    <div className="project-thumbnail">
                        <picture>
                            <source src={project?.urlBackground} type="image/png" />
                            <source src={project?.urlBackground} type="image/jpg" />
                            <img src={project?.urlBackground} alt="logo data" />
                        </picture>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex gap-2 justify-content-center">
                        <Primebutton
                            onClick={() => handleClickShow({ project: project })}
                            severity="danger"
                            size="small"
                            label="Detail"
                            icon="pi pi-list" />
                        <DeployConfig project={project} />
                    </div>
                </Card.Footer>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Modal
                scrollable
                backdrop="static"
                centered
                size="lg"
                show={showVisibled}
                onHide={() => setVisible(false)}>
                <Modal.Header>
                    <h5 className="text-center">Project Backend</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-4">
                        <div className="col-md-12">
                            <h5 className="fw-bold">Description</h5>
                            {
                                selectedProject?.doc?.description && (
                                    <ScrollPanel
                                        style={{ width: '100%', height: '200px' }}
                                        className="custombar1">
                                        <div dangerouslySetInnerHTML={{ __html: selectedProject?.doc?.description as string }}>
                                        </div>
                                    </ScrollPanel>
                                )
                            }
                            {
                                !selectedProject?.doc?.description && (
                                    <h4 className="text-center mb-4">No Description...</h4>
                                )
                            }
                        </div>
                    </Row>
                    <ScrollPanel style={{ width: '100%', height: '300px' }} className="custombar1">
                        <GaleriaProjects
                            items={selectedProject?.media}
                            position="top"
                            numCount={5}
                        />
                    </ScrollPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Primebutton severity="danger" size="small" label="Close" onClick={() => setVisible(false)} icon={'pi pi-times'} />
                </Modal.Footer>
            </Modal>
            <h1 className="text-center fw-bold">MY PROJECT</h1>
            <section className="static-bannes">6648684684668464
                {!loading && <SkeltonProject count={2} />}
                {loading && (
                    <Carousel
                        showIndicators={false}
                        value={project}
                        numVisible={2}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        className="custom-carousel"
                        circular
                        autoplayInterval={3000}
                        itemTemplate={productTemplate} />
                )}
            </section>
        </React.Fragment>
    )
}