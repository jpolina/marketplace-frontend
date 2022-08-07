import Ads from '../components/Ads'

const Home = () => {
    return(
        <>
            <div className='container'>
                <iframe 
                    title='Ad Locations'
                    style={
                    {background: '#FFFFFF',
                    margin:'0 auto',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)', 
                    width:"640px", 
                    height:"480px" }
                    }src="https://charts.mongodb.com/charts-marketplace-omtlt/embed/charts?id=62e2e999-680d-411c-8cad-bdd7def4aad9&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                
                <h3 className='my-2'>Ads</h3>
                <Ads />
            </div>
        </>
    )
}

export default Home