import User from '../models/user-model.js';
import Blog from '../models/blog-model.js';
import _ from 'lodash';
import formidable from 'formidable';
import fs from 'fs';
import { errorHandler } from '../helpers/dbErrorHandler.js';

const read = (req, res) => {
  // set user hashed password to undefined and return its profile
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

const publicProfile = (req, res) => {
  let { username } = req.params;
  let user;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    user = userFromDB;

    Blog.find({ postedBy: user._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .limit(10)
      .select(
        '_id title slug excerpt categories tags postedBy createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        user.photo = undefined;
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
          user,
          blogs: data
        });
      });
  });
};

const updateProfile = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded'
      });
    }
    let user = req.profile;
    // any changed fields will be merged into user
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: 'Password should be minimum 6 characters long'
      });
    }

    // if there is any photo
    if (files.photo) {
      // prevent user from uploading photos bigger than 1MB
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less than 1MB'
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      res.json(user);
    });
  });
};

const uploadProfilePhoto = (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    if (user.photo.data) {
      res.set('Content-Type', user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};

export { read, publicProfile, updateProfile, uploadProfilePhoto }