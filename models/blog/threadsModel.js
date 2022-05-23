const { Schema, model } = require('mongoose');

const threadSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    markdown: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    }
});

const threadModel = model('threadDb', threadSchema);

module.exports = threadModel;