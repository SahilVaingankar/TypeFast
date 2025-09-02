import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import TopScores from "./TopScores";

const Screen = ({
  running,
  processing,
  setRunning,
  setIsNavbarOpen,
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
  content,
  loading,
  request,
}: any) => {
  const displayEventRef = useRef<HTMLElement | null>(null);
  const [wrongLetter, setWrongLetter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const getScores = async () => {
      setRunning(false);

      try {
        setRunning(false);
        const username = localStorage.getItem("username");
        const res = await axios.post(
          "https://typefast-production.up.railway.app/display_scores",
          {
            username,
            category: request,
            time: timer,
          }
        );
        setData(res.data);
        setShowModal(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (gameOver) {
      getScores();
      setGameOver(false);
    }
  }, [gameOver]);

  const displayEvent = (e: KeyboardEvent) => {
    e.preventDefault();

    const expectedChar = content[currentIndex];

    const pressedKey = e.key;

    const updatedStatus = [...typedStatus];
    if (pressedKey === "Enter") {
      if (expectedChar === "\n") {
        updatedStatus[currentIndex] = "true";
        setTypedStatus(updatedStatus);
        setCurrentIndex((prev: any) => prev + 2);
      } else {
        setWrongLetter(true);
        setTimeout(() => {
          setWrongLetter(false);
        }, 300);

        const updatedStatus = [...typedStatus];
        updatedStatus[currentIndex] = "false";
        setTypedStatus(updatedStatus);
      }
    }
    if (pressedKey === "Tab") {
      if (expectedChar === "\t") {
        updatedStatus[currentIndex] = "true";
        setTypedStatus(updatedStatus);
        setCurrentIndex((prev: any) => prev + 2);
      } else {
        setWrongLetter(true);
        setTimeout(() => {
          setWrongLetter(false);
        }, 300);

        const updatedStatus = [...typedStatus];
        updatedStatus[currentIndex] = "false";
        setTypedStatus(updatedStatus);
      }
    }
    if (pressedKey === expectedChar) {
      updatedStatus[currentIndex] = "true";
      setTypedStatus(updatedStatus);
      setCurrentIndex((prev: any) => prev + 1);
      if (currentIndex === content.length - 1) {
        setRunning(false);
        setGameOver(true);
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

    if (running && element && !loading) {
      element.addEventListener("keydown", displayEvent);
      element.focus();
    } else if (!running && element) {
      element.blur();
    }

    return () => {
      element?.removeEventListener("keydown", displayEvent);
    };
  }, [currentIndex, typedStatus, running, loading]);

  return (
    <main
      className="bg-blue-50 w-full flex flex-col grow overflow-auto"
      onClick={() => setIsNavbarOpen(false)}
      ref={displayEventRef}
      tabIndex={0}>
      {showModal ? (
        <Modal
          message={
            data.message === "new" ? (
              <div>
                {data?.topScores && <TopScores topScores={data.topScores} />}
                <p className="mt-5 font-semibold leading-5">
                  you competed the challenge your new best time is{" "}
                  <span className="bg-gray-200 whitespace-nowrap">{timer}</span>
                  , your previous best time was{" "}
                  <span className="bg-gray-200 whitespace-nowrap">
                    {data.prevTime}
                  </span>
                  , Press ok to play again keep your hands on the keyboard the
                  game will restart in a second.
                </p>
              </div>
            ) : (
              <div>
                {data?.topScores && <TopScores topScores={data.topScores} />}
                <p className="mt-5 font-semibold leading-5">
                  you competed the challenge in{" "}
                  <span className="bg-gray-200">{timer}</span>, your previous
                  best time was{" "}
                  <span className="bg-gray-200">{data.bestTime}</span>,{" "}
                  <span className="text-green-600">
                    <span className="bg-green-200">Press ok</span> to play
                    again, keep your hands on the keyboard the{" "}
                    <span className="bg-green-200">
                      game will restart in a second
                    </span>
                    .
                  </span>
                </p>
              </div>
            )
          }
          onCancel={() => {
            clearInterval(updateRef.current);

            setTypedStatus([""]);
            setCurrentIndex(0);
            elaspedTime.current = 0;
            setTimer("00 : 00 : 00");
            setRunning(false);
            setProcessing(false);
            setShowModal(false);
          }}
          onAccept={() => {
            setIsNavbarOpen(true);
            clearInterval(updateRef.current);

            setTypedStatus([""]);
            setCurrentIndex(0);
            elaspedTime.current = 0;
            setTimer("00 : 00 : 00");
            setRunning(false);
            setShowModal(false);
            setTimeout(() => {
              startTime.current = Date.now();
              setRunning(true);
            }, 1000);
          }}
        />
      ) : null}
      <p className="font-[16px] p-[5px] text-gray-500 break-words min-h-[450px] w-full select-none">
        {processing ? (
          loading ? (
            <span>Loading...</span>
          ) : (
            content.split("").map((letter: string, i: number) => (
              <code
                key={i}
                className={`
              ${typedStatus[i] === "true" ? "text-green-600 font-bold" : ""}
              ${
                typedStatus[i] === "false" && wrongLetter
                  ? "text-red-600 bg-red-600"
                  : ""
              }
              whitespace-pre-wrap
            `}>
                {letter === "\t" ? "\u00A0\u00A0\u00A0" : letter}
              </code>
            ))
          )
        ) : (
          <span>
            Select the type of text from above and Press Play to generate text.
          </span>
        )}
      </p>
    </main>
  );
};

export default Screen;
