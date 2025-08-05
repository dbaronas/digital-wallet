import {BrowserRouter} from 'react-router-dom';
import Header from './layouts/Header.tsx';
import Body from './layouts/Body.tsx';
import Footer from './layouts/Footer.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import {Toaster} from 'react-hot-toast';

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster />
                <Header/>
                <Body/>
                <Footer/>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
