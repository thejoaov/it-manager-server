import { test } from '@japa/runner'
import Profile from 'App/Models/Profile'
import { ProfileFactory } from 'Database/factories/ProfileFactory'
import { TicketFactory } from 'Database/factories/TicketFactory'

let admin: Profile
let technician: Profile
let user: Profile

test.group('dashboard [GET]', ({ each }) => {
  each.setup(async () => {
    const [user1, user2, user3] = await ProfileFactory.merge([
      { role: 'admin' },
      { role: 'technician' },
      { role: 'user' },
    ])
      .with('user')
      .createMany(3)
    await user1.load('user')
    await user2.load('user')
    await user3.load('user')

    admin = user1
    technician = user2
    user = user3

    // opener: admin, assignee: technician
    await TicketFactory.merge({
      openerId: admin.id,
      assigneeId: technician.id,
    }).createMany(5)

    // opener: admin, assignee: undefined
    await TicketFactory.merge({
      openerId: admin.id,
    }).createMany(5)

    // opener: technician, assignee: undefined
    await TicketFactory.merge({
      openerId: technician.id,
    }).createMany(5)

    // opener: technician, assignee: admin
    await TicketFactory.merge({
      openerId: technician.id,
      assigneeId: admin.id,
    }).createMany(5)

    // opener: user, assignee: undefined
    await TicketFactory.merge({
      openerId: user.id,
    }).createMany(5)
  })

  test('/dashboard [GET] when admin', async ({ client }) => {
    const response = await client.get('/dashboard').guard('api').loginAs(admin.user).send()

    response.assertStatus(200)
  })

  test('/dashboard [GET] when user', async ({ client }) => {
    const response = await client.get('/dashboard').guard('api').loginAs(user.user).send()

    response.assertStatus(200)
  })
})
