import React from "react";
import {useTranslation} from "react-i18next";

import styles from "./About.module.css";

const About = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {t('about.title')}
            </h1>
            <p className={styles.description}>
                {t('about.description')}
            </p>
        </div>
    );
};

export {About};
