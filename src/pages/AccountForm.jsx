import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios';
import {login, reset, register, logout} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'

const API_URL = '/api/'


const AccountForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        password2:''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {seller} = useSelector((state) => (state.auth))


    const {name, email, phone, password, password2} = formData

    const handleDelete = async () => {
        const token = JSON.parse(localStorage.getItem('seller')).token
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.delete(API_URL+`seller/${seller._id}`, config)
            toast.success(response.data.message)
            toast.success('Account deleted successfully')

            dispatch(logout())
            dispatch(reset())
            setTimeout(()=> {
                window.location.reload()
            }, 2000)
        } catch (err) {
            toast.error(err.response.data.message)

        }
    }

    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(()=>{
      if(!seller) {
          navigate('/login')
      }
      const {name, email, phone, _id, password} = seller
      setFormData((prevState) => ({
        ...prevState,
        ['name']:name, ['email']:email, ['phone']:(phone=='false' ? '' : phone)
    }))

    },[seller,navigate])

    const onSubmit = async (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const sellerData = {
                name, email, phone, password
            }
            const token = await JSON.parse(localStorage.getItem('seller')).token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(seller._id)
            try {
              let response = await axios.put(API_URL+`seller/${seller._id}`, formData, config)
              toast.success(response.data.message)
              const data = {
                email,
                password,
              }
              
              dispatch(login(data))
            } catch (err) {
                toast.error(err.response.data.message)
            }
        }
    }

    return(
        <>
            <section className = "heading">
                <h3 className='my-3'>
                    <FaUser /> Edit your account
                </h3>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" id='name' name='name' value={name} placeholder='Enter your new name' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control my-2" id='email' name='email' value={email} placeholder='Enter your new email' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="tel" className="form-control my-2" id='phone' name='phone' value={phone} placeholder='Enter your new phone number (optional)' onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" id='password' name='password' value={password} placeholder='Enter a new password' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" id='password2' name='password2' value={password2} placeholder='Confirm your new password' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
            <button className='btn btn-danger my-3' onClick={handleDelete}>Delete Account</button>

        </>
    )
}

export default AccountForm