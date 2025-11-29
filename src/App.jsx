import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNUMBERALL] = useState(false);
  const [charAllow, setCharAll] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passref = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*_-+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllow, charAllow]);

  const copypasswordtoclipboard = useCallback(() => {
    passref.current?.select();
    passref.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, PasswordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 p-4">
        <h1 className="text-white text-center text-xl mb-3">
          Password Generator
        </h1>

       
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3"
            placeholder="Password"
            readOnly
            ref={passref}
          />
          <button
            onClick={copypasswordtoclipboard}
            className="outline-none bg-blue-700 text-white px-4 py-2 shrink-0"
          >
            Copy
          </button>
        </div>

       
        <div className="flex flex-col gap-y-3 text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={4}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numbers"
              checked={numberAllow}
              onChange={() => setNUMBERALL((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numbers" className="text-white">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="characters"
              checked={charAllow}
              onChange={() => setCharAll((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="characters" className="text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
