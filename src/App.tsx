import { Imagery } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Imagery url={"https://picsum.photos/v2/list"} page={1} limit={10} />
      </div>
    </>
  );
}

export default App;
