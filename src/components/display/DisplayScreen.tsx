import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const Screen = ({
  running,
  processing,
  setRunning,
  timer,
  setTimer,
  updateRef,
  startTime,
  setProcessing,
  elaspedTime,
  typedStatus,
  setTypedStatus,
  currentIndex,
  setCurrentIndex,
}: any) => {
  const displayEventRef = useRef<HTMLElement | null>(null);
  const content = "xxxxxxxxxxxxx".split(""); // split into letters
  const [wrongLetter, setWrongLetter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const displayEvent = (e: KeyboardEvent) => {
    const expectedChar = content[currentIndex];
    const pressedKey = e.key;

    if (pressedKey === expectedChar) {
      const updatedStatus = [...typedStatus];
      updatedStatus[currentIndex] = "true";
      setTypedStatus(updatedStatus);
      setCurrentIndex((prev: any) => prev + 1);
      if (currentIndex === content.length - 1) {
        // setRunning(false);
        setRunning(false);
        setShowModal(true);
      }
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
    if (running && element) {
      element.addEventListener("keydown", displayEvent);
      element.focus(); // optional: focus automatically
    } else if (!running && element) {
      element.blur();
    }

    return () => {
      element?.removeEventListener("keydown", displayEvent);
    };
  }, [currentIndex, typedStatus, running]);

  return (
    <main
      className="bg-blue-50 w-full flex flex-col grow overflow-auto"
      ref={displayEventRef}
      tabIndex={0}>
      {showModal ? (
        <Modal
          message={timer}
          onCancel={() => {
            clearInterval(updateRef.current);

            setTypedStatus([""]);
            setCurrentIndex(0);
            elaspedTime.current = 0;
            setTimer("00 : 00 : 00");
            setRunning(false);
            setProcessing(false);
            setShowModal(false);

            // setCurrentIndex(0);
            // setTypedStatus([""]);
            // clearInterval(updateRef.current);
            // elaspedTime.current = 0;
            // setTimer("00 : 00 : 00");
            // setCurrentIndex(0);
            // setTypedStatus([]);

            // setShowModal(false);

            // setProcessing(false);

            // setRunning(false);
          }}
          onAccept={() => {
            clearInterval(updateRef.current);

            setTypedStatus([""]);
            setCurrentIndex(0);
            elaspedTime.current = 0;
            setTimer("00 : 00 : 00");
            setRunning(false);
            setShowModal(false);
          }}
        />
      ) : null}
      <p className="font-[16px] p-[5px] text-gray-500 break-words min-h-[450px] w-full select-none">
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
