import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.scss';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            basicData: [
                {text: 'Welcome to your Notes (:', liked: false, id: 1},
                {text: 'These are examples, you can delete them and create your own notes.', liked: false, id: 2},
                {text: 'Your notes will be available only on your device!', liked: false, id: 3},
                {text: 'Your notes are saved as browser cache, please do not delete the cache if you want your notes to be saved and you can see them again!', liked: false, id: 4}
            ],
            data: JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [
                {text: 'Welcome to your Notes (:', liked: false, id: 1},
                {text: 'These are examples, you can delete them and create your own notes.', liked: false, id: 2},
                {text: 'Your notes will be available only on your device!', liked: false, id: 3},
                {text: 'Your notes are saved as browser cache, please do not delete the cache if you want your notes to be saved and you can see them again!', liked: false, id: 4}
            ],
            term: '',
            filter: 'all'
        }

        this.newUser = true;

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.toggleLikeState = this.toggleLikeState.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.setItemsInLocalStorage = this.setItemsInLocalStorage.bind(this);
        this.returnData = this.returnData.bind(this);
    }

    returnData() {
        return JSON.parse(localStorage.getItem('data')) || this.state.basicData
    }

    setItemsInLocalStorage(data) {
        localStorage.setItem('data', JSON.stringify(data));

        this.setState({
            data: JSON.parse(localStorage.getItem('data'))
        });
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    onFilterPost(items, filter) {
        if (filter === 'liked') return items.filter(item => item.liked);
        else return items;
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    searchPost(items, term) {
        if (term.length === 0) return items;

        return items.filter(item => item.text.indexOf(term) > -1);
    }

    toggleLikeState(id) {
        const data = this.returnData();

        const index = data.findIndex(elem => elem.id === id);

        const oldItem = data[index];
        const newItem = {
            ...oldItem,
            liked: !oldItem.liked
        };

        this.setItemsInLocalStorage([...data.slice(0, index), newItem, ...data.slice(index + 1)]);
    }

    deleteItem(id) {
        const data = this.returnData();

        const index = data.findIndex(elem => elem.id === id);

        this.setItemsInLocalStorage([...data.slice(0, index), ...data.slice(index + 1)]);
    }

    addItem(body) {
        const data = this.returnData();

        const newData = {
            text: body,
            liked: false,
            id: new Date()
        }

        this.setItemsInLocalStorage([...data, newData]);
    }

    render() {
        const {data, term, filter} = this.state;

        const allVisiblePosts = this.onFilterPost(this.searchPost(data, term), filter);
        const likedVisiblePosts = allVisiblePosts.filter(item => item.liked).length;
        
        return (
            <div className = "wrapper">
                <div className = "app">
                    <AppHeader
                        posts = {allVisiblePosts.length} 
                        liked = {likedVisiblePosts}
                    />
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                    />
                    <PostList
                        posts = {allVisiblePosts}
                        onDelete = {this.deleteItem}
                        onToggleLikeState = {this.toggleLikeState}
                    />
                    <PostAddForm
                        onAdd = {this.addItem}
                    />
                </div>
            </div>
        )
    }
}