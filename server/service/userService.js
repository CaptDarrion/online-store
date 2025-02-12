const { User, Basket } = require("../models/models.js")
const bcrypt = require('bcrypt' )
const uuid = require('uuid');
const mailService = require('./mailService.js')
const TokenService = require('./tokenService.js');
const tokenService = require("./tokenService.js");
const UserDto = require("../dtos/userDto.js");
const { where } = require("sequelize");
const ApiError = require("../error/ApiError");


class UserService {
    async registration (email, password, role) {
        const candidate = await User.findOne({ where: {email} })
        if (candidate) {
            throw ApiError.badRequest(`Користувач із такою поштовою адресою ${email} вже існує`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();
        
        const user = await User.create({email, password: hashPassword, role, activationLink})
        const basket = await Basket.create({userId: user.id})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, role, isActivated
        const tokens = tokenService.generateTokens({...userDto} );
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }

    }

    async activate(activationLink) {
        const user = await User.findOne({where: { activationLink }})
        if (!user) {
            throw ApiError.badRequest('Некоректне посилання активація')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({where: { email }})
        if (!user) {
            throw ApiError.badRequest('Користувача з таким email не знайдено')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Введено неправильний пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unathorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unathorizedError();
        }
        const user = await User.findOne({where: { id: userData.id }})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

}

module.exports = new UserService