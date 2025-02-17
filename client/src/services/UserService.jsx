import $api from '../http/index.jsx';

export default class UserService {
    static fetchUsers() {
        return $api.get('/users');
    }
}
