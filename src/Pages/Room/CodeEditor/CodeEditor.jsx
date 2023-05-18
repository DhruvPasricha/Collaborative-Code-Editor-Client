import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";
import Console from "./Console/Console";
import "./CodeEditor.css";
import SelectDropDown from "../../../Components/SelectDropDown/SelectDropDown";
import { fontSizes } from "./Constants";

const Header = ({ fontSize, setFontSize }) => {
    return (
        <div className="code-editor-header">
            <SelectDropDown
                value={fontSize}
                setValue={setFontSize}
                label="Font Size"
                values={fontSizes}
            />
        </div>
    );
};

const CodeEditor = ({ handleBodyChange, value }) => {
    const [fontSize, setFontSize] = useState(16);

    return (
        <div className="code-editor">
            <Header fontSize={fontSize} setFontSize={setFontSize} />
            <div style={ {display: "flex", flexDirection: "column", height: "85vh"}}>
                <AceEditor
                    mode="c_cpp"
                    theme="dracula"
                    onLoad={(editor) => {
                        editor.focus();
                    }}
                    onChange={(newValue) => handleBodyChange(newValue)}
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
                    fontSize={fontSize}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    height="100%"
                    width="100%"
                />
                <Console />
            </div>
        </div>
    );
};

export default CodeEditor;
