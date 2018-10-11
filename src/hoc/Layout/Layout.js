import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return (
            <Aux>
                <Toolbar isAuthenticated={this.props.isAuthenticated}
                        showSidebar={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                        isAuthenticated={this.props.isAuthenticated}
                        show={this.state.showSideDrawer} 
                        toggleShow={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    };
};

export default connect( mapStateToProps, null)(layout);