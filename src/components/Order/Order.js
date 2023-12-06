import React from "react";
import classes from "./Order.module.css"

const order = (props) => {
    const ingredients = []

    for (const ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    };

    const ingredientsElements = ingredients.map(ingredient => {
        return (
            <li className={classes.listItem} key={ingredient.name}>
                <span>{ingredient.name} - {ingredient.amount}</span>
            </li>
        )
    })

    return (
        <div className={classes.Order}>
            <div className={classes.Ingredients}>
                <p className={classes.description}>Ingredients:</p>
                <ul className={classes.list}>
                    {ingredientsElements}
                </ul>
            </div>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}

export default order