export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

/** @param: value to check, @param: rules obj to check value against */
export const checkValidity = ( value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = !(value === "") && isValid;
    }
    if (rules.exactLength) {
        isValid = (value.length === rules.exactLength) && isValid;
    }
    if (rules.isEmail) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules.minLength) {
        isValid = (value.length >= rules.minLength) && isValid;
    }

    return isValid;
}