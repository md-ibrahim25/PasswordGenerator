import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {

  const [length, Setlength] = useState(8);
  const [numberAllowed, Setnumber] = useState(false);
  const [CharacterAllowed, Setcharacter] = useState(false);
  const [password, Setpassword] = useState("");
  const generatePassword = useCallback(() => {
    let Str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) Str += "1234567890";
    if (CharacterAllowed) Str += "!@#$%^&*~";
    let pass = "";
    for (let i = 0; i < length; i++) {
      const index = (Math.floor(Math.random() * Str.length + 1));
      pass += Str.charAt(index);

    }
    Setpassword(pass)
  }, [length, numberAllowed, CharacterAllowed, Setpassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, CharacterAllowed])
  const passwordRef = useRef(null);
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    console.log("password copied");
  },[password]);
  return (
    <>
      <div className="container bg-gray-800 text-white  relative top-20 rounded-xl p-4 ">
        <div className='text-white rounded-xl p-3 '>
          <h2 className='text-center text-5xl'>Password Generator</h2>
          <div className='w-11/12 mx-auto'>
            <input type="text" placeholder='generate password' className='w-[20rem] my-4 px-2 py-3 rounded-tl-xl rounded-bl-xl text-center text-black outline-none' value={password} readOnly ref={passwordRef} />
            <button className='bg-blue-600 rounded-tr-xl rounded-br-xl py-3 px-2' onClick={copyPassword}>Copy</button>
          </div>
          <div className='text-orange-500'>
            <input type="range" className='my-1' min={6} max={100} value={length} onChange={(e) => Setlength(e.target.value)} />
            <span className='mx-2'>Length {length}</span>
            <input type="checkbox" id='checkbox1' className='mx-1' onChange={() => { Setnumber((prev) => !prev) }} /><label htmlFor="checkbox1" className='mx-2'>Number</label>
            <input type="checkbox" id='checkbox2' className='mx-1' onChange={() => { Setcharacter((prev) => !prev) }} /><label htmlFor="checkbox2" className='mx-2'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
