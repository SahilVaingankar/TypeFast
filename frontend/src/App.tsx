import { useEffect, useState } from "react";
import Display from "./components/display/Display";
import Navbar from "./components/navbar/Navbar";
import RunningStateProvider from "./components/RunningStateProvider";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  // const [username, setusername] = useState(false);
  // useEffect(() => {
  //   const checkUsername = async () => {
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:5000/handle_login",
  //         {},
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       if (res.data.username) {
  //         setusername(true);
  //       }
  //     } catch {
  //       setusername(false);
  //     }
  //   };
  //   checkUsername();
  // }, []);

  return (
    <div className="h-screen">
      {localStorage.getItem("username") ? (
        <RunningStateProvider>
          <Navbar />
          <Display />
        </RunningStateProvider>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
