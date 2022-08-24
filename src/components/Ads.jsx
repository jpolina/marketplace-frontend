import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Button, InputGroup, FloatingLabel, Collapse, Row, Col} from 'react-bootstrap'
import {FaSearch, FaFilter} from 'react-icons/fa'
import axios from 'axios'
import Spinner from './Spinner'
import AdCard from './AdCard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const API_URL = '/api/'

function Ads() {
    const navigate = useNavigate();
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const[categories, setCategories] = useState([])
    const conditions=['Any Condition', 'Brand new', 'Like new', 'Very good', 'Good', 'Acceptable', 'For parts/Not working'];
    const [formData, setFormData] = useState({
        keyword: '',
        category: 'Any Category',        
        condition: 'Any Condition',
        location: '',
        distance: 25,
        minPrice: '',
        maxPrice: ''
    })
    const {keyword, price, category, condition, location, distance, minPrice, maxPrice} = formData


    const onChange = (e) => {
        setFormData({...formData,
            [e.target.name]:e.target.value
        })
        if (e.target.name=='minPrice'||e.target.name=='maxPrice') setFormData({...formData, [e.target.name]:Number(e.target.value)});
    }

    useEffect(()=> {
        const getAds = async () => {
            const response = (await axios.get(API_URL+'ads', {'params':{'limit':20}}))
            setAds(response.data)
            setLoading(false)
        }
        getAds();

        const fetchData = async () => {
            try{
                const response = await axios.get(API_URL+'categories')
                const names = response.data.categories.map((category)=>{
                    return category.name;
                })
                names.unshift('Any Category')
                setCategories(names)
            } catch (e) {
                toast.error(e.message)
            }
        }
        fetchData()
    }, [])

    const search = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await axios.post(API_URL+'ads/search', formData)
            setAds(response.data)
            setLoading(false)
        } catch (e) {
            toast.error(e.message)
        }
        
    }

    const reset = () => {
        setFormData({
            ...formData,
            category: 'Any Category',        
            condition: 'Any Condition',
            location: '',
            distance: 25,
            minPrice: '',
            maxPrice: ''
        })
    }

    return (
        <>
            <Form className="d-flex">
                <InputGroup className="">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <FloatingLabel label="Search">
                        <Form.Control type="text" className="form-control" id='keyword' name='keyword' value={keyword} placeholder='Search Bar' onChange={onChange} required />
                    </FloatingLabel>
                </InputGroup>
                <Button variant="outline-success" className='ms-2' type='submit' onClick={search}>Search</Button>
            </Form>

            <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} className='my-2'> <FaFilter /> Filters</Button>
            <Collapse in={open}>
                <Form>
                    <div id="example-collapse-text" className='bg-light p-3 rounded shadow-sm'>
                        <FloatingLabel label="Category" className='mb-3'>
                            <Form.Select aria-label="Select category" value={category} onChange={onChange} id='category' name='category'>
                                {categories.map((category)=>{
                                    return <option value = {category} key={category}>{category}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Condition" className='mb-3'>
                            <Form.Select aria-label="Default select example" className='d-inline-block form-inline' value={condition} onChange={onChange} id='condition' name='condition' placeholder='Enter the condition' required>
                                {conditions.map((condition)=>{
                                    return <option value = {condition} key={condition}>{condition}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel label="Location" className="mb-3">
                            <Form.Control type="text" className="form-control" id='location' name='location' value={location} placeholder='Enter the address' onChange={onChange}/>
                        </FloatingLabel>

                        <Form.Group as={Row} className='bg-white my-3 mx-0 border rounded pt-3 pb-2 pe-4'>
                            <Col className='col-lg-2'>
                                <Form.Label>Max distance: {distance} km</Form.Label>
                            </Col>
                            
                            <Col className='md-auto'>
                                <Form.Range
                                    value={distance} id='distance' name='distance'
                                    onChange={onChange}
                                />
                            </Col>
                            
                        </Form.Group>


                        <Row>
                            <Col xs={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FloatingLabel label="Minimum Price">
                                        <Form.Control type="number" className="form-control" id="minPrice" name="minPrice" placeholder="minPrice" value={minPrice} onChange={onChange}/>
                                    </FloatingLabel>
                                </InputGroup>
                            </Col>
                            <Col xs={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FloatingLabel label="Maximum Price">
                                        <Form.Control type="number" className="form-control" id="maxPrice" name="maxPrice" placeholder="maxPrice" value={maxPrice} onChange={onChange}/>
                                    </FloatingLabel>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Button variant="outline-success" className='ms-auto' type='submit' onClick={search}>Apply Filters</Button>
                        <Button variant="outline-danger" className='ms-3' type='submit' onClick={reset}>Reset Filters</Button>

                    </div>
                </Form>
            </Collapse>


            {loading ? (
                <Spinner />
            ):(
                <>
                    <div className='grid'>
                        {ads.map((ad) => {
                            return (
                                <AdCard key={ad._id} ad={ad}/>
                            )
                        })}
                    </div>

                </>
            )}

            {!loading && ads.length==0?(
                <div>Your search did not match any ads.</div>
            ):(<></>)}
            
        </>
        
    )
}

export default Ads