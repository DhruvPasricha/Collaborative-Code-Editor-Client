import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Grid } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import CopyToClipBoard from "../../Components/CopyToClipBoard/CopyToClipBoard";
import { toast } from "react-hot-toast";
import "./Room.css";

const Room = (props) => {
    const [value, setValue] = useState();
    const { roomId, user } = props;
    const [users, setUsers] = useState();

    useEffect(() => {
        if (!user) {
            return;
        }
        const socket = io("http://localhost:4500/");
        socket.emit("join", { user, roomId });
        socket.on("updated users", (updatedUsers) => {
            setUsers(Object.values(updatedUsers));
        });
        socket.on("someone has joined", (msg) => {
            toast(msg);
        });
    }, [user, roomId]);

    const JoinedUsers = () => {
        return (
            <div className="users-container">
                <Grid container rowSpacing={4} columnSpacing={4}>
                    {users &&
                        users.map((user) => (
                            <Grid item xs={3}>
                                <UserAvatar name={user} />
                            </Grid>
                        ))}
                </Grid>
            </div>
        );
    };

    const CodeEditor = () => {
        return (
            <div className="code-editor">
                <AceEditor
                    mode="c_cpp"
                    theme="dracula"
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    value={value}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                        highlightActiveLine: false,
                        hScrollBarAlwaysVisible: false,
                    }}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    height="100vh"
                    width="100%"
                />
            </div>
        );
    };

    const RoomInfo = () => {
        return (
            <div className="room-info-container">
                <div
                    className="room-id-copy-container"
                    style={{ width: "100%" }}
                >
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {roomId}
                    </span>
                    <CopyToClipBoard
                        value={roomId}
                        toastPosition="bottom-right"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="room-container">
            {CodeEditor()}
            <div className="right-side-container">
                <div>
                    <h1
                        style={{
                            margin: "10px 0 30px 0",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        Joined Users
                    </h1>
                    {JoinedUsers()}
                </div>
                {RoomInfo()}
            </div>
        </div>
    );
};

export default Room;
