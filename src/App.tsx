import { Bar } from './bar/bar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Registered } from './pages/registered/registered';
import { Logged } from './pages/logged/logged';
import { Weather } from './pages/weather/weather';
import { Service } from './pages/service/service';
import { Setting } from './pages/setting/setting';
//import { FetchData } from './component/fetchdata';

function App() {
  return (
    <div className="App">
      <Bar />
      {/* <FetchData /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="/logged" element={<Logged />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/service" element={<Service />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
