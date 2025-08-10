import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StatsPage.css';

export default function StatsPage({ user }) {
  // Stores the list of past typing test results
  const [history, setHistory] = useState([]);

  // Stores the average stats (WPM and Accuracy)
  const [avg, setAvg] = useState({ avg_wpm: 0, avg_accuracy: 0 });

  const userId = user?.id;
  const username = user?.username;

  // Fetch stats (history + averages) when user info changes
  useEffect(() => {
    if (!userId || !username) return;

    async function fetchStats() {
      await Promise.all([fetchHistory(), fetchAverages()]);
    }

    fetchStats();
  }, [userId, username]);

  // Fetch full typing test history
  async function fetchHistory() {
    try {
      const res = await fetch(`http://localhost:5000/results/history/${userId}`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Could not fetch history:', err.message);
      setHistory([]);
    }
  }

  // Fetch average WPM and Accuracy
  async function fetchAverages() {
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

  // Format date as: "Jul 27, 2025"
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // Format time as: "3:42 PM"
  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  // Renders a single row in the history table
  function renderHistoryRow(entry, index) {
    return (
      <tr key={index}>
        <td>{formatDate(entry.created_at)}</td>
        <td>{formatTime(entry.created_at)}</td>
        <td>{entry.wpm}</td>
        <td>{entry.accuracy}%</td>
      </tr>
    );
  }

  return (
    <div className="stats-container">
      {/* Page Header */}
      <header>
        <h1>📊 Stats for {username}</h1>
        <Link to="/typing" className="back-button">⬅ Back</Link>
      </header>

      {/* Average Performance Section */}
      <section className="averages">
        <h2>Average Performance</h2>
        <div className="card">
          <p><strong>WPM:</strong> {avg.avg_wpm}</p>
          <p><strong>Accuracy:</strong> {avg.avg_accuracy}%</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history">
        <h2>Recent Typing Sessions</h2>

        {history.length === 0 ? (
          <p>No history found.</p>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>WPM</th>
                  <th>Accuracy (%)</th>
                </tr>
              </thead>
              <tbody>
                {history.map(renderHistoryRow)}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );

 
}
