import { test } from '@japa/runner'
import Profile from 'App/Models/Profile'
import { ProfileFactory } from 'Database/factories/ProfileFactory'
import { TicketFactory } from 'Database/factories/TicketFactory'

let admin: Profile
let technician: Profile
let support: Profile
let user: Profile
let guest: Profile
let manager: Profile

let tickets

test.group('dashboard [GET]', ({ each }) => {
  each.setup(async () => {
    const [user1, user2, user3, user4, user5, user6] = await ProfileFactory.merge([
      { role: 'admin' },
      { role: 'technician' },
      { role: 'support' },
      { role: 'user' },
      { role: 'guest' },
      { role: 'manager' },
    ])
      .with('user')
      .createMany(6)
    await user1.load('user')
    await user2.load('user')
    await user4.load('user')
    await user5.load('user')
    await user6.load('user')

    admin = user1
    technician = user2
    support = user3
    user = user4
    guest = user5
    manager = user6

    const ticketsWithAssignee = await TicketFactory.merge({
      openerId: admin.id,
      assigneeId: technician.id,
    }).createMany(5)
    const ticketsWithoutAssignee = await TicketFactory.merge({
      openerId: admin.id,
    }).createMany(5)

    tickets = [...ticketsWithAssignee, ...ticketsWithoutAssignee]
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
