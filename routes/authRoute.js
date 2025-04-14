const express = require('express');
// express().use(express.static('public'));
const router = express.Router();
const { createUser, loginUserCtrl, loginUserMobCtrl, visitHome, getallUser, getaUser, deleteaUser, forgotPass, getUpdatedUser, setNewPass, getNewPass, blockUser, unblockUser, handleRefrehToken, logout, loginAdmin, saveAddress, userCart, removeCart, getUserCart, emptyCart, toggleQuantity, getCheckout, applyCoupon, createOrder, updateOrder, getOrders, updateOrderStatus, getOTP, updateProfile, getRegOTP, giftCtrl, storeEmail, giftWrap } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', visitHome);
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/login-mob", loginUserMobCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", userCart);
router.post("/cart-remove", removeCart);
router.post("/cart/create_order", createOrder);
router.post("/save-address-to-order", updateOrder);
router.post("/toggleQuantity", toggleQuantity);
router.post("/cart/applycoupon", applyCoupon);
router.post("/order/update-order", updateOrderStatus);
router.post("/updateProfile", updateProfile);
// router.post("/cart", userCart);
router.get("/all-user", getallUser);
router.get("/get-orders", getOrders);
router.get("/refresh", handleRefrehToken);
router.get("/logout", logout);
router.get("/forgotPass", forgotPass);
// router.get("/cart", authMiddleware, getUserCart);
router.get("/cart", getUserCart);
router.get("/checkout/:id", getCheckout);
router.get("/:id", authMiddleware , isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.post("/edit-user", getUpdatedUser);
router.get('/updatePass/:id', getNewPass);
router.post('/setUpdate/:id', setNewPass)
router.post("/save-address/:id", saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.post("/block-user/:id", blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.post("/otp_validation", getOTP);
router.post("/reg_otp", getRegOTP);
router.post("/gift", giftCtrl);
router.post('/emails', storeEmail);
router.post('/gift-wrap', giftWrap);




module.exports = router;