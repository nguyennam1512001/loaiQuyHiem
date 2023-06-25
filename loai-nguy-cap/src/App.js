import { Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './Layout/LoginPage/login'
import ListLuoi from './Pages/GridList';
import ListBang from './Pages/TabularList';
import ThongKe from './Pages/StatisticalChart';
import HomePage from './Layout/HomePage/HomePage';
import { ProtectedRoute } from './Layout/AuthPage/protectedRoute';
import  User from './Pages/UserManager/userManager';
import { Loais } from './Pages/EndangeredSpecies/EndangeredSpecies';
import AddNewSpecies from './Pages/AddNewSpecies/AddNewSpecies';
import UpdateSpecies from './Pages/UpdateSpecies/UpdateSpecies';


function App() {
  return (
    <div>
          <Routes>
            <Route path='/' element={<HomePage/>}>
              <Route path='/' element={<ListLuoi/>}/>
              <Route path='list-bang' element={<ListBang/>}/>
              <Route path='thong-ke' element={<ThongKe/>}/>
            </Route>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/auth' element={<ProtectedRoute/>}>
              <Route path='user' element={<User/>}/>
              <Route path='loai' element={<Loais/>}/>
              <Route path='addnew' element={<AddNewSpecies/>}/>
              <Route path='chi-tiet' element={<UpdateSpecies/>}/>
            </Route>
          </Routes>
    </div>
  );
}


export default App;
