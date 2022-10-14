import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserValidator } from 'App/Validators/UsersValidator'

export default class UsersController {
  /**
   * Create a new user
   * POST /users
   */
  public async store({ request, response }: HttpContextContract) {
    const { email, password, username } = await request.validate({
      schema: UserValidator,
    })

    const user = await User.create({ email, password, username })

    await user.save()

    return response.status(200).json(user.serialize())
  }

  /**
   * Show a user
   * GET /users/:id
   */
  public async show({ params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = await User.findOrFail(id)

    return response.status(200).json(user.serialize())
  }

  /**
   * Update a user
   * PUT /users/:id
   */
  public async update({ request, params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const updatedUser = request.all()
    const user = await User.findOrFail(id)

    await user.merge(updatedUser).save()

    return response.status(200).json(user.serialize())
  }

  /**
   * Delete a user
   * DELETE /users/:id
   */
  public async destroy({ params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = await User.findOrFail(id)

    await user.delete()

    return response.status(200).json(user.serialize())
  }
}
