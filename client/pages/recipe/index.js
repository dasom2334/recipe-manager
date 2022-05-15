import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {recipeReadRequest} from '@/modules/recipe/recipe';
import {List} from '@/components/recipe/List';
const recipeIndex = ({}) => {
    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(recipeReadRequest({id:null}));
	}, [dispatch]);
	const data = useSelector((state) => {
        // console.log(state);
        return state.recipe.data
    });
    return (
        <> 
        <List list={data}></List>
        </>
    );
};
export default recipeIndex;