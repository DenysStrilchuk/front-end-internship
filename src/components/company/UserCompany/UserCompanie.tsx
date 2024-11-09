import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {fetchCompanyById} from '../../../store/slices/companySlice';
import {Loader} from '../../common/LoaderContainer';

const UserCompany: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {companyDetail, loading, error} = useAppSelector((state) => state.companies);

    useEffect(() => {
        if (id) {
            dispatch(fetchCompanyById(Number(id)));
        }
    }, [dispatch, id]);

    return (
        <div>
            {loading && <Loader/>}
            {error && <div>Error: {error}</div>}
            {companyDetail ? (
                <div>
                    <h1>{companyDetail.company_name}</h1>
                    <p>{companyDetail.company_description}</p>
                </div>
            ) : (
                !loading && <p>Company not found.</p>
            )}
        </div>
    );
};

export {UserCompany};
