import querystring from "qs";
import crypto from "crypto";

export const createVNPayPaymentUrl = (req, res) => {
    const { amount, orderId, orderInfo } = req.body;

    const vnp_TmnCode = process.env.vnp_TmnCode;
    const vnp_HashSecret = process.env.vnp_HashSecret;
    const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const vnp_ReturnUrl = `http://localhost:${process.env.PORT}/vnpay_return`;

    const date = new Date();
    const createDate = date.toISOString().replace(/-|T|:|\.\d+Z/g, "").slice(0, 14);
    const expireDate = new Date(date.getTime() + 15 * 60 * 1000).toISOString().replace(/-|T|:|\.\d+Z/g, "").slice(0, 14);

    const params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode,
        vnp_Amount: amount * 100,
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "billpayment",
        vnp_Locale: "vn",
        vnp_ReturnUrl,
        vnp_IpAddr: req.ip.replace("::ffff:", ""),
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
    };

    const sortedParams = querystring.stringify(params, { encode: true });
    const signData = vnp_HashSecret + querystring.stringify(params, { encode: false });
    const secureHash = crypto.createHmac("sha512", vnp_HashSecret).update(signData).digest("hex");

    const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${secureHash}`;
    res.json({ paymentUrl });
};

export const vnpayReturn = (req, res) => {
    const vnp_HashSecret = process.env.vnp_HashSecret;
    const queryParams = req.query;

    const secureHash = queryParams.vnp_SecureHash;
    delete queryParams.vnp_SecureHash;
    delete queryParams.vnp_SecureHashType;

    const sortedParams = querystring.stringify(queryParams, { encode: false });
    const checkHash = crypto.createHmac("sha512", vnp_HashSecret).update(sortedParams).digest("hex");

    if (secureHash === checkHash) {
        if (queryParams.vnp_ResponseCode === "00") {
            res.json({ success: true, message: "Thanh toán thành công!" });
        } else {
            res.json({ success: false, message: "Thanh toán không thành công!" });
        }
    } else {
        res.status(400).json({ success: false, message: "Invalid checksum!" });
    }
};
