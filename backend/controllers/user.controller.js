import { User } from "../models/user.model.js"

export default class userController {
  async createNewUser(req, res, next) {
    const user = req.body
    try {
      await User.create(user)

      // console.log(req.body);
      res.json({
        message: "New users created successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.find()
      res.json({
        success: true,
        message: "List of all Users",
        users,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUser(req, res, next) {
    const { id } = req.query
    // console.log(id);
    try {
      const user = await User.findById(id)
      res.json({
        message: "single user called",
        user,
      })
    } catch (error) {
      next(error)
    }
  }

  async getMe(req, res, next) {
    const id = req.user.id
    console.log(id)
    try {
      const user = await User.findById(id)
      res.json({
        user,
        success: true,
      })
    } catch (error) {
      next(new Error(error))
    }
  }

  async updateUser(req, res, next) {
    const body = req.body
    const { id } = req.query
    try {
      const user = await User.findByIdAndUpdate(id, body)
      res.json({
        message: "Updated the user",
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    const { id } = req.query
    try {
      const user = await User.findByIdAndDelete(id)
      res.json({
        message: "Deleted the user",
      })
    } catch (error) {
      next(error)
    }
  }

}
