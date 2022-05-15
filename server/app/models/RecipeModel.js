export default function RecipeModel(mongoose) {
    const recipeSchema = mongoose.Schema({
        userid: String,
        recipe_name: String,
        per_person: Number,
        cooking_time: String,
        cooking_ingredients: [
            {
                ingredient_name: String,
                ingredient_amount: String,
                ingredient_unit: String
            }
        ],
        cooking_seasoning: [
            {
                seasoning_name: String,
                seasoning_amount: Number,
                seasoning_unit: String
            }
        ],
        cooking_steps: [
            {
                step_description: String,
                step_timer: Number,
                image: String,
                step_video_path: String,
            }
        ],
        materials_video_path: String,
        status:String
    }, {timestamps: true});
    return mongoose.model("recipe", recipeSchema);
}
