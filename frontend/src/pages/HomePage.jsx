import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { api } from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";
import { useAuth } from "../contexts/AuthContext"; 

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user, authReady } = useAuth(); // 🆕 Get auth state

  useEffect(() => {
    // 🆕 Only fetch notes when auth is ready and user is logged in
    if (!authReady) {
      console.log("⏳ Waiting for auth to be ready...");
      return;
    }

    if (!user) {
      console.log("❌ No user logged in");
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      console.log("🚀 Fetching notes for user:", user.email);
      try {
        const res = await api.get("notes"); // Token will be added automatically!
        console.log("📝 Notes fetched:", res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.");
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [authReady, user]); // 🆕 Depend on authReady and user

  // Show loading while waiting for auth
  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-primary">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show message if not logged in (shouldn't happen with route protection)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Please log in to view your notes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
      </div>
      {notes.length === 0 && !loading && !isRateLimited && <NoteNotFound />}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note._id}> {/* 🔧 Moved key to div */}
              <NoteCard
                content={note.content}
                title={note.title}
                createdAt={note.createdAt}
                _id={note._id}
                setNotes={setNotes}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;