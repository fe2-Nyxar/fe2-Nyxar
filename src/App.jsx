import "./App.css";
import List from "./List Component/List";
import Navbar from "./Navbar Component/navbar";

function App() {
  const classes = "Texts";
  return (
    <>
      <header>
        <Navbar Classes={classes} />
      </header>
      <List Classes={classes} />
    </>
  );
}
export default App;
