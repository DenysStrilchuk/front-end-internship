import React from "react";
import {useNavigate} from "react-router-dom";

import styles from "./UserListView.module.css";
import {ItemList} from "../ItemList";

interface ListViewProps<T> {
    title: string;
    items: T[];
    getItemLink: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
    getItemId: (item: T) => number;
}

const UserListView = <T, >({title, items, getItemLink, renderItem, getItemId}: ListViewProps<T>) => {
    const navigate = useNavigate();

    const handleItemClick = (item: T) => {
        navigate(getItemLink(item));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <ItemList
                items={items}
                renderItem={(item) => (
                    <li onClick={() => handleItemClick(item)} className={styles.itemLink}>
                        {renderItem(item)}
                    </li>
                )}
                getItemId={getItemId}
            />
        </div>
    );
};

export {UserListView};
