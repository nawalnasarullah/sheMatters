import { Journal } from "../models/journal.model.js";

export default class JournalController {
    async createNewJournal(req, res, next) {
        try {
            const journal = new Journal(req.body);
            const savedJournal = await journal.save();
            res.status(201).json({
                savedJournal,
                message: "New journal created successfully",
                success: true
            });
          } catch (err) {
            next(err);
          }
    }

    async getAllJournals(req, res, next) {
        try {
            const journals = await Journal.find();
            res.json({
                journals,
                message: "All journals retrieved successfully",
                success: true
            });
          } catch (err) {
            next(err);
          }
    }

    async getJournalById(req, res, next) {
        try {
            const { id } = req.query;
            const journal = await Journal.findById(id);
            if (!journal) {
                return res.status(404).json({
                    message: "Journal not found",
                    success: false
                });
            }
            res.json({
                journal,
                message: "Journal retrieved successfully",
                success: true
            });
          } catch (err) {
            next(err);
          }
    }

    async updateJournalById(req, res, next) {
        try {
            const { id } = req.query;
            const updatedJournal = await Journal.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedJournal) {
                return res.status(404).json({
                    message: "Journal not found",
                    success: false
                });
            }
            res.json({
                updatedJournal,
                message: "Journal updated successfully",
                success: true
            });
          } catch (err) {
            next(err);
          }
    }

    async deleteJournalById(req, res, next) {
        try {
            const { id } = req.query;
            const deletedJournal = await Journal.findByIdAndDelete(id);
            if (!deletedJournal) {
                return res.status(404).json({
                    message: "Journal not found",
                    success: false
                });
            }
            res.json({
                deletedJournal,
                message: "Journal deleted successfully",
                success: true
            });
          } catch (err) {
            next(err);
          }
    }
}