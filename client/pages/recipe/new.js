import React, {useState} from 'react';
import {useDispatch, connect} from 'react-redux';
import {recipeAddRequest} from '@/modules/recipe/recipe';
import {Form} from '@/components/recipe/Form';

const RecipePage = () => {
    const [recipe, setRecipe] = useState({
        recipe_name: '',
        per_person: 0,
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

        const elem = name.split('.');

        switch(elem[0]) {
            case 'cooking_ingredient':
                const temp1 = ingredient.slice();
                if (temp1[elem[1]] === undefined) temp1[elem[1]] = {};
                temp1[elem[1]][elem[2]] = value;
                setIngredient(temp1)
                break;
            case 'cooking_seasoning':
                const temp2 = seasoning.slice();
                if (temp2[elem[1]] === undefined) temp2[elem[1]] = {};
                temp2[elem[1]][elem[2]] = value;
                setSeasoning(temp2)
                break;
            case 'cooking_step':
                const temp3 = step.slice();
                if (temp3[elem[1]] === undefined) temp3[elem[1]] = {};
                temp3[elem[1]][elem[2]] = value;
                setStep(temp3)
                break;
            default:
                setRecipe({
                    ...recipe,
                    [name]: value
                })
                break;
        }
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
const mapStateToProps = state => ({});
const recipeActions = {recipeAddRequest}
export default connect(mapStateToProps, recipeActions)(RecipePage);