import { useSelector } from 'react-redux';
import './App.css'
// import Navbar from './components/Navbar/Navbar'
// import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchGetLogin } from './redux/thunkActions';
import { useAppDispatch } from './redux/hooks';



function App() {
    const {user} = useSelector((state) => state.logSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
  dispatch(fetchGetLogin())
    }, [])

  return (
    <>
      {/* <Navbar user={user}/> */}
            <div>
                <Routes>
                    {/* <Route index element={<Home/>} /> */}
                    <Route path='registration' element={<Registration />}/>

                </Routes>
                
            </div>
    </>
  );
}

export default App;
