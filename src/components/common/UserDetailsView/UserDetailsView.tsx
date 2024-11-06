import React from "react";
import { useParams } from "react-router-dom";

import styles from "./UserDetailsView.module.css";

interface ProfileViewProps<T> {
    data: T[];
    idKey: keyof T;
    renderDetails: (item: T) => React.ReactNode;
}

const UserDetailsView = <T,>({ data, idKey, renderDetails }: ProfileViewProps<T>) => {
    const { id } = useParams<{ id: string }>();
    const item = data.find((item) => item[idKey] === Number(id));

    if (!item) {
        return <h6 className={styles.errorText}>Item not found</h6>;
    }

    return (
        <div className={styles.container}>
            {renderDetails(item)}
        </div>
    );
};

export { UserDetailsView }
