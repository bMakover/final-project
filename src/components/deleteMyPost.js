import React, { useEffect } from 'react'
import { apiService } from '../services/apiService '

const DeleteMyPost = ({ item }) => {
    const { getData, methodAuthData } = apiService()
    useEffect(() => {

    }, [])
    const deletepost = async () => {

        const user = await methodAuthData(`users/myInfo`, {}, 'GET');
        console.log(user)
        user.data.myPosts = user.data.myPosts?.filter(myitem => myitem !== item._id);
        let userId = user.data._id
        delete user.data._id
        delete user.data.__v
        let data = await methodAuthData(`users/updateUserPosts/${userId}`, user.data, "PUT")
        const response = await methodAuthData(`posts/${item._id}`, {}, 'DELETE');
        console.log(response)
        if (response.data.deletedCount == 1)
            alert("הפוסט נמחק בהצלחה!!")
        else{
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }

    return (
        <>
            <button onClick={() => {
                deletepost()
            }}>האם את בטוחה שברצונך למחוק פוסט זה?</button>
        </>
    )
}

export default DeleteMyPost