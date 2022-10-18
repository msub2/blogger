import moment from 'moment';
import Link from 'next/link';
import { API } from '../../config';

import styles from './Profile.module.scss';

const Profile = ({ user, blogs }) => {
  return (
    <section className={styles.profile}>
      <div className={styles.profile__header}>
        <figure>
          <img
            className={styles.profile__img}
            src={`${API}/user/photo/${user.username}`}
            alt='user profile'
          />
        </figure>
        <div className={styles['profile__header__user-info']}>
          <h5 className={styles.profile__username}>{user.name}</h5>
          <p className={styles.profile__joined}>
            Joined {moment(user.createdAt).fromNow()}
          </p>

          <ul className={styles.profile__contact}>
            <li>
              <a
                className={styles['profile__contact--link']}
                href='https://www.facebook.com/'
              >
                <img
                  className={styles.profile__contact__icon}
                  src='../images/social-icons/facebook.svg'
                  alt=''
                />{' '}
              </a>
            </li>
            <li>
              <a
                className={styles['profile__contact--link']}
                href='https://www.twitter.com/'
              >
                <img
                  className={styles.profile__contact__icon}
                  src='../images/social-icons/twitter.svg'
                  alt=''
                />
              </a>
            </li>
            <li>
              <a
                className={styles['profile__contact--link']}
                href='https://www.linkedin.com/'
              >
                <img
                  className={styles.profile__contact__icon}
                  src='../images/social-icons/linkedin.svg'
                  alt=''
                />
              </a>
            </li>
            <li>
              <a
                className={styles['profile__contact--link']}
                href={`mailto:${user.email}`}
              >
                <img
                  className={styles.profile__contact__icon}
                  src='../images/social-icons/email.svg'
                  alt=''
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['profile__user-blogs']}>
        <h2 className={styles['profile__blogs-by']}>
          Latest blogs by{' '}
          <span className={styles['profile__blogs-by__name']}>{user.name}</span>
        </h2>

        {blogs.map((blog) => (
          <div className={styles['profile__blog-card']} key={blog._id}>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h4 className={styles['profile__blog-card__title']}>{blog.title}</h4>
              </a>
            </Link>

            <p className={styles['profile__blog-card__posted']}>
              Posted &middot;
              <span className={styles['profile__blog-card__posted-date']}>
                {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
