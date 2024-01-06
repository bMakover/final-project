import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import ShowPost from './showPost'
import { useNavigate } from 'react-router'

const HomePage = () => {
    const { getData } = apiService()
    const [allPosts, setAllPosts] = useState()
    const nav = useNavigate()
    useEffect(() => {
        const getAllPosts = async () => {
            const data = await getData("posts/getAllDisplay", "/", "/")
            setAllPosts(data.data)
        }
        getAllPosts()
    }, [])
    return (
        <div className='container'>
            <div className='d-flex container  flex-wrap justify-content-center  ' >  {
                allPosts?.map(item => {
                    return (

                        <ShowPost key={item._id} item={item} />


                    )
                })
            }       </div>
        </div>
    )
}

export default HomePage