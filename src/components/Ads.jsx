import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Spinner from './Spinner'
import AdCard from './AdCard'
import '../css/grid.css'


const API_URL = '/api/'


function Ads() {
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        const getAds = async () => {
            const response = (await axios.get(API_URL+'ads'))
            setAds(response.data)
            setLoading(false)
        }
        getAds();
    }, [])
    return (
        <>
            {loading ? (
                <Spinner />
            ):(
                <>
                    <div className='grid'>
                        {ads.map((ad) => {
                        return (
                            <div className=''>
                                <AdCard key={ad._id} ad={ad}/>
                            </div>
                        )
                        })}
                    </div>

                </>
            )}
            
        </>
        
    )
}

export default Ads