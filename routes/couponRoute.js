const express = require('express');
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require('../controller/couponCtrl');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createCoupon);
router.get('/all_coupons', getAllCoupon);
router.put('/:id', updateCoupon);
router.post('/delete', deleteCoupon);
// router.post('/', isAdmin, createCoupon);

module.exports = router;