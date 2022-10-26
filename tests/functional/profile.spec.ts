import { test } from '@japa/runner'
import { ProfileFactory } from 'Database/factories/ProfileFactory'

import { UserFactory } from 'Database/factories/UserFactory'

test.group('profile', () => {
  test('/profile/:id [GET]', async ({ client }) => {
    const user = await UserFactory.with('profile').create()

    const response = await client.get(`/profile/${user.id}`).guard('api').loginAs(user).send()

    response.assertStatus(200)
    response.assertBodyContains({ profile: Object })
  })

  test('/profile/:id [POST]', async ({ client }) => {
    const user = await UserFactory.create()
    const profile = await ProfileFactory.create()

    const response = await client
      .post(`/profile/${user.id}`)
      .guard('api')
      .loginAs(user)
      .json({
        ...profile.serialize(),
        jobTitle: profile.serialize().job_title,
        startDate: profile.serialize().start_date,
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({ profile: Object })
  })

  test('/profile/:id [PUT]', async ({ client }) => {
    const user = await UserFactory.with('profile').create()

    await user.load('profile')

    const response = await client
      .put(`/profile/${user.id}`)
      .guard('api')
      .loginAs(user)
      .json({
        name: 'Test',
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({ ...response.body(), name: 'Test' })
  })
})
