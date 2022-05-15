import db from '../models/index.js';
import deepBrainApiService from '../services/deepBrainApiService.js';
import applyToken from '../lambdas/applyToken.js';
import jwt from 'jsonwebtoken'

export default function RedipeService() {
    const User = db.User;
    const Recipe = db.Recipe;
    const generateVideo = async (text, req, res) => {
        const term = 3000;
        let limit = 20;
        let isGenerated = false;
        const deepBrainApi = new deepBrainApiService();
        await deepBrainApi.generateClientToken(req, res);
        await deepBrainApi.setText(text);
        await deepBrainApi.makeVideo(req, res);
        await deepBrainApi.findProject(req, res);
        while (limit) {
            const current = deepBrainApi.getCurrentprogress();
            if (current === 100) {
                isGenerated = true;
                break;
            }
            console.log('current progress: ', current);
            await deepBrainApi.findProject(req, res);
            await new Promise(r => setTimeout(r, term));
            // limit--;
        }
        if (isGenerated) {
            return deepBrainApi.getVideo();
        } else {
            throw new Error('Video not generated.')
        }
    }

    // const patchRecipe() { }
    return {
        async create(req, res) {
            const userid = jwt.verify(applyToken(req.headers), process.env.JWT_SECRET);
            let isErrored = false;
            let matchDocument = {
                userid: userid,
                recipe_name: req.body.recipe_name,
                per_person: req.body.per_person,
                cooking_time: req.body.cooking_time,
                cooking_ingredients: req.body.cooking_ingredients,
                cooking_seasoning: req.body.cooking_seasoning,
                cooking_steps: req.body.cooking_steps,
                status: req.body.status
            };
            const materials_video_text = `
                이번 요리는 ${req
                .body
                .recipe_name}입니다.
                요리 재료는 ${Object
                .entries(req.body.cooking_ingredients)
                .map(e => e.ingredients_name)},
                양념 재료는 ${Object
                .entries(req.body.cooking_seasoning)
                .map(e => e.seasoning_name)} 입니다.
            `;
            let cooking_steps = [];
            let materials_video_path = '';
            console.log(materials_video_text);
            try {
                materials_video_path = await generateVideo(materials_video_text, req, res);

                cooking_steps = await Promise.all(req.body.cooking_steps.map(e => {
                    // const path = generateVideo('테스트디스크립션', req, res);
                    const path = generateVideo(e.step_description, req, res);
                    return path;
                }));
            } catch (e) {
                isErrored = true;
                console.log(e);
            }
            console.log('cooking_steps:', cooking_steps)
            // materials_video_path
            if (!isErrored) {
                matchDocument.cooking_steps = matchDocument
                    .cooking_steps
                    .map((e, i) => {
                        return {
                            ...e,
                            step_video_path: cooking_steps[i]
                        }
                    })
                matchDocument.materials_video_path = materials_video_path;
            } else {
                matchDocument.status = 'ERROR';
            }
            // console.log(req.body);
            // console.log(matchDocument);
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
            });

        },
        getRecipeById(req, res) {
            const {id} = req.params;
            Recipe
                .findById(id)
                .exec((err, recipe) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: err});
                        return;
                    } else {
                        res
                            .status(200)
                            .json(recipe)

                    }
                })
        },
        getRecipes(req, res) {
            const recipes = Recipe
                .find()
                .exec((err, recipes) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: err});
                        return;
                    } else {
                        res
                            .status(200)
                            .json(recipes)

                    }
                });
        },
        async update(req, res) {
            console.log('???')
            const {id} = req.params;

            let recipe = await Recipe
                .findById({_id: id})
                .exec();
            let isErrored = false;
            let matchDocument = {
                ...recipe,
                _id: recipe.id,
                userid:recipe.userid,
                recipe_name: req.body.recipe_name,
                per_person: req.body.per_person,
                cooking_time: req.body.cooking_time,
                cooking_ingredients: req.body.cooking_ingredients,
                cooking_seasoning: req.body.cooking_seasoning,
                cooking_steps: req.body.cooking_steps,
                status: req.body.status
            };
            console.log(recipe)
            let needUpdateMaterial = false;
            let needUpdateSteps = matchDocument.cooking_steps.map((e, i) => {
                return recipe.cooking_steps[i].step_description !== matchDocument.cooking_steps[i].step_description
            }); 
            
            let cooking_steps = [];
            let materials_video_path = '';
            try {
                if (needUpdateMaterial) {
                    const materials_video_text = `
                        이번 요리는 ${req
                        .body
                        .recipe_name}입니다.
                        요리 재료는 ${Object
                        .entries(req.body.cooking_ingredients)
                        .map(e => e.ingredients_name)},
                        양념 재료는 ${Object
                        .entries(req.body.cooking_seasoning)
                        .map(e => e.seasoning_name)} 입니다.
                    `;
                    console.log(materials_video_text);
                    materials_video_path = await generateVideo(materials_video_text, req, res);
                }
                cooking_steps = await Promise.all(req.body.cooking_steps.map((e, i) => {
                    if (needUpdateSteps[i]) {
                        // const path = generateVideo('테스트디스크립션', req, rnpm starses);
                        const path = generateVideo(e.step_description, req, res);
                        return path;
                    } else {
                        return recipe.cooking_steps[i].step_video_path;
                    }
            }));
            } catch (e) {
                isErrored = true;
                console.log(e);
            }
            console.log('cooking_steps:', cooking_steps)
            // materials_video_path
            if (!isErrored) {
                matchDocument.cooking_steps = matchDocument
                    .cooking_steps
                    .map((e, i) => {
                        return {
                            ...e,
                            step_video_path: cooking_steps[i]
                        }
                    })
                matchDocument.materials_video_path = materials_video_path;
            } else {
                matchDocument.status = 'ERROR';
            }
            console.log(req.body);
            console.log(matchDocument);
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
            });
        },
        delete(req, res) {
            console.log('hihi')
            const {id} = req.params;
            Recipe.deleteOne({
                _id: id
            }, (err, recipe) => {
                if (err) {
                    res
                        .status(500)
                        .send({message: err});
                    return;
                } else {
                    res
                        .status(200)
                        .json(recipe)

                }
            })
        }
    }
}