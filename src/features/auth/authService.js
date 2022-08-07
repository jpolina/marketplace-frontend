import axios from 'axios';
import {toast} from 'react-toastify'


const API_URL = '/api/'


// Register seller
const register = async (sellerData) => {
    const response = await axios.post(API_URL+'seller', sellerData)

    if(response.data) {
        localStorage.setItem('seller', JSON.stringify(response.data))
    }
    toast.success(response.data.message)
    return response.data

}

// Login seller
const login = async (sellerData) => {
    const response = await axios.post(API_URL+'login', sellerData)

    if(response.data) {
        localStorage.setItem('seller', JSON.stringify(response.data))
    }
    toast.success(response.data.message)
    // console.log(response.data.message)



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