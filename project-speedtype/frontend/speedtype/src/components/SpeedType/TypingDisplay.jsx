import { useEffect, useRef } from 'react';

export default function TypingDisplay({ chars, typed, pos }) {
  const currentRef = useRef();

  // Scroll to the current character when it moves
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }, [pos]);

  return (
    <div className="word-box">
      {chars.map((char, i) => {
        let cls = 'char';

        if (i < typed.length) {
          if (typed[i] === char) {
            cls += ' correct';
          } else {
            cls += ' incorrect';
          }
        }

        if (i === pos) {
          cls += ' current';
        }

        return (
          <span
            key={i}
            className={cls}
            ref={i === pos ? currentRef : null}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
