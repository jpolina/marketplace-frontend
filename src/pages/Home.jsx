import Ads from '../components/Ads'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className='container d-flex align-items-center'>
                <div>
                    <h1 className='mx-4'>
                        <strong>Welcome to the Online Marketplace!</strong>
                    </h1>
                    <button className='mx-4 mt-2 btn btn-primary' onClick={()=>{navigate('/ads')}}>Explore Ads</button>
                </div>
                <iframe 
                    title='Ad Locations'
                    style={
                    {background: '#FFFFFF',
                    marginTop:'10px',
                    marginBottom:'10px',
                    marginLeft:'auto',
                    
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)', 
                    width:"40vw", 
                    height:"480px" }
                    }src="https://charts.mongodb.com/charts-marketplace-omtlt/embed/charts?id=62e2e999-680d-411c-8cad-bdd7def4aad9&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                
                
            </div>
            <Ads />
        </>
    )
}

export default Home