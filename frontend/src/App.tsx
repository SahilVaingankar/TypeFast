import Display from "./components/display/Display";
import Navbar from "./components/navbar/Navbar";
import RunningStateProvider from "./components/RunningStateProvider";
import Login from "./components/Login";

const App = () => {
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
