import Note from "../models/Notes.js";

export const getAllNotes = async (_req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//sorting alphabetically
export const getAllNotesAlphabetically = async (_req, res) => {
  try {
    const notes = await Note.find().sort({ title: 1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotesAlphabetically controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//getting just one note specifically
export const getOneNote = async (req, res) => {
  try {
    const oneNote = await Note.findById(req.params.id);
    if (!oneNote) {
      return res.status(404).json({ message: "Note doesn't exist" });
    }
    res.status(200).json(oneNote);
  } catch (error) {
    console.error("Error in getOneNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//post controller
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//update controller
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully" });

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
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Deleted Note successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
