import mongoose from "mongoose";

//1- create a schema
//2- create a model based off that schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // 🆕 NEW: Add user ID to link notes to specific users
    userId: {
      type: String,
      required: true,
      index: true, // Makes searching by userId faster
    },
  },
  { timestamps: true } //createdAt, updatedAt
);

// 🆕 NEW: Add index for better performance when filtering by user
noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;

// import mongoose from "mongoose";

// //1- create a schema
// //2- cerate a model based off that schema
// const noteSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true } //createdAt, updatedAt
// );

// const Note = mongoose.model("Note", noteSchema);

// export default Note;