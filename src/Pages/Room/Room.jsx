import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import CopyToClipBoard from "../../Components/CopyToClipBoard/CopyToClipBoard";
import { toast } from "react-hot-toast";
import CodeEditor from "./CodeEditor/CodeEditor";
import "./Room.css";
import { UserContext, socket } from "../../App";

const JoinedUsers = ({ users }) => {
    return (
        <div className="users-container">
            <h1 className="joined-users-header"> Joined Users </h1>
            <Grid container rowSpacing={4} columnSpacing={4}>
                {users &&
                    users.map((user, index) => (
                        <Grid item xs={3} key={index}>
                            <UserAvatar name={user} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

const RoomInfo = ({ roomId }) => {
    return (
        <div className="room-info-container">
            <div className="room-id-copy-container" style={{ width: "100%" }}>
                <span
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {roomId}
                </span>
                <CopyToClipBoard value={roomId} toastPosition="bottom-right" />
            </div>
        </div>
    );
};

const LeaveRoomButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#F44336",
                "&:hover": {
                    backgroundColor: "#D32F2F",
                },
                textTransform: "none",
            }}
            onClick={() => navigate("/")}
        >
            Leave Room
        </Button>
    );
};

const Room = () => {
    const { username: user } = useContext(UserContext);

    const params = useParams();
    const { roomId } = params;

    const [body, setBody] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const join = () => {
            socket.emit("join", { user, roomId });
        };

        const addSocketEventListeners = () => {
            socket.on("welcome", (msg) => {
                toast(msg, {
                    position: "top-right",
                    icon: "👋",
                });
            });
            socket.on("updated users", (updatedUsers) => {
                setUsers(Object.values(updatedUsers));
            });
            socket.on("someone joined", (msg) => {
                toast(msg, {
                    position: "top-right",
                    icon: "🥳",
                });
            });
            socket.on("someone left", (msg) => {
                toast(msg, {
                    position: "top-right",
                    icon: "🙁",
                });
            });
            socket.on("updated code", ({ updatedCode }) => {
                setBody(updatedCode);
            });
        };

        join();
        addSocketEventListeners();
        // eslint-disable-next-line
    }, []);

    const handleBodyChange = (newValue) => {
        setBody(newValue);
        socket.emit("code change", {
            value: newValue,
            roomId,
            user,
        });
    };

    return (
        <div className="room-container">
            <CodeEditor handleBodyChange={handleBodyChange} value={body} />
            <div className="right-side-container">
                <JoinedUsers users={users} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "2vh",
                    }}
                >
                    <RoomInfo roomId={roomId} />
                    <LeaveRoomButton />
                </div>
            </div>
        </div>
    );
};

export default Room;
