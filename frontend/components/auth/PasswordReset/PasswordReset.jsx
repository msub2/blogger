import FormInput from '../../FormInput/FormInput';
import styles from './PasswordReset.module.scss';

const PasswordReset = ({
  newPassword,
  showSuccessMessage,
  showErrorMessage,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <section className={styles['password-reset']}>
      <div className={styles['password-reset__wrapper']}>
        <h2 className={styles['password-reset__title']}>Reset Password</h2>
        <p className={styles['password-reset__text']}>Please enter your new password.</p>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleInputChange('newPassword')}
            type='password'
            label='New Password'
            value={newPassword}
          />
          <button type='submit' className={styles['password-reset__reset-btn']}>
            Reset Password
          </button>
        </form>

        <div className={styles['password-reset__messages']}>
          {showSuccessMessage()}
          {showErrorMessage()}
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
