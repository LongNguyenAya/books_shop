const express = require('express');
const router = express.Router();

const contactRequestController = require('../app/controllers/ContactRequestController');

router.post('/', contactRequestController.createContactRequest);

module.exports = router;
