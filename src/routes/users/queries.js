exports.createUser = ({
  email,
  password,
}) => `INSERT INTO users (email,password)
VALUES ('${email}','${password}')`;
