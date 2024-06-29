import './App.css';
import React,{Component} from 'react'
import NavBar from './components/NavBar.js'
import News from './components/News.js';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  pageSize=5
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  // apiKey='d0c3f0d7f84a47c580d1dcb4e889bac9'
  apiKey=process.env.REACT_APP_NEWS_API
 render(){
  return(
    <div>
      <Router>
      <NavBar/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="home" pageSize={this.pageSize} country='us' category='general' apiKey={this.apiKey}/>}/>          
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country='us' category='business' apiKey={this.apiKey}/>}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country='us' category='entertainment' apiKey={this.apiKey}/>}/>
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country='us' category='general' apiKey={this.apiKey}/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country='us' category='health' apiKey={this.apiKey}/>}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country='us' category='science' apiKey={this.apiKey}/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country='us' category='sports' apiKey={this.apiKey}/>}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country='us' category='technology' apiKey={this.apiKey}/>}/>
        </Routes>
     </Router>
    </div>
  )
}
}
