import express from "express";
const router = express.Router();
import JournalController from "../controllers/journal.controller.js";

const journal = new JournalController();

router.route('/journal/all').get(journal.getAllJournals);
router.route('/journal/new').post(journal.createNewJournal);
router.route('/journal/update/:id').put(journal.updateJournalById);
router.route('/journal/:id').get(journal.getJournalById);
router.route('/journal/delete/:id').delete(journal.deleteJournalById); 

export default router;
