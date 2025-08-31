import { useContext } from "react";
import { RunningStateContext } from "../RunningStateProvider";

const Modal = ({ message, onCancel, onAccept }: any) => {
  const context = useContext(RunningStateContext);

  if (!context) {
    throw new Error(
      "RunningStateContext must be used within a RunningStateProvider"
    );
  }

  return (
    <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white w-[60%] flex flex-col p-2 rounded-xl">
        <div>{message}</div>
        <div className="mt-5 flex justify-end gap-2 w-full">
          <button
            className="px-4 py-2 text-white bg-gray-700 rounded-xl"
            onClick={onCancel}>
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-700 rounded-xl"
            onClick={onAccept}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
