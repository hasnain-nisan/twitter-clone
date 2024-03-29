import React, {useState, useEffect} from 'react'
import {HiSparkles} from 'react-icons/hi'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import {db} from "../firbase"
import Input from './Input'
import Post from './Post'


const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(
      () =>
        onSnapshot(
          query(collection(db, "posts"), orderBy("timestamp", "desc")),
          (snapshot) => {
            setPosts(snapshot.docs);
          }
        ),
      [db]
    );

    return (
        <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-10 bg-black border-b border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold capitalize">Home</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
                    <HiSparkles className="h-5 text-white"/>
                </div>
            </div>

            <Input/>

            <div className="pb-72">
                {posts?.length > 0 ? (
                    posts.map(post => {
                        return <Post key={post.id} id={post.id} post={post.data()} />;
                    })
                ) : (
                    "no post available"
                )}
            </div>
        </div>
    )
}

export default Feed
