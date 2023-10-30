import React, { useState, useEffect } from "react";

const Example: React.FC = () => {
  const [buttons, setButtons] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (buttons.length < 10) {
        setButtons((prevButtons) => [...prevButtons, buttons.length + 1]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [buttons]);

  return (
    <nav className="verizon-navbar">
      <ul className="horizontal-buttons">
        {buttons.map((buttonNumber) => (
          <li key={buttonNumber}>
            <button>קטגוריה</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Example;
