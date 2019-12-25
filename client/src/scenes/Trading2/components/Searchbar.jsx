import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleTickerSearch } from '../../../actions/graphActions';
import { searchbarWrapper, searchbar, searchbarIcon } from "./../trading.module.css";
import Search from '@material-ui/icons/Search';
import Swal from 'sweetalert2'

class Searchbar extends Component {
    state = {
        value: ''
    }

    static propTypes = {
        handleTickerSearch: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.handleTickerSearch("TSLA");
    }

    onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSearch = () => {

        this.props.handleTickerSearch(this.state.value.toUpperCase())
            .then(() => {
                console.log('graph error msg', this.props.graphErrorMsg)
                if (this.props.graphError) {
                    Swal.fire(
                        'Error!',
                        `Cannot find the ticker, ${this.state.value.toUpperCase()}.`,
                        'error'
                    )
                }
            })
    }

    render() {
        return (
            <div className={searchbarWrapper} onKeyDown={this.onKeyDownHandler}>
                <input name='value' value={this.state.value.toUpperCase()} onChange={this.handleInputChange}
                    className={searchbar} placeholder="Search" ref={(input) => { this.nameInput = input; }}
                />
                <Search className={searchbarIcon} />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    graphError: state.graph.graphError,
    graphErrorMsg: state.graph.graphErrorMsg
});

export default connect(mapStateToProps, { handleTickerSearch })(Searchbar);