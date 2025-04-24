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
// import Paymentcust from '../pages/Paymentcust'
import Paynowpage from '../pages/Paynowpage'
import Productworkpage from '../pages/Productworkpage'
import Insertproductform from '../pages/Insertproductform'
import Serviceguestpage from '../pages/Serviceguestpage'
import Aboutguestpage from '../pages/Aboutguestpage'
import Contactguestpage from '../pages/Contactguestpage'
import Galleryguestpage from '../pages/Galleryguestpage'
import Servicehistguestpage from '../pages/Servicehistguestpage'
import Reviewguestpage from '../pages/Reviewguestpage'
import Workshoplistpage from '../pages/Workshoplistpage'
import Workshopviewpage from '../pages/Workshopviewpage'
import Admincustviewpage from '../pages/Admincustviewpage'
import Findlocationpage from '../pages/Findlocationpage'
import Profilecustpage from '../pages/Profilecustpage'
import Workshopprofileview from '../pages/Workshopprofileview'
import Customerchatpage from '../pages/Customerchatpage'
import Workshopchatpage from '../pages/Workshopchatpage'
import Makepaymentpage from '../pages/Makepaymentpage'
import Workshopreviewpage from '../pages/Workshopreviewpage'
import Workshopviewpie from '../components/workshopviepie'
import WorkshopStatuspie from '../components/workshopstatuspie'
import Customerpiechart from '../components/Customerpiechart'
import Customercartpage from '../pages/Customercartpage'
import Productpurchasepage from '../pages/Productpurchasepage'
// import Workshopreviewpiepage from '../pages/Workshopreviewpiepage'





function Index() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Home/>}/>
    
     
        <Route path='/workshoplist' element={<Workshoplistpage/>}/>   
        <Route path='/About' element={<Aboutpage/>}/>
        <Route path='/Blog' element={<Blogpage/>}/>
        <Route path='/Contact' element={<Contactpage/>}/>
        <Route path='/Gallery' element={<Gallerypage/>}/>
        <Route path='/Services' element={<Servicespage/>}/>
        
        
        <Route path='/admindashboard' element={<Adminpage/>}/>
        <Route path='/adminlogin' element={<AdminLoginPage/>}/>
        <Route path='/workshopview' element={<Workshopviewpage/>}/>
        <Route path='/customerview' element={<Admincustviewpage/>}/>
        <Route path='/workshoppie' element={<Workshopviewpie/>}/>\
        <Route path='/workshopstatuspie' element={<WorkshopStatuspie/>}/>
        <Route path='/custpie' element={<Customerpiechart/>}/>
        {/* <Route path='/workshoprevpie' element={<Workshopreviewpiepage/>}/> */}

   

{/* Workshop       */}

        <Route path='/workhome' element={<Workshoppage/>}/>
        <Route path='/servicework' element={<Serviceworkpage/>}/>
        <Route path='/viewproducts' element={<Productworkpage/>}/>
        <Route path='/products' element={<Insertproductform/>}/>
        
        <Route path='/workshoplogin' element={<Workloginpage/>}/>
        <Route path='/workshopsign' element={<Workshopsignpage/>}/>
        <Route path='/workshopprofile' element={<Workshopprofileview/>}/>
        <Route path='/workshopchat' element={<Workshopchatpage/>}/>
        <Route path='/workshopreview' element={<Workshopreviewpage/>}/>
        <Route path='/customercart' element={<Customercartpage/>}/>

{/* customer */}

        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/service guest' element={<Serviceguestpage/>}/>
        <Route path='/welcomesection' element={<Homepage/>}/>
        <Route path='/About guest' element={<Aboutguestpage/>}/>
        <Route path='/contactguest' element={<Contactguestpage/>}/>
        <Route path='/galleryguest' element={<Galleryguestpage/>}/>
        <Route path='/servicehistguest' element={<Servicehistguestpage/>}/>
        <Route path="/reviewguest/:breakdownId" element={<Reviewguestpage />} />
        <Route path='/signup' element={<SignUpPage/>}/>
        {/* <Route path='/cart' element={<Orderpagecust/>}/> */}
        {/* <Route path='/payment' element={<Paymentcust/>}/> */}
        <Route path='/paynow' element={<Paynowpage/>}/>
        <Route path='/purchase' element={<Purchasepage/>}/>
        <Route path='/findlocation' element={<Findlocationpage/>}/>
        <Route path='/profilecust' element={<Profilecustpage/>}/>
        <Route path='/chat/:breakdownId' element={<Customerchatpage/>}/>
        <Route path='/paymentcust/:id' element={<Makepaymentpage/>}/>
        <Route path='/productpurchase' element={<Productpurchasepage/>}/>

    </Routes>
    </BrowserRouter>
    
  )
}

export default Index