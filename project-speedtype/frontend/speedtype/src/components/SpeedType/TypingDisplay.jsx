import { useEffect, useRef } from 'react';

export default function TypingDisplay({ chars, typed, pos }) {
  const currentRef = useRef();

  // Auto-scroll to current character
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest', inline: 'start' });
  }, [pos]);

  return (
    <div className="word-box">
      {chars.map((char, i) => {
        let cls = 'char';
        if (i < typed.length) {
          cls += typed[i] === char ? ' correct' : ' incorrect';
        } else if (i === pos) {
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
