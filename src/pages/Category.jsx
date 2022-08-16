import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
import AdCard from '../components/AdCard';
import CategoryForm from '../components/CategoryForm';
import '../css/grid.css'
import { toast } from 'react-toastify';

const API_URL = '/api/'


function Category() {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState({})
    const [ads, setAds] = useState([])
    const [isSeller, setIsSeller] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate();

    const {seller} = useSelector((state) => (state.auth))
    const handleEdit = () => {
        setIsEditing(true)
    }
    const handleDelete = async () => {
        const token = JSON.parse(localStorage.getItem('seller')).token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.delete(API_URL+`category/${id}`, config)
            toast.success(response.data.message)
            setTimeout(()=>{
                navigate('/categories')
                window.location.reload();
            }, 2000)
        } catch (err) {
            toast.error(err.response.data.error)

        }
    }

    useEffect(()=> {
        const getAds = async () => {
            const response = (await axios.get(API_URL+'category/'+id))
            setAds(response.data.ads)
            setCategory(response.data.category)
            setLoading(false);
        }
        getAds();
        if (seller) setIsSeller(true);
    }, [])
    return (

    <>
        <h3 className='my-3'>{category.name}</h3>

        {loading? (
        <>
            <Spinner />
        </>) :(
        <>
            <div className='grid'>
                {ads.map((ad) => {
                return (
                    <div>
                        <AdCard key={ad._id} ad={ad}/>
                    </div>
                )
                })}
            </div>
        </>)}

        {!loading && ads.length==0? (<h5>This category has no ads.</h5>):(<></>)}
        

        {isSeller? (
        <>
            <button className="btn btn-secondary m-3" onClick={handleEdit}>Edit Category</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Category</button>
        </>) : (<></>)}

        {isEditing? (<>
            <CategoryForm category={category} operation='put'/>
        
        </>) : (<></>)}
    </>
    )
}

export default Category