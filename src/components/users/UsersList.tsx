import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAllUsers } from '../../store/slices';
import { UserListView } from '../common/UserListView';
import { Pagination } from '../common/Pagination';
import { Container, Box, CircularProgress, Alert, Stack } from '@mui/material';

const UsersList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, pagination, loading, error } = useAppSelector((state) => state.users);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        dispatch(fetchAllUsers({ page: currentPage, pageSize }));
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress color="primary" size={50} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error" variant="outlined">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <UserListView
                title="User List"
                items={users}
                getItemLink={(user) => `/users/${user.user_id}`}
                renderItemName={(user) => `${user.user_firstname} ${user.user_lastname}`}
            />

            {pagination && (
                <Stack alignItems="center" mt={4}>
                    <Pagination
                        currentPage={pagination.current_page}
                        totalPage={pagination.total_page}
                        onPageChange={handlePageChange}
                    />
                </Stack>
            )}
        </Container>
    );
};

export { UsersList };
