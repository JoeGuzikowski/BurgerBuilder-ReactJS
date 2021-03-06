import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../utility/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    isBuilding: false
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    beef: 1.3,
    bacon: 0.7
};
 /* returns true if anything is in ingredients */
 const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
                .map(ingrKey => {
                    return ingredients[ingrKey];
                })
                .reduce((sum, el)=> {
                    return sum + el;
                } ,0);
    return sum > 0;
}

const addIngredient = ( state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        isBuilding: true
    }
    return updateObject( state, updatedState);
}

const removeIngredient = ( state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        isBuilding: updatePurchaseState(updatedIngredients)
    }
    return updateObject( state, updatedState);
}

const setIngredients = ( state, action) => {
    return updateObject(state, {
        ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            beef: action.ingredients.beef
        },
        totalPrice: 4,
        error: false,
        isBuilding: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients( state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;