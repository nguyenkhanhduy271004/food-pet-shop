import express from "express"
import { authMiddleware } from '../middleware/auth.js'
import { addContactInfoController } from "../controllers/contact.info.controller.js";

const contactInfoRoute = express.Router()

contactInfoRoute.post('/contact-info', authMiddleware, addContactInfoController);

export default contactInfoRoute