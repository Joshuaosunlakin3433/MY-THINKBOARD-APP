import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error occurred while fetching note", error);
        toast.error("Failed to fetch note, try again");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  console.log({ note });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("error occured while deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`notes/${id}`, note);
      toast.success("Note successfully updated");
      navigate("/");
    } catch (error) {
      console.log("Error occured while saving note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-7 md:size-10" />
      </div>
    );
  }
  return (
    <div className="relative min-h-screen z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost btn-sm sm:btn-md border-success">
              <ArrowLeftIcon className="size-4 sm:size-5" />
              <span className="hidden sm:inline">Back to Notes</span>
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline btn-sm sm:btn-md"
            >
              <Trash2Icon className="size-4 sm:size-5" />
              <span className="hidden sm:inline">Delete Note</span>
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label htmlFor="title" className="label block mb-1">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Note Title"
                  className="input input-bordered focus:border-0"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label htmlFor="content" className="block mb-1">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  id="content"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered focus:border-0 h-22"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
