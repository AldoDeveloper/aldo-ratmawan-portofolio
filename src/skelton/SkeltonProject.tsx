
import React from 'react';
import { Card } from 'react-bootstrap';
import { MySkeleton } from './my.skeleton';

export default function SkeltonProject({ count }: { count: number }) {
    return (
        <React.Fragment>
            <div className="row">
                {
                    Array(count).fill(0).map((__, idx) => (
                        <div className="col-md-6" key={idx}>
                            <div
                                className="card py-5 px-3 m-2">
                                <Card.Header className="text-center">
                                    <MySkeleton width='20rem' mb='mb-2'/>
                                    <MySkeleton width='15rem' mb='mb-2'/>
                                </Card.Header>
                                <Card.Body>
                                    <MySkeleton width='10rem' height='22px' mb='m-3'/>
                                    <div className="project-thumbnail">
                                        <MySkeleton width="100%" height="230px"/>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <MySkeleton width='6.5rem' height='2.5rem'/>
                                        <MySkeleton width='6.5rem' height='2.5rem'/>
                                    </div>
                                </Card.Footer>
                            </div>
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    )
}