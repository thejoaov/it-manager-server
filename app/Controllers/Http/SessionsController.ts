import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  /**
   * Create a new session
   * POST /login
   */
  public async create({ request, response, auth }: HttpContextContract) {
    const { login, password } = request.body()

    const { token } = await auth.attempt(login, password)

    const user = await auth.verifyCredentials(login, password)

    await user.load('profile')

    return response.status(200).json({ token, user: user.serialize() })
  }
}
