import React from 'react';
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    const inputTypes = {
        'input': (
            <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.chanched} />
        ),
        'textarea': (
            <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.chanched} />
        ),
        'select': (
            <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.chanched}>
                    {!props.elementConfig.options ? '': props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select >
        )
    }

if (props.elementType in inputTypes) {
    inputElement = inputTypes[props.elementType]
} else {
    inputElement = inputTypes['input']
}

return (
    <label className={classes.InputBlock}>
        <span className={classes.Label}>{props.label}</span>
        {inputElement}
    </label>
)
}

export default input;