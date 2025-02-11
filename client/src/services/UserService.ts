import $api from '../http/index.js'
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser.js';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse> {
        return $api.get<IUser[]>('/users')
    }


}