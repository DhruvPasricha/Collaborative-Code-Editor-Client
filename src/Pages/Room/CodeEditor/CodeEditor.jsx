import React, { useState } from "react";
import AceEditor from "react-ace";
import Console from "./Console/Console";
import "./CodeEditor.css";
import SelectDropDown from "../../../Components/SelectDropDown/SelectDropDown";
import { fontSizes, languages, themes } from "./Constants";
import { dashCaseToPascalCaseWithSpaces } from "../../../Util/StringConversions";

// themes
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

// languages
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-kotlin";

// snippets
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/kotlin";

// ext tools
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import Logo from "../../../Components/Logo/Logo";

const Header = ({
    fontSize,
    setFontSize,
    theme,
    setTheme,
    language,
    setLanguage,
}) => {
    return (
        <div className="code-editor-header">
            <Logo />
            <SelectDropDown
                value={language}
                setValue={setLanguage}
                label="Language"
                values={Object.keys(languages)}
                mappingFunction={(language) => languages[language].displayName}
            />
            <SelectDropDown
                value={theme}
                setValue={setTheme}
                label="Theme"
                values={themes}
                mappingFunction={dashCaseToPascalCaseWithSpaces}
            />
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
    const [theme, setTheme] = useState("github_dark");
    const [language, setLanguage] = useState("c_cpp");

    return (
        <div className="code-editor">
            <Header
                fontSize={fontSize}
                setFontSize={setFontSize}
                theme={theme}
                setTheme={setTheme}
                language={language}
                setLanguage={setLanguage}
            />
            <div className="ide">
                <AceEditor
                    mode={language}
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
                        useWorker: false,
                    }}
                    fontSize={fontSize}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    height="100%"
                    width="100%"
                />
                <Console language={language} body={value} />
            </div>
        </div>
    );
};

export default CodeEditor;
