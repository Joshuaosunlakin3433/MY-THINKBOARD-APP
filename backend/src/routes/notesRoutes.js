import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getAllNotesAlphabetically,
  getOneNote,
  updateNote,
} from "../controllers/notesControllers.js";
import { authenticateUser } from "../../middleware/firebaseAuth.js";
const router = express.Router();

router.get("/", authenticateUser, getAllNotes);
router.get("/alphabet", authenticateUser, getAllNotesAlphabetically);
router.post("/", authenticateUser, createNote);
router.get("/:id", authenticateUser, getOneNote);
router.put("/:id", authenticateUser, updateNote);
router.delete("/:id", authenticateUser, deleteNote);
// mongodb+srv://joshuaolaoluwa7:j1j2b3KNxnDbu7BK@cluster0.yk8cti1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export default router;
