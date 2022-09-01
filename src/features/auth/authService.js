import axios from 'axios';
import {toast} from 'react-toastify'


// Register seller
const register = async (sellerData) => {
    const response = await axios.post('seller', sellerData)

    if(response.data) {
        localStorage.setItem('seller', JSON.stringify(response.data))
    }
    toast.success(response.data.message)
    return response.data

}

// Login seller
const login = async (sellerData) => {
    const response = await axios.post('login', sellerData)

    if(response.data) {
        localStorage.setItem('seller', JSON.stringify(response.data))
    }
    toast.success(response.data.message)



    return response.data
}

// Logout seller
const logout = () => {
    localStorage.removeItem('seller')
    
}

const authService = {
    register,
    logout,
    login
}

export default authService