import $api from '../http/index.jsx';

export default class AdminService {
    static fetchUsers() {
        return $api.get('/admin/users');
    }
}
