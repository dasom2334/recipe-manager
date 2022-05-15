// beforeAll(() => console.log('1 - beforeAll')); afterAll(() => console.log('1
// - afterAll')); beforeEach(() => console.log('1 - beforeEach')); afterEach(()
// => console.log('1 - afterEach')); test('', () => console.log('1 - test'));
import assert from 'assert';
import dotenv from 'dotenv';
import db from '../mongoosHelper.js';
// import db from '../../app/models/index.js';
import getDatabase from '../../app/lambdas/getDatabase.js';
import getResponse from '../../app/lambdas/getResponse.js';
// import recipeService from '../../app/service/recipeService.js';

const Recipe = await db.Recipe;
const dbo = getDatabase();
const dbConnect = dbo.getDb();

const data = {
    userid: 1,
    recipe_name: 'test_recipe',
    per_person: 1,
    cooking_time: 10000,
    cooking_ingredients: [
        {
            ingredient_name: 'ing1',
            ingredient_amount: 1,
            ingredient_unit: 'das'
        }, {
            ingredient_name: 'ing2',
            ingredient_amount: 3,
            ingredient_unit: 'box'
        }
    ],
    cooking_seasoning: [
        {
            seasoning_name: 'salt',
            seasoning_amount: 5,
            seasoning_unit: 'T'
        }
    ],
    cooking_steps: [
        {
            step_description: 'put salt',
            step_timer: 1000,
            image: '/path',
            deepbrain_path: 'http://path'
        }
    ]
};
beforeEach((done) => {
    db
        .mongoose
        .connection
        .collections
        .recipes
        .drop(() => {
            done();
        });

});
describe('recipeService', async () => {
    it('create', async () => {
        // given
        // when
        const newRecipe = await new Recipe(data).save();
        const rid = newRecipe._id;
        // then
        const finedRecipe = await Recipe.findOne({_id: newRecipe._id});
        assert.deepEqual(finedRecipe._id, newRecipe._id);
        assert.equal(newRecipe.userid, data.userid);
        assert.equal(
            newRecipe.cooking_seasoning[0].seasoning_name,
            data.cooking_seasoning[0].seasoning_name
        );

    });
    test('getRecipeById', () => {
        // given
        // when
        // then

    });
    //test('getRecipes', ()
    // => {      given when then }); test('update', () => {      given when then });
    // test('delete', () => {      given when then });
    
        // given 
        // when 
        // then
});