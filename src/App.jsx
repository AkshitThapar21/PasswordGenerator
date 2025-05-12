import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  
  const [length, setLength] = useState(8)
  const [numallowed, setNumAllowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) {
      str += "0123456789"
    }
    if (charallowed) {
      str += "`~!@#$%^&*()[]{}?"
    } 
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } ,[length, numallowed, charallowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  },[numallowed, length, charallowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-xl py-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 pb-8'>
          <input type="text" ref={passwordRef} value={password} className='outline-none w-full py-3 px-3 rounded-xl' placeholder='Password' readOnly/>
          <button className='px-3 bg-blue-600 rounded-xl text-white outline-none shrink-0 py-0.5' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 pb-5'>
             <input type="range"  min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
             <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 pb-5' >
            <input type="checkbox" defaultChecked = {numallowed} onChange={() => {setNumAllowed((prev) => (!prev))} } id='numberInput'/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 pb-5' >
            <input type="checkbox" defaultChecked = {charallowed} onChange= {() => {setcharallowed((prev) => !prev)}} id='charInput'/>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
  

export default App
