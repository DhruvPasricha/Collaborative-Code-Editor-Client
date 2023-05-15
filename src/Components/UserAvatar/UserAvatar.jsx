import React from "react";
import { Avatar } from "@mui/material";

const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 10) - hash);
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
        children:
            name.split(" ").length > 1
                ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
                : name[0],
    };
};

const UserAvatar = (props) => {
    const { name } = props;
    return <Avatar {...stringAvatar(name)} />;
};

export default UserAvatar;
