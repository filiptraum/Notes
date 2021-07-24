import React from 'react';

import PostListItem from '../post-list-item/post-list-item';

import './post-list.scss';

const PostList = ({posts, onDelete, onToggleLikeState}) => {
    const elements = posts.map(item => {
        const {id, deleteItem, ...props} = item;

        return (
            <li key = {id}>
                <PostListItem
                    {...props}
                    onDelete = {() => onDelete(id)}
                    onToggleLikeState = {() => onToggleLikeState(id)}
                />
            </li>
        )
    });

    return (
        <ul className="postList">
            {elements}
        </ul>
    )
};

export default PostList;