import React, {Component} from 'react';

import classes from './Logo.css';

import burgerLogo from '../../assets/images/burger-logo.png';

class logo extends Component {
    state = {
        loading: true
    }

    handleImageLoaded = () => {
        this.setState({loading: false});
    }

    render () {
        return (
            <div className={classes.Logo} 
                    style={{
                        transform: this.props.loading ? 'translateX(-100vh)' : 'translateX(0)',
                        visibility: this.state.loading ? 'hidden' : 'visible'
                    }} >
                <img 
                    onLoad={this.handleImageLoaded}
                    src={burgerLogo} alt="MyBurger" 
                    />
            </div>
        );
    }
}

export default logo;