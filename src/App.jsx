import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./Components/SearchForm";
import ResultsPage from "./Components/ResultsPage"; 
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Chatbot from './Components/Chatbot';

import { withAuthenticationRequired } from '@auth0/auth0-react';


const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
          
        <Route path="/search" element={<ProtectedRoute component={SearchForm} />} />
          
         
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/chatbot" element={<Chatbot/>}/>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
