import { test } from '@japa/runner'
import { ProfileFactory } from 'Database/factories/ProfileFactory'
import { TicketFactory } from 'Database/factories/TicketFactory'

let admin
let technician
let support
let user
let tickets

test.group('tickets', ({ each }) => {
  each.setup(async () => {
    const [user1, user2, user3, user4] = await ProfileFactory.merge([
      { role: 'admin' },
      { role: 'technician' },
      { role: 'support' },
      { role: 'user' },
    ])
      .with('user')
      .createMany(4)
    admin = user1
    technician = user2
    support = user3
    user = user4

    tickets = await TicketFactory.merge({
      openerId: admin.serialize().id,
      assigneeId: technician.serialize().id,
    }).createMany(10)
  })

  test('/tickets [GET]', async ({ client }) => {
    const response = await client.get('/tickets').guard('api').loginAs(admin).send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets?status=open [GET]', async ({ client }) => {
    const response = await client.get('/tickets?status=open').guard('api').loginAs(admin).send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets?status=open [GET]', async ({ client }) => {
    const response = await client
      .get('/tickets?status=open&priority=high')
      .guard('api')
      .loginAs(admin)
      .send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets [POST]', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.serialize().id,
      assignee: technician.serialize().id,
      location: 'test location',
    }

    const response = await client.post('/tickets').guard('api').loginAs(admin).json(request).send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with invalid data', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.serialize().id,
      assignee: user.serialize().id,
      location: 'test location',
    }

    const response = await client.post('/tickets').guard('api').loginAs(admin).json(request).send()

    response.assertBodyContains({
      errors: [
        {
          field: 'assignee',
          message: 'Assignee is invalid',
          rule: 'exists',
        },
      ],
    })
    response.assertStatus(422)
  })

  test('/tickets/:id [GET]', async ({ client }) => {
    const response = await client
      .get(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin)
      .send()

    response.assertStatus(200)
  })

  test('/tickets/:id [PUT]', async ({ client }) => {
    const request = {
      title: 'test ticket updated',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.serialize().id,
      assignee: technician.serialize().id,
      location: 'test location',
    }

    const response = await client
      .put(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket updated' })
    response.assertStatus(200)
  })

  test('/tickets/:id [DELETE]', async ({ client }) => {
    const response = await client
      .delete(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin)
      .send()

    response.assertStatus(204)
  })
})
