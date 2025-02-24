import $api from '../http/index.jsx';

export default class AdminService {
    static fetchUsers() {
        return $api.get('/admin/users');
    }
    
    static deleteOneUser(email) {
        return $api.delete(`/admin/user/${email}`);
    }
    
}
