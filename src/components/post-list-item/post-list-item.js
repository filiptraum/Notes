import React, {Component} from 'react';

import './post-list-item.scss';

export default class PostListItem extends Component {
    render() {
        const {text, onDelete, liked, onToggleLikeState} = this.props;

        const classNames = liked ? "postList__item _liked" : "postList__item";

        const btnLikeText = liked ? "liked" : "like";

        return (
            <div className = {classNames}>
                <span>{text}</span>
                <div className = "postList__btns">
                    <button onClick = {onToggleLikeState}>{btnLikeText}</button>
                    <button onClick = {onDelete}>delete</button>
                </div>
            </div>
        )
    }
}