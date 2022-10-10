import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { ProfileFactory } from 'Database/factories/ProfileFactory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('profile', () => ProfileFactory)
  .build()
