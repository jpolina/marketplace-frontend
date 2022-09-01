import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewAd from './pages/NewAd'
import MyAds from './pages/MyAds'
import Categories from './pages/Categories'
import BrowseAds from './pages/BrowseAds'
import AccountForm from './pages/AccountForm'
import NotFound from './pages/NotFound'
import Category from './pages/Category'
import '../src/css/style.css'


function App() {
  return (
    <>
      <Router>
          <Header />
          <div className='large-container container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/ads' element={<BrowseAds />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/new-ad' element={<NewAd />} />
              <Route path='/my-ads' element={<MyAds />} />
              <Route path='/categories' element={<Categories />}/>
              <Route path='/account-settings' element={<AccountForm />}/>
              <Route path='/category/:id' element={<Category />}/>




              <Route path='*' element={<NotFound />}/>

            </Routes>
          </div>
          <Footer />
        </Router>
      <ToastContainer />
    </>
  );
}

export default App;
