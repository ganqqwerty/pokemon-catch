import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
    const submitHandler = event => {
        event.preventDefault();
    };
    const [initialName, changeName] = useState('');
    const [initialAmount, changeAmount] = useState('');

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text"
                               id="title"
                               value={initialName}
                               onChange={event => changeName(event.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number"
                               value={initialAmount}
                               onChange={event => changeAmount(event.target.value)}
                               id="amount" />

                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
