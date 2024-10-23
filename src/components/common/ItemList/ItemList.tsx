import React from "react";
import {List, ListItem, Typography} from "@mui/material";

interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    title?: string;
}

const ItemList = <T, >({items, renderItem, title}: ItemListProps<T>) => {
    return (
        <div>
            {title && (
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
            )}
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>
                        <Typography variant="body1">{renderItem(item)}</Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export {ItemList};
