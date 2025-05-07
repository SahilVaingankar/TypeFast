import Display from "./components/display/Display";
import Navbar from "./components/navbar/Navbar";
import RunningStateProvider, {
  RunningStateContext,
} from "./components/RunningStateProvider";

const App = () => {
  return (
    <div className="h-screen">
      <RunningStateProvider>
        <Navbar />
        <Display />
      </RunningStateProvider>
    </div>
  );
};

export default App;
