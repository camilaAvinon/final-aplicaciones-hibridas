import React from 'react'
import Nav from '../../components/Nav/Nav'
import CategoryCreate from '../../components/CategoryCreate/CategoryCreate'
import CategoryList from '../../components/CategoryList/CategoryList'

const CreateCategory = () => {

    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token


  return (
    <>
    <Nav/>
    <CategoryCreate token={token}/>
    <CategoryList/>
    </>
  )
}

export default CreateCategory