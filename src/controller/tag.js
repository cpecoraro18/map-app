/**
* Tag Controler
* @module Tag Controller
*/

const Tag = require('../model/tag');

/**
* gets user id from request and responds with an array of user tags
* @param {Object} req client request
* @param {Object} res server response
*/
exports.get_user_tags = function(req, res) {
  const userId = req.user.id;

  Tag.getUserTags(userId, (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};
/**
* responds with a list of tags from feed
* @param {Object} req client request
* @param {Object} res server response
*/
exports.get_tags = function(req, res) {
  Tag.getTags((err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};
/**
* responds with a list of tags from feed
* @param {Object} req client request
* @param {Object} res server response
*/
exports.get_pin_tags = function(req, res) {
  let pinId = req.body.pinId;
  Tag.getPinTags(pinId, (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};
/**
* gets user and new pin from request and
* responds with a json object of the new post
* @param {Object} req client request
* @param {Object} res server response
*/
exports.post_tag = function(req, res) {
  const user = req.user;
  const newTag = new Tag(req.body);
  Tag.createTag(newTag, user, (err, tag) => {
    if (err) throw err;
    res.status(201).json(tag);
  });
};
/**
* deletes a tag based on an id received by the request
* responds with 201 if successfull
* @param {Object} req client request
* @param {Object} res server response
*/
exports.delete_tag = function(req, res) {
  const tagId = req.tagId;
  Tag.deleteTag(tagId, (err) => {
    if (err) throw err;
    res.status(201);
  });
};
