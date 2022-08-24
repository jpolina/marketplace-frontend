import Ads from '../components/Ads'
import { useNavigate } from 'react-router-dom'
import AdCarousel from '../components/AdCarousel';

const Home = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className='container d-flex welcome-container align-items-center flex-wrap'>
                <div className='my-4 welcome'>
                    <h1 className='welcome-text'>
                        <strong>Welcome to the Marketplace!</strong>
                    </h1>
                    <button className='mt-2 btn btn-primary btn-lg explore' onClick={()=>{navigate('/ads')}}>Explore Ads</button>
                </div>
                <iframe title='Ad Locations' className='map' src="https://charts.mongodb.com/charts-marketplace-omtlt/embed/charts?id=62e2e999-680d-411c-8cad-bdd7def4aad9&maxDataAge=3600&theme=light&autoRefresh=true">

                </iframe>
            </div>
            <AdCarousel />
        </>
    )
}

export default Home