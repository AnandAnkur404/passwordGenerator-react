// import logo from './logo.svg';
import { useCallback, useEffect, useState , useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  // useCallback() we will use useCallback hook that lets us cache the function definition between re-renders
  // It will take a fun and dependency as a argument


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*=-_+(){}[]~`";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPassToClipboard = useCallback( ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText
    (password)
  }, [password])

  // reacts limits the number of renders to prevent an infinite loop we will use useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-500">
        <h1 className="text-white text-center py-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-lg"
            placeholder="Password"
            readOnly
            ref = {passwordRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPassToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="" className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="inputNumber"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="inputNumber" className="text-white">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked = {charAllowed}
            id="inputChar" 
            onChange={(e) => {setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="inputChar" className="text-white">Charecter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
