import { test } from '@japa/runner'
import { ProfileFactory } from 'Database/factories/ProfileFactory'

import { UserFactory } from 'Database/factories/UserFactory'

test.group('/profiles [GET] group', (group) => {
  let profiles
  group.setup(async () => {
    profiles = await UserFactory.with('profile', 0, (q) => {
      q.merge({ role: 'admin' })
    }).createMany(50)
  })

  test('/profiles [GET] list', async ({ client }) => {
    const [user] = profiles

    const response = await client.get(`/profiles`).guard('api').loginAs(user).send()

    response.assertStatus(200)
  })

  test('/profiles [GET] search by name', async ({ client }) => {
    const [user] = profiles

    await user.load('profile')

    const nameSearch = user.profile.name.split(' ')[0]

    const response = await client
      .get(`/profiles?name=${nameSearch}`)
      .guard('api')
      .loginAs(user)
      .send()

    response.assertStatus(200)
  })

  test('/profiles [GET] search by email', async ({ client }) => {
    const [user] = profiles

    await user.load('profile')

    const response = await client
      .get(`/profiles?email=${user.email}`)
      .guard('api')
      .loginAs(user)
      .send()

    response.assertStatus(200)
  })

  test('/profiles [GET] search by username', async ({ client }) => {
    const [user] = profiles

    await user.load('profile')

    const response = await client
      .get(`/profiles?username=${user.username}`)
      .guard('api')
      .loginAs(user)
      .send()

    response.assertStatus(200)
  })
})

test.group('profile', () => {
  test('/profile/:id [GET]', async ({ client }) => {
    const user = await UserFactory.with('profile').create()

    const response = await client.get(`/profile/${user.id}`).guard('api').loginAs(user).send()

    response.assertStatus(200)
    response.assertBodyContains({ profile: Object })
  })

  test('/profile/:id [GET] with invalid token', async ({ client }) => {
    const user = await UserFactory.with('profile').create()

    const response = await client.get(`/profile/${user.id}`).send()

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    })
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

    const response = await client
      .put(`/profile/${user.id}`)
      .guard('api')
      .loginAs(user)
      .json({
        name: 'Test',
        job_title: 'Biruleibe',
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({ ...response.body(), name: 'Test', job_title: 'Biruleibe' })
  })
})
