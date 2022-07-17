import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post/Post'
import { CircularProgress, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import useStyles from './style'

const Posts = ({ setCurrentId }) => {

    const { posts, isLoading } = useSelector(state => state.posts)
    const classes = useStyles()

    if (posts?.length === 0) return 'No posts'

    return (
        <>
            {isLoading ? <CircularProgress /> : (
                <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                    {
                        posts?.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                <Post post={post} setCurrentId={setCurrentId}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )}
        </>
    )
}

Posts.propTypes = {
    setCurrentId: PropTypes.func
}

export default Posts