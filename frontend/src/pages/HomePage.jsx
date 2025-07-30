import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { api } from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
      </div>
      {notes.length === 0 && !isRateLimited && <NoteNotFound/>}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div>
              <NoteCard
                key={note._id}
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
