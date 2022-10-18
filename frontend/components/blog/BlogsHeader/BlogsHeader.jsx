import Link from 'next/link';
import styles from './BlogsHeader.module.scss';

const BlogsHeader = ({ categories, tags }) => {
  return (
    <section className={styles['blogs-header']}>
      <h1 className={styles['blogs-header__title']}>Programming blogs and tutorials</h1>

      <div className={styles['blogs-header__categories-tags']}>
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category.slug}`}>
            <a className={styles['blogs-header__category']}>
              <img
                className={styles['blogs-header__category-icon']}
                src='images/category.svg'
                alt='category icon'
              />
              {category.name}
            </a>
          </Link>
        ))}

        {tags.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug}`}>
            <a className={styles['blogs-header__tag']}>
              <img
                className={styles['blogs-header__tag-icon']}
                src='images/tag.svg'
                alt='tag icon'
              />
              {tag.name}
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogsHeader;
