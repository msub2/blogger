import BlogCard from '../BlogCard/BlogCard';
import styles from './Blogs.module.scss';

const Blogs = ({ blogs, loadedBlogs }) => {
  return (
    <section className={styles.blogs}>
      {blogs && blogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
      {loadedBlogs &&
        loadedBlogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
    </section>
  );
};

export default Blogs;
