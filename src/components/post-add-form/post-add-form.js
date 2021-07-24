import React, {Component} from 'react';

import './post-add-form.scss';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.createNewPost = this.createNewPost.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    createNewPost(e) {
        e.preventDefault();

        const {text} = this.state;

        if (text.length !== 0) {
            this.props.onAdd(text);

            this.setState({
                text: ''
            });
        }
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <form
                className = "postAddForm"
                onSubmit = {this.createNewPost}>
                <input
                    type = "text"
                    placeholder = "Add new post"
                    onChange = {this.onValueChange}
                    value = {this.state.text}
                />
                <button type = "submit">add</button>
            </form>
        )
    }
}