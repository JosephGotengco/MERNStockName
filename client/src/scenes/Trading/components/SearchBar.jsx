import React, { Component } from 'react';
import Search from '@material-ui/icons/Search';

import { searchIcon } from '../styles.module.css';

import { handleTickerSearch } from '../../../actions/tradingActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchBar, searchBarContainer } from '../styles.module.css';

class SearchBar extends Component {
    state = {
        value: ''
    }

    static propTypes = {
        handleTickerSearch: PropTypes.func.isRequired
    }

    onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            this.props.handleTickerSearch(this.state.value.toUpperCase());
        }
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSearch = () => {
        this.props.handleTickerSearch(this.state.value.toUpperCase());
    }

    render() {
        return (
            <div className={searchBarContainer} onKeyDown={this.onKeyDownHandler}>
                <input name='value' value={this.state.value} onChange={this.handleInputChange} placeholder="TSLA" className={searchBar}></input>
                <Search className={searchIcon + " position-absolute"} onClick={this.onSearch} />
            </div>
        );
    }
}

export default connect(null, { handleTickerSearch })(SearchBar);