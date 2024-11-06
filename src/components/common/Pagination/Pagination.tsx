import React from 'react';
import {Pagination as MuiPagination} from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPage, onPageChange}) => {
    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <MuiPagination
            count={totalPage}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
        />
    );
};

export {Pagination};
