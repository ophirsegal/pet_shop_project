const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/petitems/add', adminController.addPetItem);
router.post('/postTweet', adminController.postTweet);
router.get('/sales-data', adminController.getSalesData);
router.get('/getChats/:username', adminController.getChats);
router.get('/getUsers', adminController.getUsers);
router.get('/orders-data', adminController.getOrdersData);
router.put('/pets/update/:id', adminController.updatePet);
router.get('/pets/:id/items', adminController.getPetsItems);
router.get('/chat', adminController.getAdminChat);
router.post('/users/create', adminController.createUser);
router.put('/users/update/:id', adminController.updateUser);
router.post('/users/delete/:id', adminController.deleteUser);
router.post('/orders/delete/:id', adminController.deleteOrder);
router.post('/pets/delete/:id', adminController.deletepet);
router.post('/petItems/delete/:id',adminController.deletpetItems);
router.put('/petItems/update/:id', adminController.updatePetItem);
router.post('/pets/create', adminController.createPet);
router.get('/', adminController.showAdminPanel);
router.get('/pets', adminController.showPets);
router.get('/orders', adminController.showOrders);
router.get('/users', adminController.showUsers);
router.get('/graphs', adminController.showGraphs);
router.get('/chats', adminController.showChats);

module.exports = router;