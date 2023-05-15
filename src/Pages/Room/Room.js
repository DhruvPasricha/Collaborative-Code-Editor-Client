import React, { useState } from "react";
import { Grid } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import "./Room.css";

const Room = () => {
    const [value, setValue] = useState();

    const users = [
        "Samantha",
        "Alex",
        "Max",
        "Liam",
        "Ella",
        "Chloe",
        "Jackson",
        "Olivia",
        "Lucas",
        "Isabella",
    ];

    return (
        <div className="room-container">
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
                    }}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    height="100vh"
                    width="75vw"
                />
            </div>
            <div className="users-container">
                <h1
                    style={{
                        margin: "10px 0 30px 0",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    Joined Users
                </h1>
                <Grid container rowSpacing={4} columnSpacing={4}>
                    {users.map((user) => (
                        <Grid item xs={3}>
                            <UserAvatar name={user} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Room;
