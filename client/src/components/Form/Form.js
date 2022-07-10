import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Paper, TextField, Typography } from "@material-ui/core";

import FileBase from 'react-file-base64'
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions";

const Form = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost(postData))
    };

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setPostData({ ...postData, [name]: value });
    };

    console.log(postData)

    const handleClear = () => {

    }
    return (
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.form} ${classes.root}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">Creating a Memory</Typography>
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
                    onChange={handleOnChange}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        mutiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' type='submit' fullWidth onClick={handleClear}>Clear</Button>
            </form>
        </Paper>
    );
};

Form.propTypes = {};

export default Form;
