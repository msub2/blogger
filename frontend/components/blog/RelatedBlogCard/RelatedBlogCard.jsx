import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';
import styles from './RelatedBlogCard.module.scss';

const RelatedBlogCard = ({ blog }) => {
  return (
    <div className={styles['related-blog-card']}>
      <Link href={`/blogs/${blog.slug}`}>
        <a>
          <img
            className={styles['related-blog-card__img']}
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />{' '}
        </a>
      </Link>
      <div className={styles['related-blog-card__wrapper']}>
        <Link href={`/blogs/${blog.slug}`}>
          <a className={styles['related-blog-card__title']}>{blog.title}</a>
        </Link>
        <p className={styles['related-blog-card__posted-by']}>
          Posted by{' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>
              <span>{blog.postedBy.name}</span>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedBlogCard;
