import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';

import styles from './Blog.module.scss';

const Blog = ({ blog, categories }) => {
  return (
    <article className={styles.blog}>
      {}
      <figure>
        <img
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
          className={styles['blog__banner-img']}
        />
      </figure>

      <div className={styles.blog__wrapper}>
        <div className={styles.blog__content}>
          <section>
            <h1 className={styles.blog__title}>{blog.title}</h1>
            <p className={styles['blog__written-by']}>
              Written by{' '}
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>
                  <span>{blog.postedBy.name}</span>
                </a>
              </Link>{' '}
              | Published {moment(blog.updatedAt).fromNow()}
            </p>
          </section>
          <section className={styles['blog__categories-tags']}>
            {blog.categories.map((category) => (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <a className={styles.blog__category}>{category.name}</a>
              </Link>
            ))}

            {blog.tags.map((tag) => (
              <Link key={tag._id} href={`/tags/${tag.slug}`}>
                <a className={styles.blog__tag}>{tag.name}</a>
              </Link>
            ))}
            <br />
          </section>
          <section>
            <div className={styles.blog__text}>{renderHTML(blog.body)}</div>
          </section>
        </div>
        <div className={styles.blog__sidebar}>
          <div className={styles['blog__sidebar-categories']}>
            {categories.map((category) => (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <a className={styles['blog__sidebar-category']}>{category.name}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;
