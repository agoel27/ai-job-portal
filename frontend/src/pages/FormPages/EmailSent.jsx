import React, { useState, useEffect } from "react";

function EmailSent() {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("email");
    setStoredValue(item);
  }, []);
  return (
    <div>
      Email sent to {storedValue}. Please check your inbox! It can take a few
      minutes to arrive, or may be in your spam folder.
    </div>
  );
}

export default EmailSent;
