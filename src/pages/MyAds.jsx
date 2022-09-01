import {useEffect, useState}  from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import AdForm from '../components/AdForm'
import {FaPlusCircle} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import axios from 'axios';
import AdCard from '../components/AdCard'

function MyAds() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [ads, setAds] = useState([]);
    const {seller} = useSelector((state) => (state.auth))

    useEffect(()=> {
        if (!seller) {
            navigate('/login')
        }
    }, [seller, navigate])

    useEffect(()=> {
        const getAds = async () => {
            const id = JSON.parse(localStorage.getItem('seller'))._id
            const response = await axios.get(`seller/${id}`)
            const ads = response.data.ads;
            setAds(ads)
            setLoading(false)

        }
        getAds();
    }, [])
    return(
        <>
            <h3 className='my-2'>Your ads</h3>
            {loading ? (
                <Spinner />
            ):(
                <div className='grid'>
                    {ads.map((ad) => {
                    return (
                        <AdCard key={ad._id} ad={ad}/>
                    )
                    })}
                </div>
            )}

            {!loading && ads.length==0? (<>
                <p>You don't have any ads.</p>
                <button className='btn btn-primary'>
                    <Link to='/new-ad' className='text-light text-decoration-none'>
                        <FaPlusCircle /> Post an Ad
                    </Link>
                </button>
                
            </>):(<></>)}

        </>
    )
}

export default MyAds;