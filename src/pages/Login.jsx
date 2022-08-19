import {useState, useEffect} from 'react'
import {FaSignInAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {FloatingLabel, Form} from 'react-bootstrap'


const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
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
    const onSubmit = (e) => {
        e.preventDefault()

        const sellerData = {
            email,
            password,
        }
        
        dispatch(login(sellerData))
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

    if(isLoading) {
        return <Spinner />
    }


    return(
        <>
            <section className = "heading my-2">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to post ads</p>
                <p>Don't have an account? Register <a href = '/register'>here</a>.</p>

            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <FloatingLabel label="Email address" className="mb-3">
                        <Form.Control type="email" className="form-control my-2" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                    </FloatingLabel>
                    
                    <FloatingLabel label="Password">
                        <Form.Control type="password" className="form-control my-2" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                    </FloatingLabel>

                    <div className="form-group">
                        <button type='submit' className="btn btn-block btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login