import Post from './components/Post/Post'
import { useEffect, useState } from 'react'
import { getAllPosts } from './services/posts/getAllPosts'
import Nav from './components/Nav/Nav'
import { Link } from 'react-router-dom'
import PostList from './components/PostList/PostList'

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

    useEffect( () => {
        getAllPosts()
        .then(posts => {
            setPosts(posts)
        })
    }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (!user) {
    return (
      <>
      <Nav/>
      <PostList posts={posts}/>
      </>
    )
  } else {
    return (
      <>
      <Nav/>
      <PostList posts={posts}/>
      <Link to='/posts/create' className='btn btn-info rounded position-fixed bottom-0 end-0 m-4'>Crear posteo</Link>
    </>

    )
  }


  

  
}

export default App
