import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './component/landingPage/landing';
import Home from './component/home/home';
import PokemonCreate from './component/pokemonCreated/pokemonCreated';
import Detail from './component/detail/detail';
// import Error404 from './components/Error404/Error404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/create' component={PokemonCreate} />
      <Route exact path='/pokemon/:id' component={Detail} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

