import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TypingDisplay from './TypingDisplay.jsx';
import './SpeedType.css';

// List of words for the typing test
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

// Pick random words
function getWords(count) {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function TypingTest({ user }) {
  const [words, setWords] = useState([]);
  const [typedChars, setTypedChars] = useState([]);
  const [charIndex, setCharIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration, setTestDuration] = useState(60);

  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [showStartMessage, setShowStartMessage] = useState(true);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [startTime, setStartTime] = useState(null);
  const containerRef = useRef();

  // Full text user needs to type
  const fullText = useMemo(() => words.join(' ') + ' ', [words]);
  const allChars = useMemo(() => fullText.split(''), [fullText]);

  // Load words once on page load
  useEffect(() => {
    async function loadWords() {
      const newWords = await getWords(200);
      setWords(newWords);
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }

    loadWords();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!testStarted || testEnded) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Time's up
    finishTest();
  }, [timeLeft, testStarted, testEnded]);

  // Handle all key presses
  function handleKeyPress(event) {
    const key = event.key;

    // Don't respond if test already ended
    if (testEnded) return;

    // ESC exits the test
    if (key === 'Escape') {
      event.preventDefault();
      exitTest();
      return;
    }

    // Tab + Enter restarts the test
    if (key === 'Enter' && event.getModifierState('Tab')) {
      event.preventDefault();
      restartTest();
      return;
    }

    // Start the test with spacebar
    if (showStartMessage && key === ' ') {
      setTestStarted(true);
      setShowStartMessage(false);
      setStartTime(Date.now());
      return;
    }

    if (!testStarted) return;

    // Backspace removes last typed character
    if (key === 'Backspace') {
      setTypedChars(prev => prev.slice(0, -1));
      setCharIndex(prev => Math.max(0, prev - 1));
      return;
    }

    // Type character
    if (key.length === 1 || key === ' ') {
      setTypedChars(prev => [...prev, key]);
      setCharIndex(prev => prev + 1);
    }

    // Load more words if typed too much
    if (typedChars.length >= Math.floor(allChars.length * 0.8)) {
      const extraWords = getWords(50);
      setWords(prev => [...prev, ...extraWords]);
    }
  }

  // Calculate WPM and accuracy
  async function finishTest() {
    let correctCount = 0;
    for (let i = 0; i < typedChars.length; i++) {
      if (typedChars[i] === fullText[i]) {
        correctCount++;
      }
    }

    const totalTyped = typedChars.length;
    const acc = totalTyped ? Math.round((correctCount / totalTyped) * 100) : 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const calculatedWPM = elapsedMinutes ? Math.round((correctCount / 5) / elapsedMinutes) : 0;

    setWpm(calculatedWPM);
    setAccuracy(acc);
    setTestEnded(true);

    try {
      await fetch('http://localhost:5000/results/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, wpm: calculatedWPM, accuracy: acc })
      });
    } catch (err) {
      console.error('Error saving result:', err);
    }
  }

  // Reset test
  async function restartTest() {
    const newWords = await getWords(200);
    setWords(newWords);
    setTypedChars([]);
    setCharIndex(0);
    setTestStarted(false);
    setTestEnded(false);
    setTimeLeft(testDuration);
    setShowStartMessage(true);
    setWpm(0);
    setAccuracy(0);
    setTimeout(() => containerRef.current?.focus(), 0);
  }

  // Exit test (like reset but doesn’t show results)
  async function exitTest() {
    const newWords = await getWords(200);
    setWords(newWords);
    setTypedChars([]);
    setCharIndex(0);
    setTestStarted(false);
    setTestEnded(false);
    setTimeLeft(testDuration);
    setShowStartMessage(true);
    setTimeout(() => containerRef.current?.focus(), 0);
  }

  return (
    <div
      className="typing-container"
      tabIndex={0}
      ref={containerRef}
      onKeyDown={handleKeyPress}
    >
      <h2>Typing Test</h2>
      <div className="timer-display">{timeLeft}s</div>

      <TypingDisplay chars={allChars} typed={typedChars} pos={charIndex} />

      {showStartMessage ? (
        <>
          <div className="timer-options">
            {[15, 30, 60, 120].map((val) => (
              <button
                key={val}
                className={val === testDuration ? 'selected' : ''}
                onClick={() => {
                  setTestDuration(val);
                  setTimeLeft(val);
                }}
              >
                {val}
              </button>
            ))}
          </div>
          <p><strong>Press spacebar to start</strong></p>
        </>
      ) : (
        <>
          {testEnded && (
            <div className="result-panel">
              <p><strong>WPM:</strong> {wpm}</p>
              <p><strong>Accuracy:</strong> {accuracy}%</p>
            </div>
          )}

          <div className="controls">
            <Link to="/stats" className="stats-button">View Stats</Link>
            <button onClick={restartTest}>Retry</button>
            <button onClick={exitTest}>Exit</button>
            <button onClick={() => window.location.reload()} className="logout-button">Logout</button>
          </div>
        </>
      )}
    </div>
  );
}
