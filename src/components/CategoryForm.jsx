import {useEffect, useState}  from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {FaPlusCircle} from 'react-icons/fa'
import axios from 'axios';
import {Form} from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';

const API_URL = '/api/'

function CategoryForm(props) {
    const navigate = useNavigate()
    let initialForm = {}
    if(props.category) {
        initialForm = {
            name:props.category.name,
        }
    } else {
        initialForm = {
            name:''
        }
    }
    const [formData, setFormData] = useState(initialForm)
    const {name} = formData

    const {seller} = useSelector((state) => (state.auth))
    useEffect(()=>{
        if(!seller) {
            navigate('/login')
        }
    },[seller,navigate])

    const onChange = (e) => {
        setFormData({
            name: e.target.value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = await JSON.parse(localStorage.getItem('seller')).token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(formData)
        try {
            let response;
            if (props.operation=='put') {
                 response = await axios.put(API_URL+`ad/${props.category._id}`, formData, config)
            } else response = await axios.post(API_URL+'category', formData, config);
            toast.success(response.data.message)
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.message)
        }
        

    }

    return(
        <>
            <section className="form" onSubmit={onSubmit}>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="name" className='text-muted'>Name </label>

                        <input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter the category name' onChange={onChange} required/>
                    </div>
                    <div className="form-group my-2">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CategoryForm;