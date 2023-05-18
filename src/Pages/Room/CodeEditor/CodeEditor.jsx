import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";
import Console from "./Console/Console";
import "./CodeEditor.css";
import SelectDropDown from "../../../Components/SelectDropDown/SelectDropDown";
import { fontSizes, themes } from "./Constants";
import { dashCaseToPascalCaseWithSpaces } from "../../../Util/StringConversions";

const Header = ({ fontSize, setFontSize, theme, setTheme }) => {
    return (
        <div className="code-editor-header">
            <SelectDropDown
                value={fontSize}
                setValue={setFontSize}
                label="Font Size"
                values={fontSizes}
            />
            <SelectDropDown
                value={theme}
                setValue={setTheme}
                label="Theme"
                values={themes}
                mappingFunction={dashCaseToPascalCaseWithSpaces}
            />
        </div>
    );
};

const CodeEditor = ({ handleBodyChange, value }) => {
    const [fontSize, setFontSize] = useState(16);
    const [theme, setTheme] = useState("github_dark");

    return (
        <div className="code-editor">
            <Header
                fontSize={fontSize}
                setFontSize={setFontSize}
                theme={theme}
                setTheme={setTheme}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "85vh",
                }}
            >
                <AceEditor
                    mode="c_cpp"
                    theme={theme}
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
