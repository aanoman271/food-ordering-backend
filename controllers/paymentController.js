import crypto from "crypto";

export const payhereNotify = async (req, res) => {
  try {
    // data from payhere
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;
    const merchantSecret = process.env.PAYHERE_SECRET;
    const localSignatureSource =
      merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      hashedSecret;
    // PayHere-এর নিয়ম অনুযায়ী Secret কি-কে uppercase MD5 করতে হয় প্রথমে
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();
    const localSignature = crypto
      .createHash("md5")
      .update(localSignatureSource)
      .digest("hex")
      .toUpperCase();

    if (localSignature === md5sig) {
      // status_code 2 means payment succes
      if (status_code === "2") {
        // find oder
        const order = await Order.findOne({ payhereOrderId: order_id });

        if (order) {
          order.paymentStatus = "Paid";
          order.payherePaymentId = payment_id; // PayHere Transaction ID
          await order.save();

          console.log(`Payment Success for Order: ${order_id}`);
          return res.status(200).send("Payment Verified & Updated");
        } else {
          return res.status(404).send("Order not found");
        }
      } else {
        console.log(`Payment Failed with Status: ${status_code}`);
        return res.status(200).send("Payment Failed Status Received");
      }
    } else {
      console.error(
        "Security Alert: Fraudulent Payment Notification Attempted!",
      );
      return res.status(400).send("Invalid Signature");
    }
  } catch (err) {
    console.error("PayHere Notification Error:", err.message);
    res.status(500).send("Server Error");
  }
};
