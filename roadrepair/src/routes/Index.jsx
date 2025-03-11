import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home1'
import Homepage from '../pages/Homepage'
import Aboutpage from '../pages/Aboutpage'
import Blogpage from '../pages/Blogpage'
import Contactpage from '../pages/Contactpage'
import Gallerypage from '../pages/Gallerypage'
import Servicespage from '../pages/Servicespage'
import Loginpage from '../pages/Loginpage'
import SignUpPage from '../components/Signup'
import Adminpage from '../pages/Adminpage'
import Workshoppage from '../pages/Workshoppage'
import Serviceworkpage from '../pages/Serviceworkpage'
import Purchasepage from '../pages/Purchasepage'
import AdminLoginPage from '../pages/AdminLoginPage'
import Workloginpage from '../pages/Workloginpage'
import Workshopsignpage from '../pages/Workshopsignpage'
// import Orderpagecust from '../pages/Orderpagecust'
import Paymentcust from '../pages/Paymentcust'
import Paynowpage from '../pages/Paynowpage'
import Productworkpage from '../pages/Productworkpage'
import Insertproductform from '../pages/Insertproductform'




function Index() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Home/>}/>
        
        <Route path='/About' element={<Aboutpage/>}/>
        <Route path='/Blog' element={<Blogpage/>}/>
        <Route path='/Contact' element={<Contactpage/>}/>
        <Route path='/Gallery' element={<Gallerypage/>}/>
        <Route path='/Services' element={<Servicespage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/admindashboard' element={<Adminpage/>}/>
        <Route path='/adminlogin' element={<AdminLoginPage/>}/>


        <Route path='/workhome' element={<Workshoppage/>}/>
        <Route path='/servicework' element={<Serviceworkpage/>}/>
        <Route path='/view products' element={<Productworkpage/>}/>
        <Route path='/products' element={<Insertproductform/>}/>
        
        <Route path='/workshoplogin' element={<Workloginpage/>}/>
        <Route path='/workshopsign' element={<Workshopsignpage/>}/>

{/* customer */}
 
        <Route path='/welcomesection' element={<Homepage/>}/>
        {/* <Route path='/cart' element={<Orderpagecust/>}/> */}
        <Route path='/payment' element={<Paymentcust/>}/>
        <Route path='/paynow' element={<Paynowpage/>}/>
        <Route path='/purchase' element={<Purchasepage/>}/>

    </Routes>
    </BrowserRouter>
    
  )
}

export default Index