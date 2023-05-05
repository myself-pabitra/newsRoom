import './App.css';
import Navbar from './Components/Navbar';
import React, { useEffect, useState } from 'react'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import { FaAngleUp } from 'react-icons/fa';
import './Components/app/ScrollIcon.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = (props) => {
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setprogress] = useState(0)
  const [showTopBtn, setShowTopBtn] = useState(false);


  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
}, []);

const goToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
  });
};

  return (
    <div>
      <Router>
        <Navbar />
        <div className="top-to-btm">
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    className="icon-position icon-style"
                    onClick={goToTop}
                />
            )}{" "}
        </div>
        <LoadingBar
          height={3}
          color='#f00732'
          progress={progress}
        />

        <Routes>
          <Route exact path='/' element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} county="in" category="general" />} />
          <Route exact path='/business' element={<News setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} county="in" category="business" />} />
          <Route exact path='/entertainment' element={<News setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} county="in" category="entertainment" />} />
          <Route exact path='/health' element={<News setprogress={setprogress} apiKey={apiKey} key="health" pageSize={pageSize} county="in" category="health" />} />
          <Route exact path='/science' element={<News setprogress={setprogress} apiKey={apiKey} key="science" pageSize={pageSize} county="in" category="science" />} />
          <Route exact path='/sports' element={<News setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} county="in" category="sports" />} />
          <Route exact path='/technology' element={<News setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} county="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App


