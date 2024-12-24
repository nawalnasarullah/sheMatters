import express from "express";
const router = express.Router();
import psychologistController from "../controllers/psychologist.controller.js";
import { isUserAuthenticated } from "../middleware/auth.js";

const psychologist = new psychologistController();

router.route('/psychologist/all').get(psychologist.getAllPsychologists);
router.route('/psychologist/delete').delete(psychologist.deletePsychologist);
router.route('/psychologist/me').get(isUserAuthenticated, psychologist.getMe)
router.route('/psychologist/update-profile').patch(psychologist.updatePsychologist);
router.route('/psychologist/recommended').get(psychologist.getRecommendedPsychologist);

export default router;