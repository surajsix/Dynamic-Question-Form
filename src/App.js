import React, { Component } from "react";  
import Form from './Form';  
import './App.css'; // Importing styles  

class App extends Component {  
  render() {  
    return (  
      <div className="App">  
        <h1>Dynamic Question Form</h1>  
        <Form />  
      </div>  
    );  
  }  
}  

export default App;