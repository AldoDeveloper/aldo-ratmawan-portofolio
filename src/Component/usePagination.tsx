
import React from 'react';

interface PropsPagination{
    itemsPerPage: number;
    items: Array<any>
}

export const usePagination = ({ itemsPerPage, items } : PropsPagination) =>{
    
    const [page, setPage]   = React.useState<number>(0);
    const [index, setIndex] = React.useState<{startIndex : number, endIndex : number}>({startIndex: 0, endIndex: itemsPerPage});
    const totalPages   = Math.ceil(items.length / itemsPerPage);

    const onPageChange = (event: any) =>{
        setPage(event.first);
        const startIndex = event.first * itemsPerPage ;
        const endIdex    = startIndex + itemsPerPage;
        setIndex({startIndex: startIndex, endIndex:  endIdex})
    }
    
    const  { startIndex, endIndex } = index;
    return { onPageChange, page, startIndex, endIndex, totalPages }
}