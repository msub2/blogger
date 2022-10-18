import BlogCard from '../blog/BlogCard/BlogCard';

import styles from './BlogCategory.module.scss';

const BlogCategory = ({ category, blogs }) => {
  return (
    <section className={styles['blog-category']}>
      <img
        className={styles['blog-category__banner-img']}
        src={`../images/categories/${category.name.toLowerCase()}.jpg`}
        alt='category banner'
      />
      <div className={styles['blog-category__wrapper']}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogCategory;
