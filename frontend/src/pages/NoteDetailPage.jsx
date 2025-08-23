import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../lib/axios";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  EditIcon,
  FileTextIcon,
  PenToolIcon,
  SaveIcon,
} from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("error occurred while deleting note", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`notes/${id}`, note);
      toast.success("Note successfully updated");
      navigate("/");
    } catch (error) {
      console.log("Error occurred while saving note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="animate-spin size-8 md:size-12 text-primary" />
          <p className="text-base-content/70">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-base-content/70 mb-4">Note not found</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with action buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn btn-ghost hover:bg-base-200 transition-all duration-200"
            >
              <ArrowLeftIcon className="size-4 sm:size-5" />
              <span className="hidden xs:inline">Back to Notes</span>
              <span className="xs:hidden">Back</span>
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-error btn-outline hover:btn-error transition-all duration-200"
            >
              {deleting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="hidden sm:inline">Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2Icon className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">Delete Note</span>
                  <span className="sm:hidden">Delete</span>
                </>
              )}
            </button>
          </div>

          {/* Main editing card */}
          <div className="card bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body p-6 md:p-8">
              {/* Header with icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-warning/10 rounded-full">
                  <EditIcon className="size-6 text-warning" />
                </div>
                <div>
                  <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-bold text-base-content">
                    Edit Note
                  </h2>
                  <p className="text-sm sm:text-base text-base-content/60 mt-1">
                    Make changes to your note
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Title Input */}
                <div className="form-control">
                  <label htmlFor="title" className="label pb-2">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <FileTextIcon className="size-4" />
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter note title..."
                    className="input input-bordered input-lg w-full focus:input-primary focus:outline-none transition-all duration-200 bg-base-50"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                {/* Content Textarea */}
                <div className="form-control">
                  <label htmlFor="content" className="label pb-2">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <PenToolIcon className="size-4" />
                      Content
                    </span>
                    <span className="label-text-alt text-base-content/50">
                      {note.content.length} characters
                    </span>
                  </label>
                  <textarea
                    id="content"
                    placeholder="Write your note content here..."
                    className="textarea textarea-bordered textarea-lg w-full min-h-[250px] md:min-h-[300px] focus:textarea-primary focus:outline-none transition-all duration-200 bg-base-50 resize-y"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                {/* Action area */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-base-200">
                  <div className="text-sm text-base-content/60">
                    {note.title.trim() && note.content.trim() ? (
                      <span className="text-success flex items-center gap-1">
                        ✓ Ready to save changes
                      </span>
                    ) : (
                      <span>Both title and content are required</span>
                    )}
                  </div>

                  <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                    <Link to="/" className="btn btn-ghost w-full xs:w-auto">
                      Cancel
                    </Link>
                    <button
                      onClick={handleSave}
                      disabled={
                        saving || !note.title.trim() || !note.content.trim()
                      }
                      className="btn btn-primary btn-lg min-w-[140px] w-full xs:w-auto"
                    >
                      {saving ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <SaveIcon className="size-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions tip */}
          <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start gap-3">
              <div className="text-warning text-xl">⚡</div>
              <div className="flex-1">
                <p className="text-sm text-base-content/70">
                  <strong>Quick tip:</strong> Your changes are automatically
                  validated. The save button will be enabled once both title and
                  content have text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
