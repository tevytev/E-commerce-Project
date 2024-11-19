const express = require("express");
const {
  getWishlist,
  insertIntoWishlistProducts,
  removeWishlistProduct,
  getWishlistByClothingType,
  lookUpProduct,
} = require("../Controllers/wishlistController");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.session?.passport?.user) {
    next();
  } else if (req.session?.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.use("/", isLoggedIn);

router.get("/", getWishlist);

router.get("/clothingType/:clothingType", getWishlistByClothingType);

router.get("/:productId", lookUpProduct);

router.post("/", insertIntoWishlistProducts);

router.delete("/:productId", removeWishlistProduct);

module.exports = router;
