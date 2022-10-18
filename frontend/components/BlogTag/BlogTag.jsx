import BlogCard from '../blog/BlogCard/BlogCard';

import styles from './BlogTag.module.scss';

const BlogTag = ({ tag, blogs }) => {
  return (
    <section className={styles['blog-tag']}>
      <img
        className={styles['blog-tag__banner-img']}
        src={`../images/tags/${tag.name.toLowerCase()}.jpg`}
        alt='tag banner'
      />
      <div className={styles['blog-tag__wrapper']}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogTag;
