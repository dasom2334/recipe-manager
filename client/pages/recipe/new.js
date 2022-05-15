import React, {useState} from 'react';
import {useDispatch, connect} from 'react-redux';
import {recipeRequest} from '@/modules/recipe/recipe';
import {Form} from '@/components/recipe/Form';

const RecipePage = () => {
    const [recipe, setRecipe] = useState({
        userid: '',
        recipe_name: '',
        per_person: 0,
        cooking_time: '',
        cooking_ingredients: [],
        cooking_seasoning: [],
        cooking_steps: [],
        status:''
    })
    
    const [ingredient, setIngredient] = useState([{
        ingredient_name: '',
        ingredient_amount: '',
        ingredient_unit: ''
    }]);
    const [seasoning, setSeasoning] = useState([{
        seasoning_name: '',
        seasoning_amount: 0,
        seasoning_unit: ''
    }]);
    const [step, setStep] = useState([{
        step_description: '',
        step_timer: 0,
        image: '',
        deepbrain_path: '',
    }]);
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(recipeRequest(user))
    }
    return (<Form onChange={onChange} onSubmit={onSubmit}/>);
};
const mapStateToProps = state => ({isRecipeed: state.recipe.isRecipeed});
const recipeActions = {recipeRequest}
export default RecipePage;
// export default connect(mapStateToProps, recipeActions)(RecipePage);