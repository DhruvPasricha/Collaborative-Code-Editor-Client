import React, { useState } from "react";
import { Resizable } from "re-resizable";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "../CodeEditor.css";

const CustomTextArea = ({ heading, textAreaProps }) => {
    return (
        <div className="custom-textarea">
            <span
                style={{
                    border: "1px 0 0 0 solid #0f1722",
                    boxShadow:
                        "0 0 3px rgba(14, 2, 2, 0.3), inset 0 0 3px rgba(0, 0, 0, 0.3)",
                    padding: "20px"
                }}
            >
                {heading}
            </span>
            <textarea {...textAreaProps} />
        </div>
    );
};

const InputOutputContainer = ({ inputText, setInputText, outputText }) => {
    return (
        <Resizable
            className="input-output-container"
            defaultSize={{ height: "30vh" }}
        >
            <CustomTextArea
                heading="Input"
                textAreaProps={{
                    value: inputText,
                    onChange: (event) => setInputText(event.target.value),
                }}
            />
            <CustomTextArea
                heading="Output"
                textAreaProps={{
                    value: outputText,
                    readOnly: true,
                }}
            />
        </Resizable>
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
                        <KeyboardArrowDownIcon />
                        ) : (
                        <KeyboardArrowUpIcon />
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
