import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthunticateContext from './context/authenticateContext';
import { Claim } from './models';
import routes from './routes';
import NavBar from './shared/navBar';
import configureValidations from './utils/validations';

function App() {

  configureValidations();

  const [claims, setClaims] = useState<Claim[]>([
    {name: 'email', value:'fff@hotmail.com'},
    {name:'role', value: 'admin'}
  ]);

  return (
    <BrowserRouter>
    <AuthunticateContext.Provider value={{claims, update: setClaims}}>
    <NavBar />
   <div className="container">
     <Switch>
     {routes.map(route => 
      (<Route key={route.path} path={route.path} exact={route.exact}>{<route.component />}</Route>))}
     </Switch>
    </div>
    <footer className="bd-footer py-5 mt-5 bg-light">
  <div className="container">
    React Movies {new Date().getFullYear().toString()}
  </div>
</footer>
</AuthunticateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
