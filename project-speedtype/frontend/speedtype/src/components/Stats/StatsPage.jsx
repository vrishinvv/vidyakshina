import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StatsPage.css';

export default function StatsPage({ user }) {
  // This stores the list of all past typing test results
  const [history, setHistory] = useState([]);

  // This stores the average stats (wpm and accuracy)
  const [avg, setAvg] = useState({ avg_wpm: 0, avg_accuracy: 0 });

  const userId = user?.id;
  const username = user?.username;

  useEffect(() => {
    if (!userId || !username) return;

    // This function fetches both history and average stats
    async function fetchStats() {
      // Get full typing test history
      try {
        const res = await fetch(`http://localhost:5000/results/history/${userId}`);
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Could not fetch history:', err.message);
        setHistory([]);
      }

      // Get average WPM and Accuracy
      try {
        const res = await fetch(`http://localhost:5000/results/average/${username}`);
        const data = await res.json();
        setAvg({
          avg_wpm: Math.round(data.avg_wpm || 0),
          avg_accuracy: Math.round(data.avg_accuracy || 0),
        });
      } catch (err) {
        console.error('Could not fetch averages:', err.message);
        setAvg({ avg_wpm: 0, avg_accuracy: 0 });
      }
    }

    fetchStats();
  }, [userId, username]);

  return (
    <div className="stats-container">
      <header>
        <h1>📊 Stats for {username}</h1>
        <Link to="/typing" className="back-button">⬅ Back</Link>
      </header>

      <section className="averages">
        <h2>Average Performance</h2>
        <div className="card">
          <p><strong>WPM:</strong> {avg.avg_wpm}</p>
          <p><strong>Accuracy:</strong> {avg.avg_accuracy}%</p>
        </div>
      </section>

      <section className="history">
        <h2>Recent Typing Sessions</h2>
        {history.length === 0 ? (
          <p>No history found.</p>
        ) : (
          <div className="history-list">
            {history.map((entry, i) => (
              <div key={i} className="card">
                <p><strong>{new Date(entry.created_at).toLocaleString()}</strong></p>
                <p>WPM: {entry.wpm}</p>
                <p>Accuracy: {entry.accuracy}%</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
