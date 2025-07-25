import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TypingDisplay from './TypingDisplay.jsx';
import './SpeedType.css';

// Word bank
const WORDS = [
  'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but',
  'his', 'from', 'they', 'say', 'her', 'she', 'will', 'one', 'all', 'would',
  'there', 'their', 'what', 'about', 'which', 'when', 'make', 'can', 'like',
  'time', 'just', 'know', 'take', 'people', 'into', 'year', 'your', 'good',
  'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look',
  'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use',
  'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want',
  'because', 'any', 'these', 'give', 'day', 'most', 'us'
];

// Picks random set of words
const getWords = (count = 30) =>
  [...WORDS].sort(() => 0.5 - Math.random()).slice(0, count);

export default function TypingTest({ user }) {
  // App state
  const [wordList, setWordList] = useState([]);
  const [typed, setTyped] = useState([]);
  const [pos, setPos] = useState(0);
  const [time, setTime] = useState(60);
  const [duration, setDuration] = useState(60);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const ref = useRef();

  // Full string of words to type
  const fullText = useMemo(() => wordList.join(' ') + ' ', [wordList]);
  const chars = useMemo(() => fullText.split(''), [fullText]);

  // On first load, get initial words
  useEffect(() => {
    const load = async () => {
      setWordList(await getWords(200));
      ref.current?.focus();
    };
    load();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!started || done) return;
    if (time > 0) {
      const t = setTimeout(() => setTime(t => t - 1), 1000);
      return () => clearTimeout(t);
    }
    endTest();
  }, [time, started, done]);

  // Handle key presses
  const handleKey = (e) => {
    if (done) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      exit();
      return;
    }
  
    // Tab + Enter can restart anytime
    if (e.key === 'Enter' && e.getModifierState('Tab')) {
      e.preventDefault();
      reset();
      return;
    }
  

    // Start test on spacebar
    if (showStart && e.key === ' ') {
      setStarted(true);
      setShowStart(false);
      setStartTime(Date.now());
      return;
    }

    if (!started) return;

    if (e.key === 'Backspace') {
      setTyped(t => t.slice(0, -1));
      setPos(p => Math.max(0, p - 1));
      return;
    }

    if (e.key.length === 1 || e.key === ' ') {
      setTyped(t => [...t, e.key]);
      setPos(p => p + 1);
    }

    // Add more words if running low
    if (typed.length >= Math.floor(chars.length * 0.8)) {
      setWordList(w => [...w, ...getWords(50)]);
    }
  };

  // Calculate results and send to backend
  const endTest = async () => {
    const correct = typed.reduce((c, ch, i) => c + (ch === fullText[i] ? 1 : 0), 0);
    const total = typed.length;
    const acc = total ? Math.round((correct / total) * 100) : 0;
    const mins = (Date.now() - startTime) / 60000;
    const wordsPerMin = mins ? Math.round((correct / 5) / mins) : 0;

    setWpm(wordsPerMin);
    setAccuracy(acc);
    setDone(true);

    localStorage.setItem('userId', user.id);

    // Save result to backend
    try {
      await fetch('http://localhost:5000/results/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, wpm: wordsPerMin, accuracy: acc })
      });
    } catch (err) {
      console.error('Error saving result:', err);
    }
  };

  // Restart test
  const reset = async () => {
    setWordList(await getWords(200));
    setTyped([]);
    setPos(0);
    setStarted(false);
    setDone(false);
    setTime(duration);
    setShowStart(true);
    setWpm(0);
    setAccuracy(0);
    setTimeout(() => ref.current?.focus(), 0);
  };

  // Exit current test
  const exit = async () => {
    setWordList(await getWords(200));
    setTyped([]);
    setPos(0);
    setStarted(false);
    setDone(false);
    setTime(duration);
    setShowStart(true);
    setTimeout(() => ref.current?.focus(), 0);
  };

  return (
    <div
      className="typing-container"
      tabIndex={0}
      ref={ref}
      onKeyDown={handleKey}
    >
      <h2>Typing Test</h2>
      <div className="timer-display">{time}s</div>

      {/* Word/character rendering */}
      <TypingDisplay chars={chars} typed={typed} pos={pos} />

      {showStart ? (
        <>
          <div className="timer-options">
            {[15, 30, 60, 120].map(t => (
              <button
                key={t}
                className={t === duration ? 'selected' : ''}
                onClick={() => {
                  setDuration(t);
                  setTime(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <p><strong>Press spacebar to start</strong></p>
        </>
      ) : (
        <>
          {done && (
            <div className="result-panel">
              <p><strong>WPM:</strong> {wpm}</p>
              <p><strong>Accuracy:</strong> {accuracy}%</p>
            </div>
          )}

          <div className="controls">
            <Link to="/stats" className="stats-button">View Stats</Link>
            <button onClick={reset}>Retry</button>
            <button onClick={exit}>Exit</button>
            <button onClick={() => window.location.reload()} className="logout-button">Logout</button>
          </div>
        </>
      )}
    </div>
  );
}
