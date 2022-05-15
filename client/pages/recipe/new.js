import React, {useState} from 'react';
import {useDispatch, connect} from 'react-redux';
import {recipeAddRequest} from '@/modules/recipe/recipe';
import {Form} from '@/components/recipe/Form';

const RecipePage = () => {
    const [recipe, setRecipe] = useState({
        recipe_name: '',
        per_person: 0,
        main_image: '',
        cooking_time: '',
        cooking_ingredients: [],
        cooking_seasoning: [],
        cooking_steps: [],
        // materials_video_path: '',
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
        // step_video_path: '',
    }]);
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setRecipe({
            ...recipe,
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const sendRecipe = {
            ...recipe,
            cooking_ingredients: [...ingredient],
            cooking_seasoning: [...seasoning],
            cooking_steps: [...step],
        };
        dispatch(recipeAddRequest(sendRecipe))
    }
    return (<Form onChange={onChange} onSubmit={onSubmit}/>);
};
const mapStateToProps = state => ({isRecipeed: state.recipe.isRecipeed});
const recipeActions = {recipeAddRequest}
export default RecipePage;
// export default connect(mapStateToProps, recipeActions)(RecipePage);