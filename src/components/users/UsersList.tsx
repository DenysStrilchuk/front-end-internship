import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CircularProgress, Avatar} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchAllUsers} from '../../store/slices';
import {UserListView} from '../common/UserListView';
import {Pagination} from '../common/Pagination';
import styles from './UsersList.module.css';
import {IUser} from "../../models/IUser";

const UsersList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {users, pagination, loading, error} = useAppSelector((state) => state.users);
    const searchParams = new URLSearchParams(location.search);
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const pageSize = 10;

    useEffect(() => {
        dispatch(fetchAllUsers({page: currentPage, pageSize}));
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`, {replace: true});
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress color="primary"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.alertContainer}>
                <div className={styles.alert}>
                    {t('errorOccurred', {error})}
                </div>
            </div>
        );
    }

    const renderItem = (user: IUser) => (
        <div className={styles.userItem}>
            <Avatar
                src={user.user_avatar}
                alt={`${user.user_firstname} ${user.user_lastname}`}
                className={styles.avatar}
            />
            <span className={styles.userName}>
                {`${user.user_firstname} ${user.user_lastname}`}
            </span>
        </div>
    );

    return (
        <div className={styles.container}>
            <UserListView
                title={t('users.userList')}
                items={users}
                getItemLink={(user) => `/users/${user.user_id}`}
                renderItem={renderItem}
                getItemId={(user) => user.user_id}
            />
            {pagination && (
                <div className={styles.paginationContainer}>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={pagination.total_page}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export {UsersList};
