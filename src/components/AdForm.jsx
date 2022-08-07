import {useEffect, useState}  from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {FaPlusCircle} from 'react-icons/fa'
import axios from 'axios';
import {Form} from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';

const API_URL = '/api/'

function AdForm(props) {
    const conditions=['Brand new', 'Like new', 'Very good', 'Good', 'Acceptable', 'For parts/Not working'];
    const navigate = useNavigate()
    const[categories, setCategories] = useState([])
    const [locationLoading, setLocationLoading] = useState(false);
    let initialForm = {}
    if(props.ad) {
        initialForm = {
            title:props.ad.title,
            price:props.ad.price/100,
            description:props.ad.description,
            category:props.ad.category.name,
            imageUrl:props.ad.imageUrl,
            condition:props.ad.condition,
            location:props.ad.location,
        }
    } else {
        initialForm = {
            title:'',
            price:'',
            description:'',
            category:'Appliances',
            imageUrl:'',
            condition:'Brand new',
            location:{"type":"Point", "coordinates":[]},
        }
    }
    const [formData, setFormData] = useState(initialForm)
    const {title, price, description, category, imageUrl, condition, location} = formData
    const {seller} = useSelector((state) => (state.auth))
    useEffect(()=>{
        if(!seller) {
            navigate('/login')
        }
    },[seller,navigate])

    useEffect(()=> {
        const fetchData = async () => {
            const response = await axios.get(API_URL+'categories')
            const names = response.data.categories.map((category)=>{
                return category.name;
            })
            setCategories(names)
        }
        fetchData()
    }, [])

    const onChange = (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value,
        })
        if (e.target.name=='price') setFormData({...formData, [e.target.name]:Number(e.target.value)})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = await JSON.parse(localStorage.getItem('seller')).token
        const finalData = await {...formData, ['price']:Math.round(formData['price']*100)}
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            let response;
            if (props.operation) {
                 response = await axios.put(API_URL+`ad/${props.ad._id}`, finalData, config)
            } else response = await axios.post(API_URL+'ad', finalData, config);
            toast.success(response.data.message)
        } catch (err) {
            toast.error(err.response.data.message)
        }
        

    }

    const locationButton = (e) => {

        e.preventDefault();
        setLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position)=>{
                await setFormData({
                    ...formData,
                    location: {"type":"Point", "coordinates":[position.coords.longitude, position.coords.latitude]}
                })
                setLocationLoading(false);

            })
        }
    }

    return(
        <>
            <section className="form" onSubmit={onSubmit}>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title" className>Title </label>

                        <input type="text" className="form-control" id='title' name='title' value={title} placeholder='Enter the title' onChange={onChange} required/>
                    </div>

                    <label htmlFor="price">Price </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" id='price' name='price' value={price} placeholder='Enter the price' onChange={onChange} required/>
                    </div>
                    
                    <div className="form-group my-3">
                    <label htmlFor="description" className>Description </label>
                        <input type="text" className="form-control" id='description' name='description' value={description} placeholder='Enter the description' onChange={onChange} required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="category" className>Category </label>
                        <Form.Select aria-label="Default select example" className='d-inline-block form-inline' value={category} onChange={onChange} id='category' name='category' placeholder='Enter the category' required>
                            {categories.map((category)=>{
                                    return <option value = {category} key={category}>{category}</option>
                                })}
                        </Form.Select>

                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="imageUrl">Image Url </label>
                        <input type="text" className="form-control" id='imageUrl' name='imageUrl' value={imageUrl} placeholder='Enter the image URL' onChange={onChange} required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="condition">Condition </label>
                        <Form.Select aria-label="Default select example" className='d-inline-block form-inline' value={condition} onChange={onChange} id='condition' name='condition' placeholder='Enter the condition' required>
                            {conditions.map((condition)=>{
                                    return <option value = {condition} key={condition}>{condition}</option>
                                })}
                        </Form.Select>
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className='locationButton btn btn-primary' name='locationButton' id='locationButton' onClick={locationButton}>Use my location</button>
                        {locationLoading && (<Spinner />)}
                        {formData.location.coordinates[1] &&
                            <>
                                <p>Latitude: {formData.location.coordinates[1]}</p>
                                <p>Longitude: {formData.location.coordinates[0]}</p>
                            </>
                        }

                    </div>
                    <div className="form-group my-2">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AdForm;