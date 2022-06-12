
import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SubscribedPage } from './Pages/SubscribedPage';
import { Followed } from './Pages/Followed';
import { Homepage } from './Pages/Homepage';
function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/subscribed' element={<SubscribedPage/>}/>
      <Route path='/followed' element={<Followed/>}/> 
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
