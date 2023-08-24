const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/add', petController.addPet);
router.get('/all', petController.getPets);
router.get('/:petId/items', petController.getItems);
router.get('/:petId/items/:category', petController.getItemsByCategory); // New route

module.exports = router;