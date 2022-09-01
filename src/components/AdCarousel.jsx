import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Button, InputGroup, FloatingLabel, Collapse, Row, Col, Carousel} from 'react-bootstrap'
import {FaSearch, FaFilter} from 'react-icons/fa'
import axios from 'axios'
import Spinner from './Spinner'
import AdCard from './AdCard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


function AdCarousel() {
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=> {
        const getAds = async () => {
            const response = (await axios.get('ads', {params: {'limit':9}}))
            setAds(response.data)
            setLoading(false)            
        }
        getAds();
    }, [])

    return (
        <>
            {loading?(
                <Spinner />
            ):(
            <Carousel variant='dark' className='w-100 carousel p-0'>
                {ads.map((ad, index)=>{
                    if (index%3==0 && index<ads.length-2) return (
                        <Carousel.Item key={index} interval = {10000} style={{placeSelf:'center'}}>
                            <div className="carousel-grid">
                                <AdCard key={ad._id} ad={ad}/>
                                <AdCard key={ads[index+1]._id} ad={ads[index+1]}/>
                                <AdCard key={ads[index+2]._id} ad={ads[index+2]}/>

                            </div>

                        </Carousel.Item>
                    )
                })}
            </Carousel>
            )}
        </>

    );
}

export default AdCarousel;