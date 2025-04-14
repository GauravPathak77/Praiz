const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");
const cloudinaryUploadImg = require("../utils/cloudinary");

// Create Product
const createProduct = asyncHandler(async (req,res) => {
    try{
        if(req.body.title && req.body.color) {
            req.body.slug = slugify(req.body.title + " " + req.body.color);
        }
        if(req.body.category === '1'){
          req.body.category = 'Rings';
        }
        else if(req.body.category === '2'){
          req.body.category = 'Necklace'
        }
        else if(req.body.category === '3'){
          req.body.category = 'Earrings'
        }
        else if(req.body.category === '4'){
          req.body.category = 'Bracelets'
        }
        else if(req.body.category === '5'){
          req.body.category = 'Sets'
        }
        if(req.body.quantity < 0){
          req.body.quantity *= -1;
        }
        //console.log("Product: ", req.body);
        const newProduct = await Product.create(req.body);
        // uploadImages();
        // res.render('uploadPhoto', {id: newProduct.id});
        res.redirect(`/product/upload/${newProduct.id}`);
        // res.json(newProduct);
    }catch(error) {
        throw new Error(error);
    }
});

// Update a Product
const updateProduct = asyncHandler(async (req,res) => {
    try {
      const slug = req.body.slug;
      const product = await Product.findOne({slug: slug});
      // const {title, description, sellingPrice, price, discount, quantity, weight, material, dimension, category, color } = req.body ? req.body : product;

      let newCategory = product.category;

      if(req.body.category === '1'){
        newCategory = 'Rings';
      }
      else if(req.body.category === '2'){
        newCategory = 'Necklace'
      }
      else if(req.body.category === '3'){
        newCategory = 'Earrings'
      }
      else if(req.body.category === '4'){
        newCategory = 'Bracelets'
      }
      else if(req.body.category === '5'){
        newCategory = 'Sets'
      }

      let featured = product.featured;
      if(req.body.featured) {
        featured = req.body.featured == '2' ? true : false;
      }

      const title = req.body.title ? req.body.title : product.title;
      const description = req.body.description ? req.body.description : product.description;
      const sellingPrice = req.body.sellingPrice ? req.body.sellingPrice : product.sellingPrice;
      const price = req.body.price ? req.body.price : product.price;
      const discount = req.body.discount ? req.body.discount : product.discount;
      const quantity = req.body.quantity ? req.body.quantity : product.quantity;
      const weight = req.body.weight ? req.body.weight : product.weight;
      const material = req.body.material ? req.body.material : product.material;
      const dimension = req.body.dimension ? req.body.dimension : product.dimension;
      const category = newCategory;
      const color = req.body.color ? req.body.color : product.color[0];
      const productLabel = req.body.productLabel ? req.body.productLabel : product.productLabel; 
  
      // Find the product by ID and update it with the new data
      const newProduct = await Product.findOneAndUpdate(
        { slug: slug },
        {
          title,
          description,
          sellingPrice,
          price,
          discount,
          quantity,
          weight,
          material,
          dimension,
          category,
          color,
          productLabel,
          featured,
        },
        { new: true } // This option returns the updated document
      );
  
      if (newProduct) {
        res.json({ success: true, message: 'Product updated successfully', newProduct });
      } else {
        res.json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Images
const updateImages = asyncHandler(async (req, res) => {
  const slug = req.body.slug;
  const product = await Product.findOne({ slug });
  let newImages = [req.body?.img1, req.body?.img2, req.body?.img3, req.body?.img4, req.body?.img5];

  // Filter out empty strings
  newImages = newImages.filter((image) => image !== '');

  if(product) {
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        $set: {
          thumbnail: req.body.thumbnail,
          images: newImages
        }
      },
      { new: true }
    );
    
      console.log("Product found: ", updatedProduct);
      res.json(updatedProduct);
  }
  else {
    res.render('error' , {user: " ", error_msg: "Wrong Slug!"});
  }
});


// Delete a Product
const deleteProduct = asyncHandler(async (req,res) => {
    const { id } = req.params;
    try{
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    } catch(error){
        throw new Error(error);
    }
});


// Get a Product
const getaProduct = asyncHandler(async (req,res) => {
  // const { id } = req.params;
    const id = req.body.productId;
    //console.log("id is: " , id);
    try{
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch(error) {
        throw new Error(error);
    }
});


// Get single Product
const getSingleProduct = asyncHandler(async (req,res) => {
  const { slug } = req.params;
  const token = req.cookies?.refreshToken;
  const user = await User.findOne({ 'refreshToken': token });
    // const id = req.body.productId;
    //console.log("id is: " , id);
    try{
        let findProduct = await Product.findOne({ 'slug': slug });
        let allProducts = await Product.find({ 'category': findProduct.category });
        allProducts = allProducts.filter(item => item.slug !== findProduct.slug);
        let allColors = await Product.find({'title': findProduct.title});
        allColors = allColors.map((prod) => {
          return prod.color[0];
        })
        console.log("Products: ", findProduct.length, findProduct);
        // res.json(findProduct);

        //console.log(token);
        //console.log("Product is: ", findProduct);
        if(user){
          res.render('sproduct', { product: findProduct, bearerToken: token, Id: findProduct._id, user: user, allProducts, allColors });
        } else {
          res.render('sproduct', { product: findProduct, bearerToken: token, Id: findProduct._id, user: '', allProducts, allColors });
        }
        
    } catch(error) {
      if(user){
        res.render('error', {user, error_msg: 'error1'});
      } else {
        res.render('error', {user: ' ', error_msg: 'error2'});
      }
    }
});


// Sort Descending
const sortDesc = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const user = await User.findOne({'refreshToken': token});
  //console.log(user);
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["sort"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
        let query = Product.find(JSON.parse(queryStr));
    
        // Sorting
        // descending sorting
        if (req.query.sort) {
          const sortBy = req.query.sort.split(",").join(" ");
          query = query.sort(`-${sortBy}`); // Adding '-' before sortBy for descending order
        } else {
          query = query.sort("-createdAt"); // Default sort by createdAt in descending order
        }

        const product = await query;
        // res.json(product);
        //console.log(product);
        if(product.length !== 0) {
        res.render('products', {user ,Products: product, token});
        } else {
          // res.redirect('/');
          res.render('error', {user, error_msg: "Coming Soon"});
        }
      } catch (error) {
        throw new Error(error);
      }
});


// Get all Products
const getAllProduct = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const user = await User.findOne({'refreshToken': token});
  //console.log(user);
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields", "fbclid", "gclid"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
        let query = Product.find(JSON.parse(queryStr));
    
        // Sorting
        // ascending sorting
        if (req.query.sort) {
          const sortBy = req.query.sort.split(",").join(" ");
          query = query.sort(sortBy);
        } else {
          query = query.sort("-createdAt");
        }
    
        // limiting the fields
    
        if (req.query.fields) {
          const fields = req.query.fields.split(",").join(" ");
          query = query.select(fields);
        } else {
          query = query.select("-__v");
        }
    
        // pagination
    
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
          const productCount = await Product.countDocuments();
          if (skip >= productCount) throw new Error("This Page does not exists");
        }

        // Search
        const queryObject = {}
        if (req.query.title) {
          queryObject.title = { $regex: title, $options: "i"} 
        }
        let product = await query;
        product = product.filter(p => (p.category !== "gift" && p.category !== "Dummy"));
        // res.json(product);
        //console.log(product);
        if(product.length !== 0) {
          if(user){
            res.render('products', {user: user , Products: product, token});
          } else {
        res.render('products', {user: " ", Products: product, token});

          }
        } else {
          // res.redirect('/');
          res.render('error', {user: user, error_msg: "Coming Soon"});
        }
      } catch (error) {
        throw new Error(error);
      }
});

