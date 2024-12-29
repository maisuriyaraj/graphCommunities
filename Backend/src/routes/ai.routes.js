import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { getUserChatRooms } from "../controller/AI.controller.js";

const aiRoutes = Router();

/**
 * Secure Routes
 */

aiRoutes.route('/aiConfigs').get(verifyJWT,getUserChatRooms);
export {aiRoutes};

