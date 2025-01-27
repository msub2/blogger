import Link from 'next/link';
import moment from 'moment';
import styles from './ReadBlogCard.module.scss';

const ReadBlogCard = ({ isAuth, blog, toggleModal }) => {
  return (
    <div className={styles['read-blog-card']} key={blog._id}>
      <div className={styles['read-blog-card__card-body']}>
        <h5 className={styles['read-blog-card__blog-title']}>{blog.title}</h5>
        <p className={styles['read-blog-card__posted-by']}>
          Posted by <span>{blog.postedBy.name}</span>
        </p>
        <p className={styles['read-blog-card__published-on']}>
          Published on {moment(blog.updatedAt).fromNow()}
        </p>

        <div className={styles['read-blog-card__buttons']}>
          {isAuth() && isAuth().role === 1 ? (
            <Link href={`/admin/crud/${blog.slug}`}>
              <a className={styles['read-blog-card__update-btn']}>Update</a>
            </Link>
          ) : (
            <Link href={`/user/crud/${blog.slug}`}>
              <a className={styles['read-blog-card__update-btn']}>Update</a>
            </Link>
          )}
          <button
            onClick={() => toggleModal(blog.slug)}
            className={styles['read-blog-card__delete-btn']}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBlogCard;
