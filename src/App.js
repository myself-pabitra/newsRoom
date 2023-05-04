import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
  pageSize = 15;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<News key="general" pageSize={this.pageSize} county="in" category="general" />} />
            <Route exact path='/business' element={<News key="business" pageSize={this.pageSize} county="in" category="business" />} />
            <Route exact path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} county="in" category="entertainment" />} />
            <Route exact path='/health' element={<News key="health" pageSize={this.pageSize} county="in" category="health" />} />
            <Route exact path='/science' element={<News key="science" pageSize={this.pageSize} county="in" category="science" />} />
            <Route exact path='/sports' element={<News key="sports" pageSize={this.pageSize} county="in" category="sports" />} />
            <Route exact path='/technology' element={<News key="technology" pageSize={this.pageSize} county="in" category="technology" />} />
            key = ""
            {/* business
          entertainment
          general
          health
          science
          sports
          technology */}
          </Routes>
        </Router>
      </div>
    )
  }
}

