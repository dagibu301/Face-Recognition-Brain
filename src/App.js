import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import 'tachyons';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/* 
      <ImageLinkForm />
      <FaceRecognition /> */}

    </div>
  );
}

export default App;
