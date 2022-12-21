import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

import useStyles from './style'
import { getPosts } from '../../actions'

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const classes = useStyles();


    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
}

Paginate.propTypes = {
    page: PropTypes.number
};


export default Paginate