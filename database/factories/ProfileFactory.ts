import Profile from 'App/Models/Profile'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'
import { UserFactory } from 'Database/factories/UserFactory'

export const ProfileFactory = Factory.define(Profile, ({ faker }) => {
  return {
    birthdate: DateTime.fromJSDate(faker.date.past(20)),
    role: faker.helpers.arrayElement(['admin', 'user', 'guest', 'support']) as
      | 'admin'
      | 'user'
      | 'guest'
      | 'support',
    telephone: faker.phone.number('86 9########'),
    jobTitle: faker.name.jobTitle(),
    startDate: DateTime.fromJSDate(faker.date.past()),
    name: faker.name.fullName(),
  }
})
  .relation('user', () => UserFactory)
  .build()
