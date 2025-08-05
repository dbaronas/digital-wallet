import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home.tsx';
import RequireAuth from '../components/RequireAuth.tsx';
import MyBet from '../pages/MyBet.tsx';
import MyBets from '../pages/MyBets.tsx';
import MyTransactions from '../pages/MyTransactions.tsx';
import Login from '../pages/Login.tsx';
import Register from '../pages/Register.tsx';
import Profile from '../pages/Profile.tsx';

function Body() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>

            <Route element={<RequireAuth/>}>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/my-bet/:id" element={<MyBet/>}></Route>
                <Route path="/my-bets" element={<MyBets/>}></Route>
                <Route path="/my-transactions" element={<MyTransactions/>}></Route>
            </Route>
        </Routes>
    );
}

export default Body;