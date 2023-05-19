import React from "react";
import { Avatar, Tooltip } from "@mui/material";

const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 7) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

const stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name[0],
    };
};

const UserAvatar = (props) => {
    const { name } = props;
    return (
        <Tooltip title={name} arrow>
            <Avatar {...stringAvatar(name.toUpperCase())} />
        </Tooltip>
    );
};

export default UserAvatar;
