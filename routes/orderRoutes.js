const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.post('/add-to-cart', orderController.addToCart);
router.get('/all', orderController.getOrders);
router.put('/:orderId/placed', orderController.orderPlaced);
router.put('/removeFromCart/:petItemId', orderController.removeFromCart); 
router.get('/cart', orderController.showCart);
router.get('/history', orderController.listPlacedOrders);
router.put('/:orderId', orderController.updateOrder); 

module.exports = router;
