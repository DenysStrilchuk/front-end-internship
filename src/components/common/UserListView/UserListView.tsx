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
            <ItemList
                items={items}
                title={title}
                renderItem={(item) => (
                    <div onClick={() => handleItemClick(item)} className={styles.itemLink}>
                        {renderItem(item)}
                    </div>
                )}
                getItemId={getItemId}
            />
        </div>
    );
};

export {UserListView};
