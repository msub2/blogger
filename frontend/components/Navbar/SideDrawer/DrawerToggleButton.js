import styles from './DrawerToggleButton.module.scss';

const DrawerToggleButton = ({ isOpen, click }) => {
  return (
    <div
      onClick={click}
      className={isOpen ? styles['change toggle-button'] : styles['toggle-button']}
    >
      <div className='bar1'></div>
      <div className='bar2'></div>
      <div className='bar3'></div>
    </div>
  );
};

export default DrawerToggleButton;
