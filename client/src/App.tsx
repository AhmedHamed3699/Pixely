import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </h1>
    </>
  );
}

export default App;
