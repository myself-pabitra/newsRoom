import './App.css';
import Navbar from './Components/Navbar';
import React, { Component,useEffect ,useState} from 'react'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
// import { FaAngleUp } from 'react-icons/fa';
import './Components/app/ScrollIcon.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height = {3}
            color='#f00732'
            progress={this.state.progress}
          />

 <Routes>
            <Route exact path='/' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="general" pageSize={this.pageSize} county="in" category="general" />} />
            <Route exact path='/business' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="business" pageSize={this.pageSize} county="in" category="business" />} />
            <Route exact path='/entertainment' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="entertainment" pageSize={this.pageSize} county="in" category="entertainment" />} />
            <Route exact path='/health' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="health" pageSize={this.pageSize} county="in" category="health" />} />
            <Route exact path='/science' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="science" pageSize={this.pageSize} county="in" category="science" />} />
            <Route exact path='/sports' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="sports" pageSize={this.pageSize} county="in" category="sports" />} />
            <Route exact path='/technology' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}   key="technology" pageSize={this.pageSize} county="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

