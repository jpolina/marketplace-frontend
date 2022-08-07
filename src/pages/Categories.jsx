import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Spinner from '../components/Spinner'
const API_URL = '/api/'


function Categories() {
    const [categories, setCategories] = useState([])
    useEffect(()=> {
        const getCategories = async () => {
            const response = await axios.get(API_URL+'categories')
            setCategories(response.data.categories)
        }
        getCategories();
    }, [])
    return (
        <>
        <h3 className='my-2'>Categories</h3>

        {categories.length>0 ? (
            <ul>
                {categories.map((category)=>{
                    return (
                        <li key={category._id}>
                            {category.name}
                        </li>
                    )
                })}
            </ul>
        ): (
            <Spinner />
        )}
        
            

        </>
    )
}

export default Categories