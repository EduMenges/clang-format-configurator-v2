import React from "react";
import AceEditor from "react-ace";
import { saveAs } from 'file-saver';
import styles from "./ConfigUiPage.module.css"
import "./ace.css"
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/snippets/yaml";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify"
import "ace-builds/src-min-noconflict/ext-searchbox";
import { buildYamlConfigFile, loadOptionsFromString } from "../Yaml&ConfigStuff"
import config from "../config.json";


const ConfigUiPage = ({ options, modifiedOptionTitles, unmodifiedOptions, onLoaded, onError, onClose, darkTheme }) => {

    const [optionsText, setOptionsText] = React.useState(buildYamlConfigFile(options, modifiedOptionTitles.current, unmodifiedOptions.current))
    const downloadConfigFile = React.useCallback(() => {
        const blob = new Blob([optionsText], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, ".clang-format")
    }, [optionsText])

    const onUploadFileToStr = React.useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setOptionsText(e.target.result)
            }
            reader.readAsText(e.target.files[0])
        }
        input.click()
    }, [setOptionsText])

    const loadConfigTxtToOptions = React.useCallback((optionsStr) => {
        try {
            loadOptionsFromString(optionsStr, config, options.selectedVersion, onLoaded)
        } catch (err) {
            onError(err.message)
        }
    }, [onError, onLoaded, options.selectedVersion])

    return (
        <div className={styles.config_ui_page}>
            <div className={styles.top_panel}>
                <h1 className={styles.page_title_text}>
                    Edit your .clang-format config file in place or use Upload and Download buttons to open File Explorer
                </h1>
            </div>
            <div className={styles.middle_panel}>
                <div className={styles.editor_container}>
                    <AceEditor
                        value={optionsText}
                        onChange={setOptionsText}
                        width={"100%"}
                        height={"100%"}
                        mode={"yaml"}
                        fontSize={14}
                        showPrintMargin={false}
                        theme={darkTheme ? "clouds_midnight" : "textmate"}
                        setOptions={{
                            useWorker: false,
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                        }}
                    />
                </div>
            </div>
            <div className={styles.bottom_panel}>
                <span className={styles.bottom_file_buttons}>
                    <button onClick={onUploadFileToStr}>
                        Upload file
                    </button>
                    <button
                        onClick={downloadConfigFile}>
                        Download file
                    </button>
                </span>
                <span className={styles.bottom_control_buttons}>
                    <button onClick={onClose}>
                        Close
                    </button>
                    <button onClick={() => { loadConfigTxtToOptions(optionsText) }}>
                        Load Config
                    </button>
                </span>

            </div>
        </div>

    )

};

export default ConfigUiPage;