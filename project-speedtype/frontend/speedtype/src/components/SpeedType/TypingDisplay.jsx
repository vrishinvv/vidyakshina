import { useEffect } from 'react';

export default function TypingDisplay({ chars, typed, pos, colorBlindMode }) {
  // Scroll to the current character when it moves
  useEffect(() => {
    const currentChar = document.getElementById('current-char');
    if (currentChar) {
      currentChar.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }, [pos]);

  return (
    <div className="word-box">
      {chars.map((char, i) => {
        let cls = 'char';

        if (i < typed.length) {
          const isCorrect = typed[i] === char;
          if (isCorrect) {
            cls += colorBlindMode ? ' cb-correct' : ' correct';
          } else {
            cls += colorBlindMode ? ' cb-incorrect' : ' incorrect';
          }
        }

        if (i === pos) {
          cls += ' current';
        }

        return (
          <span
            key={i}
            className={cls}
            id={i === pos ? 'current-char' : undefined}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
