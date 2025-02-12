import { useContext, useEffect, useState, useCallback } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';

const App = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  const getUsers = useCallback(async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      setError('Не удалось загрузить пользователей');
      console.log(e);
    }
  }, []);

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>

      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {users.length > 0 ? (
        users.map((user) => <div key={user.email}>{user.email}</div>)
      ) : (
        <div>Нет пользователей</div>
      )}
    </div>
  );
};

export default observer(App);
