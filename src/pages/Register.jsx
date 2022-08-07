import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        password2:''
    })

    const {name, email, phone, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {seller, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(()=>{
        if(isError) {
            toast.error(message)

        }

        if(isSuccess || seller) {
            navigate('/')
        }

        dispatch(reset())
    }, [seller, isError, isSuccess, message, navigate, message, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const sellerData = {
                name, email, phone, password
            }
            dispatch(register(sellerData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return(
        <>
            <section className = "heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control my-2" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="tel" className="form-control my-2" id='phone' name='phone' value={phone} placeholder='Enter your phone number (optional)' onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" id='password' name='password' value={password} placeholder='Enter a password' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control my-2" id='password2' name='password2' value={password2} placeholder='Confirm your password' onChange={onChange} required/>
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register