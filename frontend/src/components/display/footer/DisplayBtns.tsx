// import Buttons from "./Buttons";

import axios from "axios";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaRedo,
  FaStop,
} from "react-icons/fa";

const DisplayBtns = ({
  isNavbarOpen,
  setIsNavbarOpen,
  setTimer,
  updateRef,
  startTime,
  elaspedTime,
  running,
  setRunning,
  setProcessing,
  processing,
  setSelectedBtn,
  selectedBtn,
  setClickedBtn,
  setContent,
  id,
  setId,
  setLoading,
  setCurrentIndex,
  setTypedStatus,
  request,
  idIndex,
  setIdIndex,
}: any) => {
  console.log(id);

  const restart = () => {
    clearInterval(updateRef.current);
    elaspedTime.current = 0;
    setTimer("00 : 00 : 00");
    setRunning(false);
    setCurrentIndex(0);
    setTypedStatus([""]);
    // setProcessing(false);
  };

  const stop = () => {
    restart();
    setProcessing(false);
  };

  const pause = () => {
    const article = async () => {
      try {
        const res = await axios.post("http://localhost:5000/handle_request", {
          message: request,
        });
        console.log(selectedBtn);
        console.log(res.data.data.article);
        console.log("request");
        console.log("id:", id);

        setContent(res.data.data.article);
        console.log("setting id");
        console.log("key :", request);
        console.log("id :", res.data.data.id);

        setId((items: { key: string; id: number }[] | []) => [
          ...items,
          { key: request, id: res.data.data.id },
        ]);
        setIdIndex(idIndex + 1);
        console.log(id);

        setLoading(false);
        // console.log("loading turned false");
        // setSelectedBtn("");

        // if (
        //   res?.data &&
        //   Array.isArray(res.data["10 words"]) &&
        //   res.data["10 words"].length > 0
        // ) {
        //   setContent(res.data.data.article);
        //   setId((id: number[] | []) => [...id, res.data.id]);
        //   setLoading(false);
        //   console.log("loading turned false");
        // }

        // const n = res?.data?.["10 words"]?.[0]?.article ?? "Article not found";
      } catch (err) {
        console.error("Request failed:", err);
      }
    };
    setRunning(!running);
    setProcessing(true);

    startTime.current = Date.now() - elaspedTime.current;

    if (!running && !processing) {
      article();
    }
  };

  const forward = () => {
    // if (id.length === 1 && id[0].key === "A-Z") return;

    console.log("id for forwards request", id);
    console.log("request sent for forwards", id[idIndex + 1]);
    console.log("indexId :", idIndex + 1);

    const article = async () => {
      try {
        const requestToSend = id[idIndex + 1] ? id[idIndex + 1] : request;
        const res = await axios.post("http://localhost:5000/handle_request", {
          message: requestToSend,
        });

        if (!id[idIndex + 1]) {
          setId((items: { key: string; id: number }[] | []) => [
            ...items,
            { key: request, id: res.data.data.id },
          ]);
          // setIdIndex(idIndex + 1);
        }

        setContent(res.data.data.article);
        setIdIndex((Index: number) => Index + 1);
        setLoading(false);
        const current = id[idIndex + 1]
          ? id[idIndex + 1].key.slice(-5)
          : request.slice(-5);
        setClickedBtn(current[0].toUpperCase() + current.slice(1));
        setSelectedBtn(current[0].toUpperCase() + current.slice(1));
        console.log("kwy : ", current[0].toUpperCase() + current.slice(1));
      } catch (err) {
        console.error("Request failed:", err);
      }
    };

    setRunning(false);
    setProcessing(true);
    setLoading(true);
    startTime.current = Date.now();
    setTimer("00 : 00 : 00");
    // elaspedTime.current = Date.now();
    // if (!running && !processing) {
    article();
    // }
  };

  const backward = () => {
    console.log("id for backword request", id);
    console.log("request sent for backword", id[idIndex - 1]);
    console.log("indexId :", idIndex - 1);

    const article = async () => {
      try {
        const res = await axios.post("http://localhost:5000/handle_request", {
          message: id[idIndex - 1],
        });
        setContent(res.data.data.article);
        setIdIndex((Index: number) => Index - 1);
        setLoading(false);
        setClickedBtn(id[idIndex - 1].key);
      } catch (err) {
        console.error("Request failed:", err);
      }
    };
    setRunning(false);
    setProcessing(true);
    setLoading(true);
    startTime.current = Date.now();
    setTimer("00 : 00 : 00");
    // elaspedTime.current = Date.now();
    // if (!running && !processing) {
    article();
    // }
  };

  return (
    <footer
      className="bg-blue-700 w-full"
      onClick={() => setIsNavbarOpen(false)}>
      <div className="py-2 flex justify-center items-center gap-0.5 h-full">
        <button
          className="h-11 w-13 bg-gray-400 border-2 border-white mr-10 lg:mr-15 disabled:bg-gray-700 disabled:border-gray-500 disabled:cursor-not-allowed"
          onClick={backward}
          disabled={idIndex <= 0}>
          <FaBackward className="m-auto" />
        </button>
        <button
          className="h-10 w-10 bg-gray-400 border-2 border-white mr-20"
          onClick={restart}>
          <FaRedo className="m-auto" />
        </button>
        <button
          className="absolute h-14 w-14 border-2 border-white rounded-full"
          onClick={pause}>
          {running ? (
            <FaPause className="m-auto text-white h-7 w-7" />
          ) : (
            <FaPlay className="m-auto text-white h-7 w-7 pl-1" />
          )}
        </button>
        <button
          className="h-10 w-10 bg-gray-400 border-2 border-white"
          onClick={stop}>
          <FaStop className="text-red-500 m-auto" />
        </button>
        <button
          className="h-11 w-13 bg-gray-400 border-2 border-white ml-10 lg:ml-15 disabled:bg-gray-700 disabled:border-gray-500 disabled:cursor-not-allowed"
          onClick={forward}
          // disabled={id.length === 1 && id[0].key === "A-Z"}
          disabled={request === "A-Z" && [idIndex + 2] > id.length}>
          <FaForward className="m-auto" />
        </button>
      </div>
    </footer>
  );
};

export default DisplayBtns;
