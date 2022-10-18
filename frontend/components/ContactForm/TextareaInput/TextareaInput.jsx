import React from 'react';
import styles from './TextareaInput.module.scss';

const TextareaInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className={styles['form-group']}>
      <textarea
        className={styles['form-group__textarea']}
        onChange={handleChange}
        {...otherProps}
      ></textarea>
      {label ? (
        <label
          className={`${
            otherProps.value.length ? styles.shrink : ''
          } ${styles['form-group__textarea-label']}`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default TextareaInput;
