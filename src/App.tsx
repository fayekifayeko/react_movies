import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
import NavBar from './shared/navBar';

function App() {

  
 

  return (
    <BrowserRouter>
    <NavBar />
   <div className="container">
     <Switch>
     {routes.map(route => 
      (<Route key={route.path} path={route.path} exact={route.exact}>{<route.component />}</Route>))}
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
