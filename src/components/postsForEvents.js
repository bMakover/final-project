import React, { useContext, useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import ShowPost from './showPost';
import { AppContext } from '../context/context';

const PostsForEvents = ({ id }) => {
    const { getData } = apiService();
    const [allPosts, setAllPosts] = useState([]);
    const { MyLogUser, setMyLogUser } = useContext(AppContext);
    useEffect(() => {
        getAllPost()
    }, [])
    const getAllPost = async () => {
        try {
            if (id && MyLogUser != null) {
                const res = await getData(`events/${id}`)
                console.log(res)
                if (MyLogUser?._id) {
                    res.data = res.data.filter(item => { return (item.idDriver != MyLogUser._id) }
                    )
                }
                setAllPosts(res.data)
            }
            else {
                alert("התחברי תחילה")
            }
        }
        catch (err) {

        }

    }
    return (
        <>
            <div className='container-fluid m-0 p-0  shadow'>
                <h2 className='h2 text-center mt-5'>{allPosts.length>0?<h2>נסיעות לאירוע</h2>:<h2>אין נסיעות לאירוע כרגע</h2>}</h2>
                <div className='d-flex overflow-x-scroll text-color-dark'>
                    {(
                        <div className='buttons-container d-flex'>
                            {allPosts?.map((item) => (
                                <div className=' m-4'>
                                    <ShowPost key={item._id} item={item} show={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>       </>
    )
}

export default PostsForEvents