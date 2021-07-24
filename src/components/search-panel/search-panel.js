import React, {Component} from 'react';

import './search-panel.scss';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.buttons = [
            {filterName: 'all', text: 'all'},
            {filterName: 'liked', text: 'liked'}
        ]

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        const {filter, onFilterSelect} = this.props;

        const buttons = this.buttons.map(({filterName, text}) => {
            const activeClass = filter === filterName ? "_active" : "";

            return (
                <button
                    key = {filterName}
                    type = "button"
                    className = {activeClass}
                    onClick = {() => onFilterSelect(filterName)}
                >{text}</button>
            )
        });

        return (
            <div className = "searchPanel">
                <input
                    type = "text"
                    placeholder = "Searching by posts..."
                    onChange = {this.onUpdateSearch}
                />
                <div className = "searchPanel__btns">
                    {buttons}
                </div>
            </div>
        )
    }
}