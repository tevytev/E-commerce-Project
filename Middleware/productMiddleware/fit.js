const express = require("express");
const { db } = require("../../Models");

//Assigning db.users to User variable
const Product = db.products;

const findGender = async (req, res, next) => {
  const { gender } = req.query;

  const products = await Products.findAll({
    attributes: ["name", "price", "category", "salePrice", "id"],
    where: {
      fit: fit,
    },
  });

  if (products) {
    req.fitAdjustedProducts = products;
    next();
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  findGender,
};
