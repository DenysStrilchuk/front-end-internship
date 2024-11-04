import React from "react";

import styles from './ItemList.module.css';

interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    title?: string;
    getItemId: (item: T) => number;
}

const ItemList = <T,>({items, renderItem, title, getItemId}: ItemListProps<T>) => {
    return (
        <div>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={getItemId(item)} className={styles.listItem}>
                        <span className={styles.itemText}>{renderItem(item)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export {ItemList};
