import {useEffect, useState}  from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import AdForm from '../components/AdForm'
import {FaPlusCircle} from 'react-icons/fa'
import axios from 'axios';
const API_URL = '/api/'

function NewAd() {

    return(
        <>
            <h3 className="my-2">Post an Ad</h3>
            <AdForm />
        </>
    )
}

export default NewAd;