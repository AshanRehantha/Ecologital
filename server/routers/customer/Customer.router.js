const express = require('express');
const router = express.Router();
const customerController = require('../../controller/Customer.controller');

router.post('/info', customerController.getCustomerInfo);
router.post('/update', customerController.updatUserInfo);
router.post('/update-password', customerController.updatePassword)


module.exports = router;