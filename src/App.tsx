import { useLocation } from "react-router-dom";
import Category from "./components/Category";
import Header from "./components/Header";
import Search from "./components/Search";
import Pages from "./pages/Pages";

const App = () => {

  let location = useLocation();

  const pathRecipe = location.pathname.includes("recipe")

  return (
    <div className="App">
      <Header />
      {!pathRecipe && <Search />}
      {!pathRecipe && <Category />}
      <Pages />
    </div>
  );
}

export default App;


