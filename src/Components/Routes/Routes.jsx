import { Login,Form,CustomerDetails, Hero } from "../components";
import React  from "react";
import { Routes as Router, Route, useLocation } from 'react-router-dom'
import { Dashboard } from "../../pages/pages";


export default function Routes() {
    return (    
        <div className="">
            <Dashboard />
            <Router>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path='/form' element={<Form />} />
                <Route path='/details' element={<CustomerDetails />} />
            </Router>
        </div>
    )
}