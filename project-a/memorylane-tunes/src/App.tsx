import { useState } from "react";

type Song = {
  language: string;
  song: string;
  memory?: string;
  date?: string | Date;
};

type Form = {
  language: string;
  song: string;
  memory: string;
};

const API_URL = "https://script.google.com/macros/s/replace_here/exec"
export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [form, setForm] = useState<Form>({
    language: "Hindi",
    song: "",
    memory: "",
  });

  const addSong = async () => {
    if (!form.song) return alert("Enter song name");

    // Use a "simple" Content-Type (text/plain) to avoid a CORS preflight OPTIONS
    // request. Google Apps Script web apps often return 405 on OPTIONS, so sending
    // a simple POST avoids the preflight and lets doPost receive e.postData.contents.
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => String(res.status));
      console.error("Add song failed:", res.status, text);
      return alert("Failed to add song: " + res.status);
    }

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
