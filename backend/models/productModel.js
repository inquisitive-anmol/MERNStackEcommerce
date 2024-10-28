const mongoose = require("mongoose");
// const { trim } = require("validator");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter product Name"],
      trim: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please Enter Product category"],
    },
    variants: [
      {
        size: {
          type: String,
        },
        maxPrice: {
          type: Number,
          required: [true, "Please Enter Product Max Retail Price"],
          // min: [0, "Price must be greater than or equal to 0"],
          // max: [100000, "Price must be less than or equal to 10000"]
          maxLength: [8, "Price cannot exceed 8 figure"],
        },
        shoocartPrice: {
          type: Number,
          required: [true, "Please Enter Product Shoocart Price"],
          // min: [0, "Price must be greater than or equal to 0"],
          // max: [100000, "Price must be less than or equal to 10000"]
          maxLength: [8, "Price cannot exceed 8 figure"],
        },
        stock: {
          type: Number,
          required: [true, "Please Enter Product Stock"],
          maxLength: [4, "Stock cannot exceed 4 character"],
          default: 1,
        },
        brand: {
          type: String,
          required: [true, "Please Enter the Brand of Product"],
          default: "Shoocart",
          maxLength: [40, "Should not exceed 40 characters"],
          trim: true,
        },
        material: {
          type: String,
          required: [true, "Please enter the Material of the Product"],
          trim: true,
        },
        soleMaterial: {
          type: String,
        },
        weight: {
          type: Number,
          required: [true, "Please enter the Weight of Product in grams"],
        },
        manufacturersDetail: {
          type: String,
          trim: true,
          required: [true, "Please enter the Manufacturers Detail"],
        },
        packersDetail: {
          type: String,
          trim: true,
          required: [true, "Please enter the Packers Detail"],
        },
      },
    ],
    status: {
      type: String,
      required: [true, "Enter the status of Product"],
      enum: ["active", "inActive", "outOfStock"],
      default: "active",
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // users: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    productId: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
