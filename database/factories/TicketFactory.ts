import Ticket from 'App/Models/Ticket'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { ProfileFactory } from './ProfileFactory'

export const TicketFactory = Factory.define(Ticket, ({ faker }) => {
  return {
    location: faker.address.streetAddress(),
    title: faker.random.words(4),
    description: faker.random.words(10),
    status: faker.helpers.arrayElement(['open', 'closed', 'solving']) as
      | 'open'
      | 'closed'
      | 'solving',
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']) as 'low' | 'medium' | 'high',
  }
})
  .relation('assignee', () => ProfileFactory)
  .relation('opener', () => ProfileFactory)
  .build()
