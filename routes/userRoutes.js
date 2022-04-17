const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();

// prettier-ignore
router
  .route('/api/v1/users')
  .get(userController.getAllUsers)
  .patch(userController.createUsers);
// prettier-ignore
router
  .route('/api/v1/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

// app.route('/api/v1/users')
//   .get(getAllUsers)
//   .patch(createUsers);

// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
