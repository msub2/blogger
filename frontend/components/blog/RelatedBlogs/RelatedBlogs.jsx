import RelatedBlogCard from '../RelatedBlogCard/RelatedBlogCard';
import styles from './RelatedBlogs.module.scss';

const RelatedBlogs = ({ relatedBlogs }) => {
  return (
    <>
      {relatedBlogs.length > 0 && (
        <section className={styles['related-blogs']}>
          <h4 className={styles['related-blogs__title']}>Related Blogs</h4>

          <div className={styles['related-blogs__wrapper']}>
            {relatedBlogs.map((blog) => (
              <RelatedBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedBlogs;
