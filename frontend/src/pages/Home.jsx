import React, { useState, useEffect } from "react";



function Home() {
  const [storedValue, setStoredValue] = useState(null);
  const greeting = storedValue ? `${storedValue}!` : "Somebody";

  useEffect(() => {
    const item = localStorage.getItem("name");
    setStoredValue(item);
  }, []);


  return (
    <div>
      Hello {greeting}
    </div>
  );
}

export default Home;
