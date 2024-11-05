import React from "react";
import {useNavigate} from "react-router-dom";

import {ItemList} from "../ItemList";
import {IUser} from "../../../models/IUser";
import styles from "./UserListView.module.css";

interface ListViewProps {
    title: string;
    items: IUser[];
    getItemLink: (item: IUser) => string;
    renderItem: (item: IUser) => React.ReactNode;
    getItemId: (item: IUser) => number;
}

const UserListView: React.FC<ListViewProps> = ({title, items, getItemLink, renderItem, getItemId}) => {
    const navigate = useNavigate();

    const handleItemClick = (item: IUser) => {
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
