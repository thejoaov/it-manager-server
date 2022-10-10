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
    const requestBody = await request.validate({
      schema: new ProfileValidator(ctx).schema,
    })

    const user = await User.findOrFail(request.params().id)

    await user.related('profile').create(requestBody)

    await user.save()

    await user.load('profile')

    return response.status(200).json(user.serialize())
  }

  /**
   * Show a user profile
   * GET /profile/:id
   */
  public async show({ params: { id }, response }: HttpContextContract) {
    const user = await User.findOrFail(id)

    // const responseBody = user.serializeRelations({
    //   profile: {
    //     fields: ['name', 'birthdate', 'role', 'telephone', 'jobTitle', 'startDate'],
    //   },
    // })

    // const responseBody = user.profile

    await user.load('profile')

    const responseBody = user.serialize()

    return response.status(200).json(responseBody)
  }

  /**
   * Update a user
   * PUT /profile/:id
   */
  public async update(ctx: HttpContextContract) {
    const { request, response } = ctx

    const requestBody = await request.validate({
      schema: new ProfileValidator(ctx).schema,
    })

    const user = await User.findOrFail(request.params().id)

    await (await user.related('profile').updateOrCreate({}, requestBody)).save()

    await user.save()

    return response.status(200).json(user.serialize())
  }
}
