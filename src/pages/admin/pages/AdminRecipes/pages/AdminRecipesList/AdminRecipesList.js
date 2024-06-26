import { useFetchRecipes } from '../../../../../../hooks';
import styles from '../AdminRecipesList/AdminRecipesList.module.scss';
import { deleteRecipe as deleteR } from '../../../../../../api';
import { NavLink } from 'react-router-dom';


function AdminRecipesList() {
  const [[recipes, setRecipes]] = useFetchRecipes();
  async function deleteRecipe(_id) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }
  return (
    <ul className={styles.list}>
      {recipes.length
        ? recipes.map((r) => (
            <li key={r._id} className="d-flex align-items-center">
              <span className="flex-fill">{r.title}</span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-primary mr-15">Editer</button>

              </NavLink>
              <button className="btn btn-danger"  onClick={() => deleteRecipe(r._id)}>Supprimer</button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRecipesList;