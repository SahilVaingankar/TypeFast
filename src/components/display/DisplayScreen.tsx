import { useEffect, useRef, useState } from "react";

const Screen = ({ running, processing }: any) => {
  const displayEventRef = useRef<HTMLElement | null>(null);
  const content = "xxxxxxxxxxxxx".split(""); // split into letters
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedStatus, setTypedStatus] = useState<string[]>(
    Array(content.length).fill(false)
  );
  const [wrongLetter, setWrongLetter] = useState(false);

  const displayEvent = (e: KeyboardEvent) => {
    const expectedChar = content[currentIndex];
    const pressedKey = e.key;

    if (pressedKey === expectedChar) {
      const updatedStatus = [...typedStatus];
      updatedStatus[currentIndex] = "true";
      setTypedStatus(updatedStatus);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setWrongLetter(true);
      setTimeout(() => {
        setWrongLetter(false);
      }, 300);

      const updatedStatus = [...typedStatus];
      updatedStatus[currentIndex] = "false";
      setTypedStatus(updatedStatus);
    }
  };

  useEffect(() => {
    const element = displayEventRef.current;
    if (element) {
      element.addEventListener("keydown", displayEvent);
      element.focus(); // optional: focus automatically
    }

    return () => {
      element?.removeEventListener("keydown", displayEvent);
    };
  }, [currentIndex, typedStatus]);

  return (
    <main
      className="bg-blue-50 w-full flex flex-col grow overflow-auto"
      ref={displayEventRef}
      tabIndex={0}>
      <p className="font-[16px] p-[5px] text-gray-500 break-words min-h-[465px] w-full select-none">
        {processing ? (
          content.map((letter, i) => (
            <span
              key={i}
              className={`
              ${typedStatus[i] === "true" ? "text-green-600 font-bold" : ""}
              ${
                typedStatus[i] === "false" && wrongLetter
                  ? "text-red-600 bg-red-600"
                  : ""
              }
            `}>
              {letter}
            </span>
          ))
        ) : (
          <span>Press Play To Start</span>
        )}
      </p>
    </main>
  );
};

export default Screen;
