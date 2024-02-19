import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = async (req, res) => {
  try {
    const { productId } = req.query;
    const { quantity } = req.body;
    const productExists = await Product.findById(productId);

    const quantityToInt = parseInt(quantity);

    if (quantityToInt <= 0) {
      return res
        .status(400)
        .json(new ApiError(400, "quantity must be greater than zero"));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id });
    }
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex !== -1) {
      // If product already exists, update the quantity
      cart.products[productIndex].quantity += quantityToInt;
    } else {
      // If product doesn't exist, add it to the cart
      cart.products.push({ product: productId, quantity: quantityToInt });
    }

    // Update total items and total price
    cart.totalItems += quantityToInt;
    cart.totalPrice += productExists.price * quantityToInt;

    // Save the updated cart
    await cart.save();
    return res
      .status(200)
      .json(new ApiResponse(200, cart, "product Added to Cart"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

const getUserCartItems = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id }, { user: 0 });

    if (!userCart) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            400,
            {},
            "Your cart is empty! Add to Cart products will show here!"
          )
        );
    }

    return res.status(200).json(new ApiResponse(200, userCart, ""));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const productId = req.query.productId || req.body.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(new ApiError(400, "product not found"));
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json(
          new ApiError(400, "No item in the cart! add items will appear here")
        );
    }

    const updateCart = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    cart.products = updateCart;
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cart.products) {
      totalItems += item.quantity;
      try {
        const product = await Product.findById(item.product);
        totalPrice += product.price * item.quantity;
      } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
      }
    }
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    await cart.save();

    return res.status(200).json(new ApiResponse(200, cart, ""));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export { addToCart, getUserCartItems, deleteCartItem };
