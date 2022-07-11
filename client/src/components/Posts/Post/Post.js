import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@material-ui/core'
import { Delete, Edit, ThumbUpAlt } from '@material-ui/icons'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions'
import useStyles from './style'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deletePost(id))
    }

    const handleEdit = (id) => {
        setCurrentId(id)
    }

    const handleLikePost = (id) => {
        dispatch(likePost(id))
    }
    return (
        <>
            {/* <Dialog open={open} onClose={() => setOpen(false)}/> */}
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.creator}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Tooltip title="Edit"><Button onClick={() => handleEdit(post._id)} style={{ color: 'white' }} size="small"><Edit fontSize="small" /></Button></Tooltip>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button onClick={() => handleLikePost(post._id)} size="small" color="primary"><ThumbUpAlt fontSize="small" /> Like {post.likeCount} </Button>
                    <Button size="small" color="primary" onClick={() => handleDelete(post._id)}><Delete fontSize="small" /> Delete</Button>
                </CardActions>
            </Card>
        </>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    setCurrentId: PropTypes.func
}

export default Post