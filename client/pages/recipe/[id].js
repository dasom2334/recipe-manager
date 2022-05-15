import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {recipeReadRequest} from '@/modules/recipe/recipe';
import {View} from "@/components/recipe/View";
import Router, { useRouter } from 'next/router'

const RecipeViewPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    // const windowUrl = window.location.search;
    // const params = new URLSearchParams(windowUrl);
    // console.log(params);
    // params['id']
	useEffect(() => {
		dispatch(recipeReadRequest({id:id}));
	}, [dispatch]);
    const data = useSelector(state =>{
        return state.recipe.data;
    })
    return (<View recipe={data}/>)
}
export default RecipeViewPage