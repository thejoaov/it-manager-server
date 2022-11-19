import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import ProfileUpdateValidator from 'App/Validators/ProfileUpdateValidator'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {
  public async index({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const { page, perPage = 50, name, email, username } = request.qs()

    if ([name, email, username].every((value) => value === 'all')) {
      const profiles = await Profile.query()
        .preload('user')
        .whereNotIn('role', ['user', 'guest'])
        .paginate(page, perPage)

      return response.json(profiles.serialize())
    }

    const profiles = await Profile.query()
      .preload('user')
      .whereHas('user', (query) => {
        query.whereLike('email', `%${email}%`).whereHas('profile', (query) => {
          query.whereNotIn('role', ['user', 'guest'])
        })
      })
      .orWhereHas('user', (query) => {
        query.whereLike('username', `%${username}%`).whereHas('profile', (query) => {
          query.whereNotIn('role', ['user', 'guest'])
        })
      })
      .orWhereLike('name', `%${name}%`)
      .whereNotIn('role', ['user', 'guest'])
      .paginate(page, perPage)

    return response.json(profiles.serialize())
  }

  public async store({ params: { id }, request, response }: HttpContextContract) {
    const { role = 'user', ...requestBody } = await request.validate(ProfileValidator)

    const user = await User.findOrFail(id)

    await user.related('profile').create({ ...requestBody, role })

    await user.save()

    await user.load('profile')

    return response.json(user.serialize().profile)
  }

  public async show({ params: { id }, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = await User.findOrFail(id)

    await user.load('profile')

    return response.json(user.serialize().profile)
  }

  public async update({ params: { id }, request, response }: HttpContextContract) {
    const requestBody = await request.validate(ProfileUpdateValidator)

    const user = await User.findOrFail(id)
    await user.load('profile')

    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
      },
      requestBody
    )

    await user.load('profile')

    return response.json(user.profile?.serialize())
  }
}
