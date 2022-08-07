import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
import AdCard from '../components/AdCard';
import '../css/grid.css'
const API_URL = '/api/'


function Category() {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState({})
    const [ads, setAds] = useState([])
    const [isSeller, setIsSeller] = useState(false)

    const {seller} = useSelector((state) => (state.auth))
    const handleEdit = () => {
        console.log('edit!!')
    }
    const handleDelete = () => {
        console.log('delete!!')
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
        {loading? (
        <>
            <Spinner />
        </>) :(<></>)}

        <>
            <h3 className='my-3'>{category.name}</h3>
            <div className='grid'>
                {ads.map((ad) => {
                return (
                    <div>
                        <AdCard key={ad._id} ad={ad}/>
                    </div>
                )
                })}
            </div>
        </>
        {isSeller? (
        <>
            <button className="btn btn-secondary m-3" onClick={handleEdit}>Edit Category</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Category</button>
        </>) : (<></>)}
    </>
    )
}

export default Category