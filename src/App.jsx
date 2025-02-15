import { useState } from "react";
import GoogleFlightClone from "./pages/GoogleFlightClone";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GoogleFlightClone></GoogleFlightClone>
    </>
  );
}

export default App;
