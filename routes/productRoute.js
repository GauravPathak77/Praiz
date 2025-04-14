const express = require("express");
const { createProduct, getaProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, getUserWish, rating, uploadImages, removeFromWishlist, updateImages, setStyle, handleStyle, handlefilter, bestSeller, sortDesc } = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadimages");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createProduct);
// router.put("/upload/:id", authMiddleware, isAdmin,  uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.post("/", createProduct);
router.get("/upload/:id", (req,res) => {res.render('uploadPhoto', {id: req.params.id});});
// router.post("/upload", uploadPhoto.array("images", 10),(req,res) => {res.send("success");} );
// router.post("/upload/:id", uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.post("/upload/:id", uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.post("/getproductById", getaProduct);
router.post('/addWishlist', addToWishlist);
router.post('/removeWishlist', removeFromWishlist);
router.post('/updateImages', updateImages);
router.post('/update', updateProduct)
router.get('/wishlist', getUserWish);
router.get('/best_sellers', bestSeller);
// router.post('/wishlist', authMiddleware, addToWishlist);
router.post('/rating', rating);
router.delete("/:id", deleteProduct);
router.get("/", getAllProduct);
router.get("/desc", sortDesc);
// router.post("/setStyle", setStyle);
router.post('/style', handleStyle);
router.post('/filter', handlefilter);
router.get("/:slug", getSingleProduct);

module.exports = router;