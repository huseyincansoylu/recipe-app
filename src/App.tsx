import Category from "./components/Category";
import Header from "./components/Header";
import Search from "./components/Search";
import Pages from "./pages/Pages";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Search />
      <Category />
      <Pages />
    </div>
  );
}

export default App;


