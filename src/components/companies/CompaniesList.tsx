import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Avatar} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

import {ICompany} from "../../models/ICompany";
import {Routes} from "../../utils/routes";
import {CompaniesListView} from "../common/CompaniesListView";
import {fetchAllCompanies} from "../../store/slices/companySlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Loader} from "../common/LoaderContainer";
import {Pagination} from "../common/Pagination";
import styles from './CompaniesList.module.css';

const CompaniesList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {companies, pagination, loading, error} = useAppSelector((state) => state.companies);
    const searchParams = new URLSearchParams(location.search);
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const pageSize = 10;


    useEffect(() => {
        dispatch(fetchAllCompanies({page: currentPage, pageSize}));
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`, {replace: true});
    };

    const renderItem = (company: ICompany) => (
        <div className={styles.companyItem}>
            <Avatar
                src={company.company_avatar}
                alt={`${company.company_name}`}
                className={styles.avatar}
            />
            <span className={styles.companyName}>
                {`${company.company_name}`}
            </span>
        </div>
    );

    return (
        <div className={styles.container}>
            {loading && <Loader/>}
            {!loading && error && (
                <p className={styles.errorText}>
                    {t("companies.error", {error})}
                </p>
            )}
            {!loading && !error && companies.length === 0 && (
                <p className={styles.emptyText}>
                    {t("companies.noCompaniesFound")}
                </p>
            )}
            {!loading && !error && companies.length > 0 && (
                <span>
                    <CompaniesListView
                        title={t('companies.list')}
                        items={companies}
                        getItemLink={(company: ICompany) => `${Routes.COMPANIES}/${company.company_id}`}
                        renderItem={renderItem}
                        getItemId={(company) => company.company_id}
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
                </span>
            )}
        </div>
    );
};

export {CompaniesList};
