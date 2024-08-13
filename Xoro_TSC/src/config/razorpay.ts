import RazorpayConfig from "razorpay-functions";

const razorpay = RazorpayConfig({
    key_id: process.env.RAZORPAY_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET as string
}) 

export default razorpay;


