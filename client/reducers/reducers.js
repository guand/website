import { combineReducers } from 'redux';
import getRecipes from './recipe_actions/get_recipes.js';
import loadingRecipes from './recipe_actions/loading_recipes.js';
import getPosts from './recipe_actions/get_posts.js';
import loadingPosts from './recipe_actions/loading_posts.js';

const reducers = combineReducers({
  recipes: getRecipes,
  loadRecipes: loadingRecipes,
  posts: getPosts,
  loadPosts: loadingPosts,
});

export default reducers;