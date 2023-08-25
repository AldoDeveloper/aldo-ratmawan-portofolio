import React from 'react';
import { Card, Row } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa6';
import { FirebaseContextProvider } from '../../context/ContextApp';
import { useShowServiceKey, TrigerService } from '@/Service/firebase/ServiceFirebase';
import { slicingText } from '@/Help/StringHelp';
import { configAnimationSlideShow } from '@/Animation/config';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Paginator } from 'primereact/paginator';
import { usePagination } from './usePagination';
import SkeltonService from '@/skelton/SkeltonService';
import { ScrollPanel } from 'primereact/scrollpanel';

type PropsService = {
    name?: string,
    id?: number,
    key?: string
}

const buttonListService: PropsService[] = [
    {
        id: 1,
        key: 'backend',
        name: 'BACK-END'
    },
    {
        id: 2,
        key: 'frontend',
        name: 'FRONT-END'
    }
]

export default function MyService() {
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [selectedService, setSelectedService]   = React.useState<PropsService>(buttonListService[0]);
    const { loading, service, error, setService } = useShowServiceKey('backend', 'list');
    const { onPageChange, page, startIndex, endIndex, totalPages } = usePagination({ itemsPerPage: 6, items: service })

    const handleClickService = async (values: PropsService) => {
        const { data, isError } = await TrigerService(firebaseApp?.appFirestore, 'service', values?.key as string, 'list');
        setService(data);
        setSelectedService(values);
    }

    return (
        <React.Fragment>
            <h1 className='fw-bold text-center'>MY SERVICE</h1>
            <section className="static-banners " style={{ marginTop: '80px' }}>
                <div>
                    <div className="d-flex justify-content-center gap-4 mb-5">
                        {
                            buttonListService?.map((values, idx) => (
                                <button
                                    key={idx}
                                    className={`btn-service ${(idx + 1) === selectedService?.id ? 'selected' : ''}`}
                                    onClick={() => handleClickService(values)}>{values?.name}
                                </button>
                            ))
                        }
                    </div>
                    <Row className='justify-content-center'>
                        { loading && <SkeltonService count={6} />}
                        { !loading && (
                            <>
                                {
                                    service?.slice(startIndex, endIndex).map((values: any, idx: number) => (
                                        <div className="col-md-4" key={idx}>
                                            <AnimatePresence>
                                                <motion.div
                                                    key={idx}
                                                    transition={{ duration: `0.${(idx + 1) + 4}` }}
                                                    initial={'hidde'}
                                                    animate={'show'}
                                                    exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
                                                    variants={configAnimationSlideShow}>
                                                    <Card className='shadow-sm mb-3' style={{ height: '350px' }}>
                                                        <Card.Body>
                                                            <div className="d-flex align-items-center">
                                                                <div className="body-service">
                                                                    <div className="icon-service">
                                                                        <FaIcons.FaConnectdevelop size={70} />
                                                                    </div>
                                                                    <h5 className={'mt-4 text-center fw-bold text-warning'}>{values?.name}</h5>
                                                                    <ScrollPanel  style={{ width: '100%', height: '200px' }} className='custombar1'>
                                                                        <p className='text-center'>{slicingText(160, values?.description)}</p>
                                                                    </ScrollPanel>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    ))
                                }
                            </>
                        )}
                    </Row>
                    <Paginator
                        first={page}
                        rows={1}
                        pageLinkSize={20}
                        style={{ backgroundColor: 'transparent' }}
                        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        totalRecords={totalPages}
                        onPageChange={onPageChange} />
                </div>
            </section>
        </React.Fragment>
    )
}