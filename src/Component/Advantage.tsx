import React from 'react';
import { Row } from 'react-bootstrap';
import { LayoutContextModeConfig } from '../../layout/layoutContext';
import { motion } from 'framer-motion';
import { Rating } from 'primereact/rating';
import { Advantage } from '../../types/type';
import { useListServiceAdvantage } from '@/Service/firebase/ServiceFirebase';
import { Paginator } from 'primereact/paginator';
import { usePagination } from './usePagination';

export default function Advantage() {
    const { layoutMode } = React.useContext(LayoutContextModeConfig);
    const { loading, advantage } = useListServiceAdvantage();
    const { onPageChange, page, totalPages, startIndex, endIndex } = usePagination({ itemsPerPage: 6, items: advantage });

    return (
        <>
            <section className='static-banner'>
                <Row className='justify-content-center'>
                    <div className="col-lg-6 col-xl-6 align-self-center mb-5">
                        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                            <div
                                style={{ width: '100%' }}
                                className={`wpo-about-experience ${layoutMode?.theme === 'dark' ? '' : 'light'}`}>
                                <h2>05</h2>
                                <span>Year Of Experience</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-xl-6'>
                        <h2 id='skil-title' className='fw-bold fs-1 mb-5'>My Skils</h2>
                        <p id='desc-title'>I have deep understanding of Nestjs, Nextjs, Laravel, Java Springboot and others, backed by 5+ years of experience in this field. I have successfully created trading web applications and others that reflect my skills and expertise.</p>
                        <div className='wpo-static-advantage d-flex justify-content-center' style={{}}>
                            {
                                advantage?.slice(startIndex, endIndex).map((values, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        className="wpo-advantage-banner">
                                        <div className="wpo-body">
                                            <div>
                                                <picture>
                                                    <source srcSet={layoutMode?.theme === 'dark' ? values?.modeDark?.path : values?.path} type="image/png" />
                                                    <source srcSet={layoutMode?.theme === 'dark' ? values?.modeDark?.path : values?.path} type="image/jpg" />
                                                    <img
                                                        className='mx-auto d-block'
                                                        src={layoutMode?.theme    === 'dark' ? values?.modeDark?.path : values?.path}
                                                        width={layoutMode?.theme  === 'light' ? 80 : values?.name?.toLocaleLowerCase() === 'nextjs' ? '' : 80}
                                                        height={layoutMode?.theme === 'light' ? 70 : values?.name?.toLocaleLowerCase() === 'nextjs' ? '' : 70}
                                                        alt={values?.name} />
                                                </picture>
                                                <div className="d-flex justify-content-center mt-2">
                                                    <Rating value={values?.start} readOnly cancel={false} />
                                                </div>
                                                <p className={`text-center fw-bold mt-2 text-warning`}>{values?.name}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </Row>
            </section>
            <Paginator
                first={page}
                rows={1}
                pageLinkSize={20}
                style={{ backgroundColor: 'transparent' }}
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                totalRecords={totalPages}
                onPageChange={onPageChange} />
        </>
    )
}