exports.updateTodo = ({ title, id }) => `UPDATE todos
SET title='${title}'
WHERE id=${id}`;

exports.getTodos = `SELECT * FROM todos`;

exports.deleteTodo = (id) => `DELETE FROM todos WHERE id=${id};`;
