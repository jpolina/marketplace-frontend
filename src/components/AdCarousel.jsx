import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Button, InputGroup, FloatingLabel, Collapse, Row, Col, Carousel} from 'react-bootstrap'
import {FaSearch, FaFilter} from 'react-icons/fa'
import axios from 'axios'
import Spinner from './Spinner'
import AdCard from './AdCard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const API_URL = '/api/'


function AdCarousel() {
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=> {
        const getAds = async () => {
            const response = (await axios.get(API_URL+'ads', {params: {'limit':9}}))
            setAds(response.data)
            setLoading(false)
            console.log(ads[0])
            
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
                    if (index%3==0 && index<ads.length) return (
                        <Carousel.Item interval = {10000} style={{placeSelf:'center'}}>
                            <div className="carousel-grid">
                                <AdCard key = {ad._id} ad={ad}/>
                                <AdCard key = {ad._id} ad={ads[index+1]}/>
                                <AdCard key = {ad._id} ad={ads[index+2]}/>

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