import React from "react";
import { Row, Card, Container } from 'react-bootstrap'
import { motion } from 'framer-motion';
import { useWorkExperince } from "@/Service/firebase/ServiceFirebase";

export default function WorkExperince() {
    const { workExp, loading, error } = useWorkExperince();

    return (
        <React.Fragment>
            <h1 className='fw-bold text-center'>My Work Experience</h1>
            <section className="static-banner">
                <Row style={{ width: '100%' }} className='p-2'>
                    <div className="col-12">
                        {
                            workExp.map((values, idx) => (
                                <motion.div whileHover={{ scale: 1.01 }} key={idx}>
                                    <Card className='mb-2'>
                                        <Card.Body>
                                            <Container>
                                                <Row className='g-5'>
                                                    <div className="col-lg-5">
                                                        <div className="d-flex justify-content-between">
                                                            <h4 className='text-center align-self-center'>{values?.year}</h4> {/* for year range */}
                                                            <picture>
                                                                <source srcSet="/assets/image/my-foto.png" type="image/png" />
                                                                <source srcSet="/assets/image/my-foto.png" type="image/jpg" />
                                                                <img src="/assets/image/my-foto.png" height={100} className='rounded-circle' alt="" />
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 align-self-center">
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <h4>{values?.typeJob}</h4>{/* for postion */}
                                                                <p className='text-warning' style={{ marginBottom: '0px' }}>{values?.company_name}</p> {/* for company name */}
                                                                <span className='text-warning'>{values?.address}</span> {/* for address */}
                                                            </div>
                                                            <div className="align-self-center">
                                                                <h6 className="fw-bold text-warning">{values?.jobType}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            ))
                        }
                    </div>
                </Row>
            </section>
        </React.Fragment>
    )
}