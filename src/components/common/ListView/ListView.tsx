import {Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

import styles from "./ListView.module.css";
import {ItemList} from "../ItemList";

interface ListViewProps<T> {
    title: string;
    items: T[];
    getItemLink: (item: T) => string;
    renderItemName: (item: T) => string;
}

const ListView = <T, >({title, items, getItemLink, renderItemName}: ListViewProps<T>) => {
    const navigate = useNavigate();

    const handleItemClick = (item: T) => {
        navigate(getItemLink(item));
    };

    const renderListItem = (item: T) => (
        <span onClick={() => handleItemClick(item)} className={styles.itemLink}>
            {renderItemName(item)}
        </span>
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            <ItemList items={items} renderItem={renderListItem}/>
        </Container>
    );
};

export {ListView};
