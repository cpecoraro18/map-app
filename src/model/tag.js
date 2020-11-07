/**
* Tag Model
* @module Tag
*/

const tags = [{
  id: 0,
  userId: 0,
  pinId: 0,
  name: "MyFirstTag"
}];

/**
* A Tag
* @typedef {Object} Tag
* @class Tag
* @property {string} name - Tag name
*/
const Tag = function(body) {
  this.name = body.name;
};

/**
  * Gets all user tags from database
  * @param {number} userId ID of user getting the tags
  * @param {function} result function that takes and error and a list of tags
  */
Tag.getUserTags = function(userId, result) {
  result(null, tags.filter((t) => t.userId === userId));
};

/**
  * Gets all user tags from database
  * @param {number} userId ID of user getting the tags
  * @param {function} result function that takes and error and a list of tags
  */
Tag.getPinTags = function(pinId, result) {
  result(null, tags.filter((t) => t.pinId === pinId));
};

/**
  * Gets all tags from database
  *@param {function} result function that takes and error and a list of tags
  */
Tag.getTags = function(result) {
  result(null, tags);
};
/**
  * Gets a single tag by its id
  * @param {number} id ID of the tag
  * @param {function} result function that takes and error and a tag
  */
Tag.getTagById = function(id, result) {
  result(null, tags.find((t) => (t.userId === userId && t.id === id)));
};

/**
  * Creates a new tag
  * @param {Object} newTag The tag information that is being added
  * @param {Object} user The user who posted the tag
  * @param {function} result function that takes and error and a tag
  */
Tag.createTag = function(newTag, user, result) {
  const createdTag = {
    id: pins.length,
    userId: user.id,
    name: newTag.name
  };
  tags.push(createdTag);
  result(null, createTag);
};
/**
  * Deletes a pin
  * @param {number} id ID of the pin
  * @param {function} result function that takes and error
  */
Tag.deleteTag = function(id, result) {
  tags = tags.filter((t) => t.id != id);
  result(null);
};

module.exports = Tag;
