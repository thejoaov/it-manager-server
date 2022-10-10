import { test } from '@japa/runner'
import { faker } from '@faker-js/faker'
import { UserFactory } from 'Database/factories/UserFactory'

test.group('users', () => {
  test('/users [POST]', async ({ client }) => {
    const randomUsername = faker.internet.userName().toLowerCase()
    const randomEmail = faker.internet.email().toLowerCase()
    const randomPassword = faker.internet.password(12)

    const response = await client
      .post('/users')
      .json({
        username: randomUsername,
        email: randomEmail,
        password: randomPassword,
      })
      .send()

    response.assertStatus(200)
  })

  test('/users/:id [GET]', async ({ client }) => {
    const randomPassword = faker.internet.password(12)

    const user = await UserFactory.merge({ password: randomPassword }).create()

    const response = await client.get(`/users/${user.id}`).guard('api').loginAs(user).send()

    response.assertStatus(200)
  })

  test('/users/:id [PUT]', async ({ client }) => {
    const randomPassword = faker.internet.password(12)

    const user = await UserFactory.merge({ password: randomPassword }).create()

    const response = await client
      .put(`/users/${user.id}`)
      .guard('api')
      .loginAs(user)
      .json({
        username: user.username,
        email: user.email,
        password: faker.internet.password(12),
      })
      .send()

    response.assertStatus(200)
  })

  test('/users/:id [DELETE]', async ({ client }) => {
    const randomPassword = faker.internet.password(12)

    const user = await UserFactory.merge({ password: randomPassword }).create()

    const response = await client.delete(`/users/${user.id}`).guard('api').loginAs(user).send()

    response.assertStatus(200)
  })
})
