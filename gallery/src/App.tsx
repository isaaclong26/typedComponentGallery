import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrimaryButton from './components/button';

function App() {
  return (
    <div className="App">
     <PrimaryButton  fullWidth={false} onClick={()=> {console.log('PrimaryButton')}}>Click Me Right now</PrimaryButton>
    </div>
  );
}

export default App;
