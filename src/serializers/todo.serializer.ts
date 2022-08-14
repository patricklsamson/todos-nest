var JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const TodoSerializer = new JSONAPISerializer('todos', {
  attributes: ['body', 'done', 'tags'],
  tags: {
    ref: 'id',
    attributes: ['name']
  }
});
