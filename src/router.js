import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { getRecipe } from './api';


const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const AdminRecipes = lazy(() => import('./pages/admin/pages/AdminRecipes/AdminRecipes'));
const AdminUsers = lazy(() => import('./pages/admin/pages/AdminUsers/AdminUsers'));

const AdminRecipesList = lazy(() => import('./pages/admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList'));
const AdminRecipesForm = lazy(() => import('./pages/admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'recipes',
            element: <AdminRecipes />,
            children: [
              {
                path: 'list',
                element: <AdminRecipesList />,
              },
              {
                path: 'new',
                element: <AdminRecipesForm />,
              },
              {
                path: 'edit/:recipeId',
                element: <AdminRecipesForm />,
                loader:async({params:{recipeId}})=>getRecipe(recipeId),
              },
              {
                index: true,
                loader: async () => redirect('/admin/recipes/list'),
              },
            ],
          },
          {
            path: 'users',
            element: <AdminUsers />,
          },
          {
            index: true,
            loader: async () => redirect('/admin/recipes'),
          },
        ],
      },
    ],
  },
]);