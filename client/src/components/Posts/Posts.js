import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

const Posts = () => {

  const { posts } = useSelector(state => state.posts)

  
  return (
    <>
      <Post />
      <Post />
    </>
  )
}

Posts.propTypes = {}

export default Posts