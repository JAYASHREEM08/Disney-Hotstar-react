import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getWatchHistory } from "../watchHistoryService";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      if (auth.currentUser) {
        const data = await getWatchHistory(auth.currentUser.uid);
        setHistory(data);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="watch-history-section">
      <h1>Watch History</h1>

      {history.length === 0 ? (
  <p>No watch history yet.</p>
) : (
  <div className="history-list">
    {history.map((movie) => (
      <div className="history-card" key={movie.id}>
        {movie.thumbnail && (
          <img
            src={movie.thumbnail}
            alt={movie.title}
            width="200"
          />
        )}

        <h3>{movie.title}</h3>
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default WatchHistory;
