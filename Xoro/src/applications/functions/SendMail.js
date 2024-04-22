"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationOTP = exports.SendVerificationLink = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer_1 = require("../../config/mailer");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: mailer_1.Mailer
});
const SendVerificationLink = (Email, VerificationLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = "Welcome to Xoro Online, where gaming and social media collide to create an electrifying digital experience. Immerse yourself in the world of live game streaming, where you can watch your favorite gamers in action, cheer them on, and engage with fellow enthusiasts in real-time. With a diverse array of gaming content and an active community of gamers, Xoro Online is the ultimate destination for anyone passionate about gaming culture. As you embark on your journey with Xoro Online, rest assured that your security and privacy are our top priorities. To ensure the authenticity of user accounts and protect against unauthorized access, we employ a rigorous verification process. Upon registration, a verification link will be sent to your email address. Simply click on the link to verify your email and activate your account securely. With our robust verification measures in place, you can explore the world of Xoro Online with confidence and peace of mind. Join us today and elevate your gaming experience to new heights.";
        const footer = `Link : ${VerificationLink} . Also note that the link will expire in 2 minutes`;
        const mailOptions = {
            from: mailer_1.Mailer.user,
            to: Email,
            subject: 'Xoro Online User Verification',
            text: `${text}\n\n${footer}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error.message);
                return false;
            }
            console.log('Email sent:', info.response);
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.SendVerificationLink = SendVerificationLink;
const htmlSender = (OTP, text) => {
    return `
        <html>
        <body>
        <center><p style='text-decoration:underline'>OTP For Login Verification</p></center>
            <center><h1 style="font-size: 36px; color: #ff0000;">${OTP}</h1></center>
            <p>${text}</p>
        </body>
        </html>
    `;
};
const SendVerificationOTP = (Email, OTP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = "Welcome to Xoro Online! As part of our commitment to ensuring a secure and enjoyable journey for our users, we've sent you an OTP (One-Time Password) for verification. Your gateway to immersive gaming experiences and vibrant social connections awaits! Simply enter the code provided to validate your account and unlock access to a world of gaming excitement and community interaction. Thank you for choosing Xoro Online – where every connection counts!";
        const body = htmlSender(OTP, text);
        const mailOptions = {
            from: mailer_1.Mailer.user,
            to: Email,
            subject: 'Xoro Online User Verification',
            html: body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error.message);
                return false;
            }
            console.log(info.response);
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.SendVerificationOTP = SendVerificationOTP;
