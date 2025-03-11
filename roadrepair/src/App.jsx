import React from 'react'
import Index from './routes/Index'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './redux/Counterslice'
// import { login, logout, signup } from './redux/userSlice'

function App() {
  // const count=useSelector((state)=>state.counter.value)
  // const dispatch=useDispatch()
     const customer=useSelector((state)=>state.customer)
     const dispatch=useDispatch()

  return (
    <>
    {/* <h1>{count}</h1>
    <button onClick={()=>{dispatch(increment())}}>incre</button><br/>
    
    <button onClick={()=>{dispatch(decrement())}}>decre</button> */}

{/* <h1>{customer}</h1>
    <button onClick={()=>{dispatch(signup())}}>signup</button><br/>
    
    <button onClick={()=>{dispatch(login())}}>login</button>
    <button onClick={()=>{dispatch(logout())}}>logout</button> */}


    <Index/>
    </>
  )
}

export default App