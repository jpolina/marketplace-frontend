import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import CategoryForm from '../components/CategoryForm'
import { toast } from 'react-toastify';

import axios from 'axios'
import Spinner from '../components/Spinner'

function Categories() {
    const [categories, setCategories] = useState([])
    const [isSeller, setIsSeller] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    
    const {seller} = useSelector((state) => (state.auth))

    useEffect(()=> {
        const getCategories = async () => {
            const response = await axios.get('categories')
            setCategories(response.data.categories)
            setLoading(false)
        }
        getCategories();
        if(seller) setIsSeller(true)

    }, [])
    return (
        <>
        <h3 className='my-2'>Categories</h3>

        {!loading ? (

            <>
                <div className='d-flex w-100 flex-wrap'>
                    {categories.map((category)=>{
                        return (
                            <div key={category._id} style={{cursor:"pointer"}} className='m-2 bg-light rounded shadow-sm p-3' name={category._id} onClick={()=>{navigate(`/category/${category._id}`)}}>
                                {category.name}
                            </div>
                        )
                    })}
                    
                </div>
            </>

            
        ): (
            <Spinner />
        )}
        
        {isSeller? (
            <div className='bg-light mt-4 rounded shadow-sm p-3'>

                <h4 className='m-1'>Make a new Category</h4>
                <CategoryForm />
            </div>
        ) : (
            <></>
        )}

        </>
    )
}

export default Categories