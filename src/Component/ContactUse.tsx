
import { useShowContact } from '@/Service/firebase/ServiceFirebase';
import React from 'react';
import { Card, ListGroup, Row } from 'react-bootstrap';
import * as BsIcons from 'react-icons/bs';
import { FirebaseContextProvider } from '../../context/ContextApp';
import { Button, Button as PrimeButton } from 'primereact/button';

type PropsTypeContact = {
    dataObj?: any,
    values?: any
}
const MyContact = (firebaseApp: any): Array<Promise<any>> => {
    return [
        useShowContact('My Phone', firebaseApp?.appFirestore, '/assets/image/phone.png', 'phone', 'list'),
        useShowContact('My Account', firebaseApp?.appFirestore, '/assets/image/social-media.png', 'myaccount', 'list'),
        useShowContact('Live Contact', firebaseApp?.appFirestore, '/assets/image/phone.png', 'livecontact', 'list'),
    ]
}

export default function ContactUse() {
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [dataContact, setDataContact] = React.useState<any>([]);

    React.useEffect(() => {
        (async () => {
            const promiseAll = await Promise.allSettled(MyContact(firebaseApp));
            const dataProm = promiseAll.map((values: any) => {
                return values?.value;
            });
            setDataContact(dataProm)
        })();
    }, []);

    const TypeUseContact = ({ dataObj, values }: PropsTypeContact): React.ReactNode => {
        switch (dataObj?.slughData) {
            case 'my-account':
                return (
                    <div className='align-self-center'>
                        <div className="d-flex gap-2">
                            <i className={`pi ${values?.icon} text-warning align-self-center`}></i>
                            <span className='fw-bold text-warning align-self-center'> {values?.name}</span>
                        </div>
                    </div>
                );
            case 'my-phone':
                return (
                    <span className='fw-bold text-warning'> {values?.name}</span>
                );
            default:
                return;
        }
    }

    const handleClickLiveWaButton = (data: any) => {
        const a = document.createElement('a');
        switch (data?.name.toLocaleLowerCase()) {
            case 'wa':
                a.href = 'https://api.whatsapp.com/send?phone=+6282175631416&text=Hello Aldo Ratmawan'
                a.target = '_blank'
                a.click();
                break;
            case 'email':
                a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=aldodeveloper19@gmail.com&cc=aldodeveloper19@gmail.com&su=Hello Aldo Ratmawan'
                a.target = '_blank'
                a.click();
                break;
            default:
                break;
        }
    }
    return (
        <React.Fragment>
            <h1 className='fw-bold text-center mb-4'>Contact Use</h1>
            <Row>
                {
                    dataContact?.map((valuesObj: any, idx: number) => (
                        <div className="col-md-4" key={idx}>
                            <Card className='mb-2'>
                                <Card.Header>
                                    <picture>
                                        <source srcSet={valuesObj?.img} type='image/png' />
                                        <source srcSet={valuesObj?.img} type='image/jpg' />
                                        <img className='d-block mx-auto' src={valuesObj?.img} height={80} alt="" />
                                    </picture>
                                </Card.Header>
                                <Card.Body className='p-2'>
                                    <h4 className='text-center fw-bold m-2 text-warning'>{valuesObj?.title}</h4>
                                    <ListGroup>
                                        {
                                            valuesObj?.data?.map((values: any, idx: number) => (
                                                <ListGroup.Item key={idx}>
                                                    {
                                                        valuesObj?.slughData === 'live-contact' ? (
                                                            <div className="d-flex justify-content-start">
                                                                {
                                                                    valuesObj?.slughData === 'live-contact' && (
                                                                        <div className='align-self-center w-100'>
                                                                            <div className="d-flex justify-content-between">
                                                                                <div className="d-flex gap-2">
                                                                                    <Button
                                                                                        onClick={async () => handleClickLiveWaButton(values)}
                                                                                        rounded
                                                                                        severity={values?.color}
                                                                                        key={idx}
                                                                                        size='small'
                                                                                        icon={`pi ${values?.icon}`} />
                                                                                    <span className='align-self-center fw-bold'>Open Chat {values?.name}</span>
                                                                                </div>
                                                                                <i className='pi pi-angle-double-right align-self-center text-600'></i>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex justify-content-between">
                                                                <div className='d-flex gap-3'>
                                                                    <TypeUseContact dataObj={valuesObj} values={values} />
                                                                </div>
                                                                <div className='d-flex gap-2 justify-content-center'>
                                                                    {
                                                                        valuesObj?.slughData === 'my-phone' && (
                                                                            <div className='align-self-center'>
                                                                                <BsIcons.BsFillTelephoneFill size={20} color={'orange'} />
                                                                                <span>{values?.number}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        valuesObj?.slughData === 'my-account' && (
                                                                            <>
                                                                                {
                                                                                    Object.hasOwn(values, 'dataGit') ? (
                                                                                        <div className="d-flex align-self-center gap-2">
                                                                                            <PrimeButton
                                                                                                size='small'
                                                                                                rounded
                                                                                                icon={`pi ${values?.dataGit?.buttonCopy?.icon}`}
                                                                                                severity={values?.dataGit?.buttonCopy?.color} />
                                                                                            <PrimeButton
                                                                                                size='small'
                                                                                                rounded
                                                                                                icon={`pi ${values?.dataGit?.buttonLink?.icon}`}
                                                                                                severity={values?.dataGit?.buttonLink?.color} />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <small>{values?.call}</small>
                                                                                    )
                                                                                }
                                                                            </>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </Row>
        </React.Fragment>
    )
}