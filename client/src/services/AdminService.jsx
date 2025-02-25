import $api from '../http/index.jsx';

export default class AdminService {
    static async fetchUsers() {
        return $api.get('/admin/users');
    }

    static async fetchAdmins(role) {
        return $api.get(`/admin/admins/${role}`)
    }
    
    static async deleteOneUser(email) {
        return $api.delete(`/admin/user/${email}`);
    }

    static async createUser(email, password, role) {
        return $api.post('/admin/create-user', { email, password, role})
    }
    
}
