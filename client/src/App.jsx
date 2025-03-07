import { observer } from 'mobx-react';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useContext, useEffect } from 'react';
import { Context } from './main';


const App = observer(() => {
  const { user } = useContext(Context)

  useEffect(() => {
    const checkAuthAsync = async () => {
      if (localStorage.getItem('token')) {
        await user.checkAuth();  
      }
    };
    checkAuthAsync();
  }, [user]); 

  return (
    <BrowserRouter>
         <NavBar />
         <AppRouter />
    </BrowserRouter>
  )
});

export default App;
