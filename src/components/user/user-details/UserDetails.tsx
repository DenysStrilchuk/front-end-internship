import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUserById } from "../../../store/slices";
import { UserDetailsView } from "../../common/UserDetailsView";
import styles from "./UserDetails.module.css";
import {Loader} from "../../common/LoaderContainer";

const UserDetails = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const user = useAppSelector((state) => state.users.userDetail);
    const loading = useAppSelector((state) => state.users.loading);
    const error = useAppSelector((state) => state.users.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id]);

    return (
        <div>
            {loading && <Loader />}
            {!loading && error && (
                <p className={styles.errorText}>
                    {t("user.error")}
                </p>
            )}
            {!loading && !user && !error && (
                <p className={styles.errorText}>
                    {t("user.notFound")}
                </p>
            )}
            {!loading && user && (
                <UserDetailsView
                    data={[user]}
                    idKey="user_id"
                    renderDetails={(user) => (
                        <div>
                            <h5 className={styles.title}>{t("user.details")}</h5>
                            {user.user_avatar && (
                                <img
                                    src={user.user_avatar}
                                    alt={`${user.user_firstname} ${user.user_lastname}`}
                                    className={styles.avatar}
                                />
                            )}
                            <p className={styles.infoText}>{t("user.name")}: {user.user_firstname}</p>
                            <p className={styles.infoText}>{t("user.lastName")}: {user.user_lastname}</p>
                            <p className={styles.infoText}>{t("user.email")}: {user.user_email}</p>
                            <p className={styles.infoText}>{t("user.city")}: {user.user_city}</p>
                            <p className={styles.infoText}>{t("user.phone")}: {user.user_phone}</p>
                        </div>
                    )}
                />
            )}
        </div>
    );
};

export { UserDetails };
