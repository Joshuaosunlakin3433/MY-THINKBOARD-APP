import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

const NoteCard = ({ title, content, createdAt, _id, setNotes}) => {
  const handleDelete = async (e, _id) => {
    e.preventDefault(); //get rid of navigation behavior
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${_id}`);
      setNotes((prev)=>prev.filter(note=> note._id !== _id))//get rid of deleted note from array
      toast.success("Note deleted successfully")

    } catch (error) {
      console.log("error occured while deleting note", error);
      toast.error("cannot delete note, try again");
    }
  };

  return (
    <Link
      to={`/note/${_id}`}
      className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-2 border-solid border-[#00FF9D] hover:scale-102 ease-in-out"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{title}</h3>
        <p className="text-base-content/70 line-clamp-1">{content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon
                className="size-4"
                onClick={(e) => handleDelete(e,_id)}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
