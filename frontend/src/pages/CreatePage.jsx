import { ArrowLeftIcon, PenToolIcon, FileTextIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { api } from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note:", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button with enhanced styling */}
          <Link
            to={"/"}
            className="inline-flex items-center gap-2 btn btn-ghost mb-8 hover:bg-base-200 transition-all duration-200"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* Main Card with enhanced design */}
          <div className="card bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body p-8">
              {/* Header with icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <PenToolIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-bold text-base-content">
                    Create New Note
                  </h2>
                  <p className="text-sm sm:text-base text-base-content/60 mt-1">
                    Capture your thoughts and ideas
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input with enhanced design */}
                <div className="form-control">
                  <label className="label pb-2" htmlFor="title">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <FileTextIcon className="size-4" />
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter your note title..."
                    className="input input-bordered input-lg w-full focus:input-primary focus:outline-none transition-all duration-200 bg-base-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Textarea with enhanced design */}
                <div className="form-control">
                  <label className="label pb-2" htmlFor="content">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <PenToolIcon className="size-4" />
                      Content
                    </span>
                    <span className="label-text-alt text-base-content/50">
                      {content.length} characters
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-lg w-full min-h-[200px] focus:textarea-primary focus:outline-none transition-all duration-200 bg-base-50 resize-y"
                    id="content"
                    placeholder="Start writing your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ minHeight: "200px" }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-between items-center pt-4">
                  <div className="text-sm text-base-content/60">
                    {title.trim() && content.trim() ? (
                      <span className="text-success flex items-center gap-1">
                        ✓ Ready to save
                      </span>
                    ) : (
                      <span>Fill in both title and content to continue</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link to="/" className="btn btn-ghost">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg min-w-[140px]"
                      disabled={loading || !title.trim() || !content.trim()}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <PenToolIcon className="size-4" />
                          Create Note
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Optional: Quick tips card */}
          <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="flex items-start gap-3">
              <div className="text-info text-xl">💡</div>
              <div>
                <p className="text-sm text-base-content/70">
                  <strong>Pro tip:</strong> Use descriptive titles to make your
                  notes easier to find later. You can always edit your notes
                  after creating them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
