import db from '../models/index.js'
export default function RedipeService() {
    const Redipe = db.redipe
    return {
        create(req, res) {
            const matchDocument = {
                userid: req.body.userid,
                recipe_name: req.body.recipe_name,
                per_person: req.body.per_person,
                cooking_time: req.body.cooking_time,
                cooking_ingredients: req.body.cooking_ingredients,
                cooking_seasoning: req.body.cooking_seasoning,
                cooking_steps: req.body.cooking_steps
            };
            new Recipe(matchDocument).save(function (err) {
                if (err) {
                    res
                        .status(500)
                        .send({message: err});
                    return;
                } else {
                    res
                        .status(200)
                        .json({ok: 'ok'})

                }
            })

        },
        getRecipeById(id){
            Recipes
                .findById({_id: ObjectId(id)})
                .exec((_err, recipe) => {
                    return recipe
                })
        },
        getRecipes(limit, page){
            Recipes.find();
            Recipes.exec((_err, recipes) => {
                    return recipes
                })
        },
        update(req, _res) {

        },
        delete(req, _res) {

        },
    }
}