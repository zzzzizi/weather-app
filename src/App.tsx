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
import { SetEmail } from 'pages/setEmail/setEmail';
import { Side } from 'side/side';
//import { FetchData } from './component/fetchdata';

function App() {
  return (
    <div className="app">
      <Bar />
      <div className="app__middle">
        <div className="col-s-3 col-4 col-  side__container">
          <Side />
        </div>
        <div className="col-s-9 col-8 col- routes__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/logged" element={<Logged />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/service" element={<Service />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/setemail" element={<SetEmail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
