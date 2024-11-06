import React from "react";
import {useTranslation} from "react-i18next";

import styles from "./Home.module.css";

const Home = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>
                {t('welcome')}
            </h4>
            <p className={styles.description}>
                {t('home_description')}
            </p>
        </div>
    );
};

export {Home}