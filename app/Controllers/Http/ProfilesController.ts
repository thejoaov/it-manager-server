import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {
  /**
   * Create a new user profile
   * POST /profile/:id
   */
  public async store(ctx: HttpContextContract) {
    const { request, response } = ctx
    const requestBody = await request.validate(ProfileValidator)

    const user = await User.findOrFail(request.params().id)

    await user.related('profile').create(requestBody)

    await user.save()

    await user.load('profile')

    return response.status(200).json(user.serialize())
  }

  public async show({ params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = await User.findOrFail(id)

    await user.load('profile')

    const responseBody = user.serialize()

    return response.status(200).json(responseBody)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const requestBody = await request.validate(ProfileValidator)

    const user = await User.findOrFail(request.params().id)

    const profile = await user.related('profile').updateOrCreate({ userId: user.id }, requestBody)

    await profile.save()
    await user.save()

    return response.status(200).json(user.serialize())
  }
}
