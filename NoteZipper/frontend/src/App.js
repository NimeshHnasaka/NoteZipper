
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Screens/LandingPage/LandingPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginScreen from './Screens/LognPage/LoginScreen';
import RegisterScreen from './Screens/RegisterPage/RegisterScreen';
import PictureUploadPage from './Screens/picPage/picPage';


function App() {
  return (
<>

<Router>

<Header/>

<main>


<Routes> 
<Route path='/' Component={LandingPage} exact/>
<Route path='/login' Component={LoginScreen} exact/>
<Route path='/register' Component={RegisterScreen} exact/>
<Route path='/pic' Component={PictureUploadPage} exact/>
<Route path='/mynotes' Component={()=><MyNotes/>} />
<Route path='/mynotes/:id' Component={()=><MyNotes/>} />
</Routes>




</main>




<Footer/>

</Router>


</>



  );
}

export default App;
