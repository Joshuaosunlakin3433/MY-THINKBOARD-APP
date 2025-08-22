import Note from "../models/Notes.js";

//Get all notes for suthenticated user only
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.uid }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Getting sorted notes for the authenticated user only

export const getAllNotesAlphabetically = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.uid }).sort({ title: 1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotesAlphabetically controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//getting just one note specifically to the user it belongs to
export const getOneNote = async (req, res) => {
  try {
    const oneNote = await Note.findOne({
      _id: req.params.id,
      userId: req.user.uid,
    });

    if (!oneNote) {
      return res
        .status(404)
        .json({ message: "Note doesn't exist or you don't have acess to it" });
    }
    res.status(200).json(oneNote);
  } catch (error) {
    console.error("Error in getOneNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//create a new note controller for the authenticated user
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      userId: req.user.uid,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update a note (only if it belongs to the user)
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      res.status(404).json({
        message:
          "Note not found or you don't have permission to update the note",
      });
    }
    res.status(200).json({
      message: "Note updated successfully",
      note: updateNote,
    });

    //  const id = parseInt(req.param.id)
    // const savedNote = savedNote.find((note)=> note.id === id)
    // if(!savedNote){
    //   return res.status(400).json({message:"could not find note to update"})
    // }
    // savedNote.title = title
    // savedNote.content = content
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//writing the delete controller
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(
      { _id: req.params.id, userId: req.user.uid },
      { new: true }
    );
    if (!deletedNote) {
      res
        .status(404)
        .json({
          message: "Note not found or you don't have permission to delete note",
        });
    }
    res.status(200).json({ message: "Deleted Note successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
