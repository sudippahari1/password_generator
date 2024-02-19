import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterallowed, serCharacterAllowed] = useState(false);
  const [characterCount, setCharacterCount] = useState(8);
  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterallowed) str += "!@#$%^&*()_+-=[]{}|;:,.?";
    for (let i = 1; i <= characterCount; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [setPassword, numberAllowed, characterallowed, characterCount]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, characterallowed, characterCount]);

  let passwordRef = useRef(null);
  let copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef?.current?.select();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [password]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-1"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassword}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              value={characterCount}
              className="cursor-pointer"
              onChange={(e) => {
                setCharacterCount(e.target.value);
              }}
            />
            <h1>Count : {characterCount}</h1>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterallowed}
              onChange={() => {
                serCharacterAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
