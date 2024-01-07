import React, { useEffect, useState } from 'react';
import './TypingEffect.css'; // Import your CSS file for styling

const TypingEffect = (props) => {
  const [text, setText] = useState('');
  const originalText = props.text;
  const typingSpeed = 70; // Adjust typing speed here

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= originalText.length) {
        setText(originalText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="typing-text">
      {text}
      <span className="typing-cursor" /> {/* This creates the typing cursor effect */}
    </div>
  );
};

export default TypingEffect;
