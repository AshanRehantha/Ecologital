const express = require('express');
const router = express.Router();
const adminController = require('../../controller/Admin.controller');

router.post('/users/list', adminController.userslist);
router.post('/users/update', adminController.usersemailUpdate);

module.exports = router;