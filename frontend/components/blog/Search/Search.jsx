import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogSearch } from '../../../actions/blog';
import styles from './Search.module.scss';
console.log(styles);

const Search = () => {
  const [values, setValues] = useState({
    search: '',
    results: [],
    searched: false,
    message: '',
    error: null,
  });

  // *** IMPLEMENTNG SEARCH ****
  // 1# send data to backend to fetch results
  // 2# once the results are fetched, add them to state
  // 3# render results based on data stored in state

  const { search, results, message, searched, error } = values;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async function () {
    try {
      const response = await blogSearch({ search });

      setValues({
        ...values,
        results: response,
        searched: true,
      });

      if (response.length === 0) {
        setValues({
          ...values,
          message: 'No blogs found',
        });
      }
    } catch (error) {
      console.log(error);
      setValues({
        ...values,
        error: error,
      });
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
      message: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <input
        type='search'
        className={styles['search__input-bar']}
        placeholder='Search...'
        onChange={handleChange}
      />
      {results && (
        <ul className={styles['search__list-group']}>
          {results.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog._id}
              className={styles.search__link}
            >
              <a className={styles.search__link}>
                <li className={styles['search__list-group-item']} key={blog._id}>
                  {blog.title}
                </li>
              </a>
            </Link>
          ))}
          {message ? (
            <li className={`${styles['search__list-group-item']} ${styles['search__list-group-item__message']}`}>
              {message}
            </li>
          ) : null}
        </ul>
      )}
    </form>
  );
};

export default Search;