// Add to wishlist
const addToWishlist = asyncHandler(async (req,res) => {
  // const { _id } = req.user;
  const _id = req.body.userId;
  const prodId = req.body.prodId;
  // const { prodId } = req.body;
  try{
    const user = await User.findById(_id);
    if(user && user.email !== " "){
      const alreadyadded = user.wishlist.find((id) => id.toString() === prodId.toString());

    //console.log("Already in Wish: ", alreadyadded);
    if(!alreadyadded){
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json({user, message: "Added To WishList"});
    } else {
      res.json({user, message: "Already Added"});
    }
    // res.json(user);
    } else {
      res.redirect('/myacc');
      // res.json({message: "Not Authorized"});
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Remove wishlist
const removeFromWishlist = asyncHandler(async (req,res) => {
  // const { _id } = req.user;
  const _id = req.body.userId;
  const prodId = req.body.prodId;
  // const { prodId } = req.body;
  try{
    const user = await User.findById(_id);
    const newList = user.wishlist.filter(id => id.toString() !== prodId.toString());
    //console.log("Product Id: ", prodId);
    //console.log("New List: ", newList);

  User.findByIdAndUpdate(_id, { $set: { wishlist: newList } }, { new: true })
  .then(updatedUser => {
    //console.log('Wishlist updated successfully');
    //console.log(updatedUser);
  })
  .catch(err => {
    console.error('Error updating wishlist', err);
  });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Get WishList
const getUserWish = asyncHandler(async (req,res) => {
  // const { _id } = req.user;
  const token = req.cookies?.refreshToken;
  const user = await User.findOne({ 'refreshToken': token });
//   // validateMongoDbId(_id);
  try{
   
      if (user && user.email !== " ") {
        const wishlist = await Promise.all(user.wishlist.map(async (id) => {
          let product = await Product.findById(id);
          return product;
        }));
        console.log("Wishlist Products: ", wishlist);
        res.render('wishPage', {Wishlist: wishlist, user});
      } else {
        console.log("((((((((((((((((((((((((((((.)))))))))))))))))))))))))))")
        res.redirect('/myacc');
      }
  } catch(error){
      throw new Error(error);
  }
});

// Ratings
const rating = asyncHandler(async (req,res) => {
  // const { _id } = req.user;
  const token = req?.cookies?.refreshToken;
  const { star, prodId } = req.body;
  const _id = await User.findOne({ 'refreshToken': token });

  try{
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString() 
    );
    if(alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star },
        },
        { 
          new: true,
        }
      );
      res.json(updateRating);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      res.json(rateProduct);
    }

    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
    .map((item) => item.star)
    .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch(error){
    throw new Error(error);
  }
});

// Upload Images

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        //console.log(newpath);
        urls.push(newpath);
        // fs.unlinkSync(path);
      }
      const findProduct = await Product.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) =>{
            return file;
          }),
        },
        {
          new: true,
        }
      );
      //console.log("FindProduct: ", findProduct);
      res.redirect("/admin");
      // res.json(findProduct);
      // const images = urls.map((file) => {
      //   return file;
      // });
      // res.json(images);
    } catch (error) {
      throw new Error(error);
    }
  });

  // Set Product Style
  const setStyle = asyncHandler(async(req, res) => {
    const type = req.body.styleType;
    const id = req.body.prodId;
    //console.log("++++", req.body, "++++");
    // const product = await Product.findById({'_id': id});
    const product = await Product.findByIdAndUpdate(id, 
      { 
        $push: {style: type} 
      }, 
      { new: true },
    // (err, updatedStyle) => {
    //     if (err) {
    //         console.error('Error updating style:', err);
    //     } else {
    //         //console.log('Updated Style:', updatedStyle);
    //     }
    // }
  );
  //console.log(product);
  res.json(product);
  // res.redirect('/admin');
  });



  const handleStyle = asyncHandler(async (req, res) => {
    try {
      const token = req?.cookies?.refreshToken;
      const user = await User.findOne({ 'refreshToken': token });
      const userStyle = req.body;
      const queryString = userStyle.join(" ");
      res.redirect(`/search?search=${queryString}`);

    } catch (error){
      res.redirect("/");
    }
  });

  //     const userProducts = [];
  //     const products = await Product.find(); // Assuming Product is your Mongoose model
  //     //console.log("Style: " ,userStyle);
  
  //     if (!userStyle) {
  //       return res.status(400).json({ error: 'Invalid user style' });
  //     }
  
  //     // // Convert userStyle elements to lowercase for case-insensitive comparison
  //     // const userStyleLower = userStyle.map(s => s.toLowerCase());
  
  //   //   // Loop through each product
  //   //   products.forEach(product => {
  //   //     // Convert product's style elements to lowercase for comparison
  //   //     const productStyleLower = product.style.map(s => s.toLowerCase());
  
  //   //     // Check if any element of userStyleLower matches with productStyleLower
  //   //     if (userStyleLower.some(style => productStyleLower.includes(style))) {
  //   //       userProducts.push(product);
  //   //     }
  //   //   });
  
  //   //   //console.log('userProducts:', userProducts);
  //   //   res.render('products', {user ,Products: userProducts, token});
  //   //   // res.json({ userProducts });
  //   // } catch (error) {
  //   //   console.error('Error:', error);
  //   //   res.status(500).json({ error: 'Internal Server Error' });
  //   // }
  //   const queryString = userStyle.map((item) => {

  //   })
  // });

