import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';
import { getTags } from '../../../actions/tag';
import { createBlog } from '../../../actions/blog';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = ({ router }) => {
  const getBlogDataFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(getBlogDataFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishBtn: false
  });

  const token = getCookie('token');
  const { error, sizeError, success, formData, title, hidePublishBtn } = values;

  // when the component mounts, formData is ready to use
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  // initialize categories state
  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  // initialize tags state
  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  // add or remove checked categories from state
  const handleCategoryToggleCheckbox = categoryId => () => {
    setValues({ ...values, error: '' });

    const allCheckedCategories = [...checkedCategories];

    // get the index of current checked category
    const checkedCategory = checkedCategories.indexOf(categoryId);

    // if the current checked category is not in the state, add it
    // else remove the category from the state
    if (checkedCategory === -1) {
      allCheckedCategories.push(categoryId);
    } else {
      allCheckedCategories.splice(checkedCategory, 1);
    }

    setCheckedCategories(allCheckedCategories);
    formData.set('categories', allCheckedCategories);

    console.log(allCheckedCategories);
  };

  // add or remove checked tags from state
  const handleTagToggleCheckbox = tagId => () => {
    setValues({ ...values, error: '' });

    const allCheckedTags = [...checkedTags];

    // get the index of current checked tag
    const checkedTag = checkedTags.indexOf(tagId);

    // if the current checked tag is not in the state, add it
    // else remove the tag from the state
    if (checkedTag === -1) {
      allCheckedTags.push(tagId);
    } else {
      allCheckedTags.splice(checkedTag, 1);
    }

    setCheckedTags(allCheckedTags);
    formData.set('tags', allCheckedTags);

    console.log(allCheckedTags);
  };

  const publishBlog = e => {
    e.preventDefault();
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled "${data.title}" is created`
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });

    console.log('FORM DATA:', formData);
    console.log(values);
  };

  // populate form data and update the state
  const handleChange = name => e => {
    console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    // console.log(e);
    // push the event into body
    setBody(e);

    // populate form data
    formData.set('body', e);

    // save to local storage to prevent data loss on page refresh
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  return (
    <>
      <div className='col-xl-8 mb-4 pb-2'>
        <form onSubmit={publishBlog}>
          <div className='form-group'>
            <label htmlFor='title'>Blog Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              placeholder='Enter title'
              onChange={handleChange('title')}
            />
          </div>
          <div className='form-group'>
            <ReactQuill
              modules={CreateBlog.modules}
              formats={CreateBlog.formats}
              value={body}
              placeholder='Write something amazing'
              onChange={handleBody}
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            PUBLISH
          </button>
        </form>
      </div>
      <div className='col-xl-4'>
        <div className='form-group pb-3'>
          <h5 className='mb-3'>Featured Image</h5>

          <label className='btn btn-outline-info'>
            Upload Image
            <input
              onChange={handleChange('photo')}
              type='file'
              accept='image/*'
              hidden
            />
          </label>
          <small className='text-muted ml-2'>Max Size: 1MB</small>
        </div>
        <div>
          <h5>Categories</h5>
          <ul
            className='list-unstyled'
            style={{ maxHeight: '120px', overflowY: 'scroll' }}
          >
            {categories &&
              categories.map(category => (
                <li key={category._id}>
                  <input
                    onChange={handleCategoryToggleCheckbox(category._id)}
                    type='checkbox'
                    className='mr-2'
                  />
                  <label className='form-check-label'>{category.name}</label>
                </li>
              ))}
          </ul>

          <hr />
          <h5>Tags</h5>
          <ul
            className='list-unstyled'
            style={{ maxHeight: '120px', overflowY: 'scroll' }}
          >
            {tags &&
              tags.map(tag => (
                <li key={tag._id}>
                  <input
                    onChange={handleTagToggleCheckbox(tag._id)}
                    type='checkbox'
                    className='mr-2'
                  />
                  <label className='form-check-label'>{tag.name}</label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(CreateBlog);
