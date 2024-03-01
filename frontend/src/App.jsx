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
      <div className='position-fixed bottom-0 end-0 m-4'>
      <Link to='/category/create' className='btn btn-outline-info rounded mx-2'>Crear categoría</Link>
      <Link to='/posts/create' className='btn btn-info rounded mx-2'>Crear posteo</Link>
      </div>
      
    </>

    )
  }


  

  
}

export default App
