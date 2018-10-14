import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDateTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (timeLeft) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeLeft * 1000);
    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        console.log(email + " " + password);
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBL6xeY2aGZd_Mqy_obczG0-mUL4nltjUs';
        if ( !isSignUp ) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBL6xeY2aGZd_Mqy_obczG0-mUL4nltjUs';
        }
        axios.post( url, authData)
            .then(response =>{
                const expirationDateTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDateTime', expirationDateTime);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            }).catch(err => {
                dispatch(authFailed(err.response.data.error));
            })
    }
}

export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expirationDateTime = new Date(localStorage.getItem('expirationDateTime'));
            const userId = localStorage.getItem('userId');

            if (expirationDateTime > new Date() ) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDateTime.getTime() - new Date().getTime()) / 1000 ));
            }
            else {
                dispatch(logout());
            }
        }
    };
};