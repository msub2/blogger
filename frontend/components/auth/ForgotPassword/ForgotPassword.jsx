import FormInput from '../../FormInput/FormInput';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = (props) => {
  const {
    showSuccessMessage,
    showErrorMessage,
    handleSubmit,
    handleInputChange,
    email,
  } = props;

  return (
    <div className={styles['forgot-password']}>
      <div className={styles['forgot-password__wrapper']}>
        <h2 className={styles['forgot-password__title']}>Forgot Password</h2>
        <p className={styles['forgot-password__text']}>
          Please enter your email address to request a pasword reset.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleInputChange('email')}
            type='email'
            label='Email'
            value={email}
          />
          <button type='submit' className={styles['forgot-password__btn']}>
            Request Password Reset
          </button>
        </form>

        <div className={styles['forgot-password__messages']}>
          {showSuccessMessage()}
          {showErrorMessage()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
