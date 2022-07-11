import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Paper, TextField, Typography } from "@material-ui/core";

import FileBase from 'react-file-base64'
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions";

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch()
    const post  = useSelector(state => currentId ? state.posts.posts.find(post => post._id === currentId) : null)
    const classes = useStyles();
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        handleClear()
    };

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setPostData({ ...postData, [name]: value });
    };

    const handleClear = () => {
        setCurrentId(null)
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        })
    }
    return (
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.form} ${classes.root}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">{currentId ? 'Edit' : 'Creating'} a Memory</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={handleOnChange}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={handleOnChange}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={handleOnChange}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        mutiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' fullWidth onClick={handleClear}>Clear</Button>
            </form>
        </Paper>
    );
};

Form.propTypes = {
    currentId: PropTypes.number,
    setCurrentId: PropTypes.func
};

export default Form;