const handlefilter = asyncHandler(async (req, res) => {

    try{
      const token = req?.cookies?.refreshToken;
      let user = await User.findOne({ 'refreshToken': token });
      const userStyle = req.body.style;
      const products = await Product.find();
    // Filter products based on userStyle
    const newProducts = products.filter(product =>
    product.style.some(style => style.toLowerCase() === userStyle.toLowerCase())
  );
  if(!user) {
    user = '-1';
  }
  //console.log(newProducts);
  // res.json(newStyle);
  res.render('filteredProduct', {user: user, Products: newProducts, style: userStyle.toLowerCase()});
    } catch (error){
      res.redirect("/");
    }
  });

  const bestSeller = asyncHandler(async (req, res) => {
    const token = req?.cookies?.refreshToken;
    let user = await User.findOne({ 'refreshToken': token });
    if(!user) {
      user = '-1';
    }

    try{
      const products = await Product.find();
      // Filter products based on userStyle
      const newProducts = products.filter(product => (product.sellingPrice >= 649));
      //console.log(newProducts);
      // res.json(newStyle);
      res.render('filteredProduct', {user: user, Products: newProducts, style: 'best_seller'});
    } catch (error){
      res.redirect("/");
    }
  });


  

module.exports = { 
    createProduct, 
    getaProduct,
    getSingleProduct,
    sortDesc,
    getAllProduct,
    updateProduct, 
    updateImages,
    deleteProduct,
    addToWishlist,
    removeFromWishlist,
    getUserWish,
    rating,
    uploadImages,
    setStyle,
    handleStyle,
    handlefilter,
    bestSeller,
};
