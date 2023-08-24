import React from 'react';
import { Card } from 'react-bootstrap';
import { MySkeleton } from './my.skeleton';

export default function SkeltonService({ count }: { count: number }) {
    return (
        <React.Fragment>
            {
                Array(count).fill(0).map((__, idx) => (
                    <div className="col-md-4" key={idx}>
                        <Card className='shadow-sm mb-3' style={{ height: '350px' }}>
                            <Card.Body>
                                <div className="icon-service mb-5">
                                    <MySkeleton width='5rem' height='5rem' />
                                </div>
                                <MySkeleton width='14rem' height='1.5rem' mb='mb-3' />
                                {
                                    Array(5).fill(0).map((__, idx) => (
                                        <MySkeleton key={idx} width='100%' mb='mb-2' />
                                    ))
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }
        </React.Fragment>
    )
}