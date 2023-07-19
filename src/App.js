import './App.css';
import Weather from './Components/weather';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Weather/>}/>
      </Routes>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
