var JSONAPISerializer = require('jsonapi-serializer').Serializer;

export const TagSerializer = new JSONAPISerializer('tags', {
  attributes: ['name', 'todoId', 'todo'],
  todo: {
    ref: 'id',
    attributes: ['body', 'done']
  }
});
