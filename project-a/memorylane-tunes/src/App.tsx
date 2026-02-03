import { useState } from "react";

const API_URL = "PASTE_YOUR_SCRIPT_URL_HERE";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({
    language: "Hindi",
    song: "",
    memory: ""
  });

  const addSong = async () => {
    if (!form.song) return alert("Enter song name");

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(form),
    });

    setSongs([{ ...form, date: new Date() }, ...songs]);
    setForm({ language: "Hindi", song: "", memory: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🚗 Drive Memorylane Tunes
      </h1>

      {/* Add Song */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <select
          className="w-full p-2 mb-2 border rounded"
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
        >
          <option>Hindi</option>
          <option>English</option>
          <option>Marathi</option>
        </select>

        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Song name"
          value={form.song}
          onChange={(e) => setForm({ ...form, song: e.target.value })}
        />

        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Memory (optional)"
          value={form.memory}
          onChange={(e) => setForm({ ...form, memory: e.target.value })}
        />

        <button
          onClick={addSong}
          className="w-full bg-black text-white p-2 rounded"
        >
          Add to Playlist 🎶
        </button>
      </div>

      {/* Playlist */}
      <div>
        {songs.map((s, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-lg shadow mb-2"
          >
            <div className="font-semibold">{s.song}</div>
            <div className="text-sm text-gray-600">
              {s.language} • {new Date().toLocaleDateString()}
            </div>
            {s.memory && (
              <div className="text-sm mt-1 italic">
                “{s.memory}”
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
