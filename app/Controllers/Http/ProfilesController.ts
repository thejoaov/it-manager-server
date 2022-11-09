import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ProfileUpdateValidator from 'App/Validators/ProfileUpdateValidator'
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

    return response.status(200).json(user.serialize().profile)
  }

  public async show({ params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = await User.findOrFail(id)

    await user.load('profile')

    return response.status(200).json(user.serialize().profile)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const requestBody = await request.validate(ProfileUpdateValidator)

    await auth.user?.load('profile')

    auth.user?.profile?.merge(requestBody)

    await auth.user?.profile?.save()

    return response.status(200).json(auth.user?.profile?.serialize())
  }
}
