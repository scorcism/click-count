import { useState, useEffect } from "react";

function App() {
  const [clicks, setClicks] = useState(0)

  const [count, setCount] = useState({
    count: 0
  })

  useEffect(() => {
    const get = async () => {
      const re = await fetch("https://click-c8c74-default-rtdb.firebaseio.com/count.json")
      const js = await re.json()
      let last = Object.values(js).pop()
      let lastValue = last.count.count
      document.getElementById("count").innerHTML = `${lastValue}`
      setCount({
        count: lastValue
      })
    }
    get()
  }, [count.count])


  const click = async (e) => {
    e.preventDefault();
    count.count = count.count + 1;
    const res = await fetch("https://click-c8c74-default-rtdb.firebaseio.com/count.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count
      })
    })
    console.log("Submitted")
    document.getElementById("count").innerHTML = `${count.count}`
  }

  return (
    <>
      <div className="container">
        <h1>Total Clicks: <span id="count">0</span></h1>
        <button onClick={click} type="submit">Count +1</button>
      </div>
    </>

  );
}

export default App;
