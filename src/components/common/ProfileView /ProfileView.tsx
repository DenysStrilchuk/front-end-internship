import React from "react";
import {useParams} from "react-router-dom";
import {Container, Typography} from "@mui/material";

interface ProfileViewProps<T> {
    data: T[];
    idKey: keyof T;
    renderDetails: (item: T) => React.ReactNode;
}

const ProfileView = <T, >({data, idKey, renderDetails}: ProfileViewProps<T>) => {
    const {id} = useParams<{ id: string }>();
    const item = data.find((item) => item[idKey] === Number(id));

    if (!item) {
        return <Typography variant="h6" color="error">Item not found</Typography>;
    }

    return (
        <Container>
            {renderDetails(item)}
        </Container>
    );
};

export {ProfileView};
