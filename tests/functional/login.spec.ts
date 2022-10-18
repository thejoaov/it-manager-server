import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories/UserFactory'

test.group('login', () => {
  test('/login [POST]', async ({ client }) => {
    const randomPassword = faker.internet.password(10)

    const { username, email } = await UserFactory.merge({
      password: randomPassword,
    })
      .with('profile')
      .create()

    // login with email
    const response = await client
      .post('/login')
      .json({ login: email, password: randomPassword })
      .send()

    // login with username
    const response2 = await client
      .post('/login')
      .json({ login: username, password: randomPassword })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      token: String,
      user: Object,
      remember_me_token: String || null,
      updated_at: String,
      username: String,
    })
    response2.assertStatus(200)
    response2.assertBodyContains({
      token: String,
      user: Object,
      remember_me_token: String || null,
      updated_at: String,
      username: String,
    })
  })

  test('/login [POST] with invalid credentials', async ({ client }) => {
    const response = await client
      .post('/login')
      .json({ login: faker.internet.email(), password: faker.internet.password(10) })
      .send()

    response.assertStatus(400)
  })
})
