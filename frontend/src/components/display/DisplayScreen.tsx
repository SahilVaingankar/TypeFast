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
  // const content = "xxxxxxxxxxxxx".split("");
  const [wrongLetter, setWrongLetter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const getScores = async () => {
      setRunning(false);
      console.log(timer);

      try {
        setRunning(false);
        const username = localStorage.getItem("username");
        console.log("sent to Server : ", timer);
        const res = await axios.post("http://localhost:5000/display_scores", {
          username,
          category: request,
          time: timer,
        });
        console.log(res.data);
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

    // return () => {
    //   setGameOver(false);
    // };
  }, [gameOver]);

  // const [showModal, setShowModal] = useState(false);

  // console.log(content.split(""));
  // console.log(running);

  const displayEvent = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log("listning");

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
        setGameOver(true);

        // setShowModal(true);
      }
    } else {
      setWrongLetter(true);
      setTimeout(() => {
        setWrongLetter(false);
      }, 300);

      const updatedStatus = [...typedStatus];
      updatedStatus[currentIndex] = "false";
      setTypedStatus(updatedStatus);
      // setGameOver(true);
    }
  };

  useEffect(() => {
    const element = displayEventRef.current;
    console.log(element);

    if (running && element) {
      console.log("listning");

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
      onClick={() => setIsNavbarOpen(false)}
      ref={displayEventRef}
      tabIndex={0}>
      {showModal ? (
        <Modal
          message={
            data.message === "new" ? (
              <div>
                {data?.topScores && <TopScores topScores={data.topScores} />}
                <p className="mt-5">
                  you competed the challenge your new best time is {timer}, your
                  previous best time was {data.prevTime}
                </p>
              </div>
            ) : (
              <div>
                {data?.topScores && <TopScores topScores={data.topScores} />}
                <p className="mt-5 font-semibold leading-5">
                  you competed the challenge in{" "}
                  <span className="bg-gray-200">{timer}</span>, your previous
                  best time was{" "}
                  <span className="bg-gray-200">{data.bestTime}</span>
                </p>
              </div>

              // `you competed the challenge your new best time is ${timer}, your previous best time was  ${data.prevTime}`
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
            setIsNavbarOpen(true);
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
          loading ? (
            <span>Loading...</span>
          ) : (
            content.split("").map((letter: string, i: number) => (
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
