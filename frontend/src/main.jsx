import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/Login/Login.jsx'
import Signup from './views/Signup/Signup.jsx'
import PostDetail from './views/PostDetail/PostDetail.jsx'
import PostUpdate from './views/PostUpdate/PostUpdate.jsx'
import PostDelete from './views/PostDelete/PostDelete.jsx'
import CreatePost from './views/CreatePost/CreatePost.jsx'
import UserDetail from './views/UserDetail/UserDetail.jsx'
import UpdateUser from './views/UpdateUser/UpdateUser.jsx'
import DeleteUser from './views/DeleteUser/DeleteUser.jsx'
import DeleteComment from './views/DeleteComment/DeleteComment.jsx'
import UpdateComment from './views/UpdateComment/UpdateComment.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/posts/:id",
    element: <PostDetail />,
  },
  {
    path: "/posts/:id/update",
    element: <PostUpdate />,
  },
  {
    path: "/posts/:id/delete",
    element: <PostDelete />,
  },
  {
    path: '/posts/create',
    element: <CreatePost/>
  },
  {
    path: '/user/me',
    element: <UserDetail/>
  },
  {
    path: '/user/me/edit',
    element: <UpdateUser/>
  },
  {
    path: '/user/me/delete',
    element: <DeleteUser/>
  },
  {
    path: '/comments/:id/delete',
    element: <DeleteComment/>
  },
  {
    path: '/comments/:id/edit',
    element: <UpdateComment/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
