import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getAllNotesAlphabetically,
  getOneNote,
  updateNote,
} from "../controllers/notesControllers.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/alphabet", getAllNotesAlphabetically);
router.post("/", createNote);
router.get("/:id", getOneNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
// mongodb+srv://joshuaolaoluwa7:j1j2b3KNxnDbu7BK@cluster0.yk8cti1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export default router;
