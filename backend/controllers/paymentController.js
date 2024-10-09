const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const razorpay = require("razorpay");
const {
  validatePaymentVerification,
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

let rzpInstance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await rzpInstance.orders.create({
    amount: req.body.amount,
    currency: "INR",
    notes: {
      company: "shoocart Enterprises",
    },
  });

  res.status(200).json({ success: true, order_id: myPayment.id });
});

exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {
  const {
    razorpay_payment_id,
    orderId,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  let result = validatePaymentVerification(
    { order_id: orderId, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.RAZORPAY_SECRET_KEY
  );

  res.status(200).json({ success: result });
});

exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, razorpayApiKey: process.env.RAZORPAY_API_KEY });
});
