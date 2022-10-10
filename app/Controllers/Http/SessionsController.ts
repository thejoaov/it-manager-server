import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  /**
   * Create a new session
   * POST /login
   */
  public async create({ request, response, auth }: HttpContextContract) {
    const { login, password } = request.all()

    const token = await auth.attempt(login, password)

    return response.status(200).json(token)
  }
}
