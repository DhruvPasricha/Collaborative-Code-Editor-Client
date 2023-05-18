import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./CodeEditor.css";

const InputOutputContainer = ({ inputText, setInputText, outputText }) => {
    return (
        <div className="input-output-container">
            <textarea
                placeholder="Input"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                style={{
                    resize: "none",
                    outline: "none",
                    backgroundColor: "unset",
                    color: "unset",
                    border: "unset",
                    width: "100%",
                }}
            />
            <textarea
                placeholder="Output"
                value={outputText}
                style={{
                    resize: "none",
                    outline: "none",
                    backgroundColor: "unset",
                    color: "unset",
                    border: "unset",
                    width: "100%",
                }}
                readOnly
            />
        </div>
    );
};

const Console = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    return (
        <div className="console">
            {isExpanded && (
                <InputOutputContainer
                    inputText={inputText}
                    setInputText={setInputText}
                    outputText={outputText}
                />
            )}
            <div className="action-items">
                <Button
                    variant="text"
                    sx={{
                        backgroundColor: "transparent",
                        color: "unset",
                        "&:hover": {
                            backgroundColor: "unset",
                            border: "unset",
                        },
                        textTransform: "none",
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Console
                    {isExpanded ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#23964A",
                        "&:hover": {
                            backgroundColor: "#1E7E3C",
                        },
                        textTransform: "none",
                    }}
                >
                    Compile and Run
                    <PlayArrowIcon />
                </Button>
            </div>
        </div>
    );
};

export default Console;
