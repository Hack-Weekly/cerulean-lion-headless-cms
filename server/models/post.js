const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  username: String, // Add the username field to the schema
  
  comments: [commentSchema],
});


postSchema.statics.findByUsername = function (username) {
  return this.find({}).populate({
    path: 'user',
    match: { username: username },
    select: 'username',
  });
};


module.exports = mongoose.model('Post', postSchema);
