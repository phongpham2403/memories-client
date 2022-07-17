const { default: mongoose } = require('mongoose')
const brcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


class UserController {
    async signup (req, res) {
        const { firstName, lastName, email, password, confirmPassword } = req.body
        try {
            const existingUser = await User.findOne({ email })
            if (existingUser) return res.status(404).json({message: "User already exist!"})
            if (password !== confirmPassword) return res.status(400).json({message: "Passsword don't match!"})
            const hashedPassword = await brcrypt.hash(password, 12)
            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
            return res.status(200).json({ result, token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Something went wrong'})
        }
    }   
    async signin (req, res) {
        const { email, password } = req.body
        try {
            const existingUser = await User.findOne({ email })
            if (!existingUser) return res.status(404).json({mesage: "User doesn't exist!"})
            const isPasswordCorrect = await brcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials!'})
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
            return res.status(200).json({ result: existingUser, token })
        } catch (error) {
            return res.status(500).json({message: 'Something went wrong'})
        }
    } 
}

module.exports = new UserController