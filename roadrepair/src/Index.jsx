import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "tailwindcss/tailwind.css";
import Footerblog from "./components/Footerblog";
import Bannerblog from "./components/Bannerblog";
import Login from "./components/Login";





const App = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <WelcomeSection />
      <Footer />
    </div>
  );
};

export default App;