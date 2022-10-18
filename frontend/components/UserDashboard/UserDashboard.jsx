import Link from 'next/link';
import styles from './UserDashboard.module.scss';

const UserDashboard = () => {
  return (
    <section className={styles['user-dashboard']}>
      <div className={styles['user-dashboard__banner']}>
        <h4 className={styles['user-dashboard__title']}>User Dashboard</h4>
      </div>
      <ul className={styles['user-dashboard__list-group']}>
        <li className={styles['user-dashboard__list-group-item']}>
          <img
            className={styles['user-dashboard__list-group-item__icon']}
            src='images/dashboard-icons/blog.svg'
            alt=''
          />
          <Link href='/user/crud/blog'>
            <a>Create Blog</a>
          </Link>
        </li>

        <li className={styles['user-dashboard__list-group-item']}>
          <img
            className={styles['user-dashboard__list-group-item__icon']}
            src='images/dashboard-icons/update.svg'
            alt=''
          />
          <Link href='/user/crud/blogs'>
            <a>Update / Delete Blogs</a>
          </Link>
        </li>

        <li className={styles['user-dashboard__list-group-item']}>
          <img
            className={styles['user-dashboard__list-group-item__icon']}
            src='images/dashboard-icons/edit.svg'
            alt=''
          />
          <Link href='/user/update'>
            <a>Update Profile</a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default UserDashboard;
