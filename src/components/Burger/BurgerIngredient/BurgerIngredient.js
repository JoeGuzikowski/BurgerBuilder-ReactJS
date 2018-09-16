import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component{
    render() {
        console.log(this.props);
        let ingredient = null;

        switch(this.props.type) {
            case('bread-bottom'):
                ingredient = <div className={[classes.BreadBottom , this.props.icon ? classes.Icon : null].join(' ')} ></div>;
                break;
            case('bread-top'):
                ingredient = (
                    <div className={[classes.BreadTop , this.props.icon ? classes.Icon : null].join(' ')}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('beef'):
                ingredient = <div className={[classes.Beef , this.props.icon ? classes.Icon : null].join(' ')}></div>;
                break;
            case('cheese'):
                ingredient = <div className={[classes.Cheese, this.props.icon ? classes.Icon : null].join(' ')}></div>;
                break;
            case('lettuce'):
                ingredient = <div className={[classes.Lettuce, this.props.icon ? classes.Icon : null].join(' ')}></div>;
                break;
            case('bacon'):
                ingredient = <div className={[classes.Bacon, this.props.icon ? classes.Icon : null].join(' ')}></div>;
                break;
            default:
                ingredient = null;
        }
        return (ingredient);
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;