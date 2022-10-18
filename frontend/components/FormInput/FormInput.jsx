import styles from './FormInput.module.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className={styles['form-group']}>
    <input
      className={styles['form-group__input']}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? styles.shrink : ''
        } ${styles['form-group__input-label']}`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
