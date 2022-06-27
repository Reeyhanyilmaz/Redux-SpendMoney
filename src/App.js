import './App.css';
import Header from './components/Header';
import Items from './components/Items';
import Money from './components/Money';
import Receipt from './components/Receipt';

function App() {
  return (
    <div className="App">
      <Header />
      <Money />
      <Items />
      <Receipt />
    </div>
  );
}

export default App;
