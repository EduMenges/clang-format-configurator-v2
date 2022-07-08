import React from 'react';
import styles from './Header.module.css'

const Header = ({ autoFormat, onAutoFormatChange, onUpdate }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title_text}>clang-format configurator v2</h2>
      <span>
        <input className={styles.checkbox} type={"checkbox"}
          id={"autoupdate"} defaultChecked={autoFormat}
          onChange={(event) => onAutoFormatChange(event.currentTarget.checked)}
        />
        <label>Autoformat on changes</label>
        <button onClick={onUpdate}>
          Format
        </button>
        <button >
          Download
        </button>
        <button >
          Upload
        </button>
        <button

          onClick={() => window.open("https://github.com/Wirena/clang-format-configurator-v2",
            '_blank').focus()}
        >Contribute</button>
      </span>
    </header>
  )
}

export default Header;