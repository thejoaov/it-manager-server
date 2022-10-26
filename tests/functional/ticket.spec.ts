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

test.group('tickets', ({ each }) => {
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

    tickets = await TicketFactory.merge({
      openerId: admin.id,
      assigneeId: technician.id,
    }).createMany(10)
  })

  test('/tickets [GET]', async ({ client }) => {
    const response = await client.get('/tickets').guard('api').loginAs(admin.user).send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets?status=open [GET]', async ({ client }) => {
    const response = await client
      .get('/tickets?status=open')
      .guard('api')
      .loginAs(admin.user)
      .send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets?status=open [GET]', async ({ client }) => {
    const response = await client
      .get('/tickets?status=open&priority=high')
      .guard('api')
      .loginAs(admin.user)
      .send()

    response.assertBodyContains({ data: Array, meta: Object })
    response.assertStatus(200)
  })

  test('/tickets [POST] with (opener: admin, assignee: admin)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: admin.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with (opener: admin, assignee: technician)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with (opener: admin, assignee: technician)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(technician.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with (opener: admin, assignee: manager)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: manager.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with (opener: admin, assignee: support)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: support.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket' })
    response.assertStatus(200)
  })

  test('/tickets [POST] with invalid data', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: user.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({
      errors: [
        {
          field: 'assignee',
          message: 'assignee_invalid',
          rule: 'exists',
        },
      ],
    })
    response.assertStatus(422)
  })

  test('/tickets [POST] with invalid permissions (guest)', async ({ client }) => {
    const request = {
      title: 'test ticket',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .post('/tickets')
      .guard('api')
      .loginAs(guest.user)
      .json(request)
      .send()

    response.assertBodyContains({
      message: 'E_AUTHORIZATION_FAILURE: Not authorized to perform this action',
    })
    response.assertStatus(403)
  })

  test('/tickets/:id [GET]', async ({ client }) => {
    const response = await client
      .get(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin.user)
      .send()

    response.assertStatus(200)
  })

  test('/tickets/:id [PUT]', async ({ client }) => {
    const request = {
      title: 'test ticket updated',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .put(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertBodyContains({ title: 'test ticket updated' })
    response.assertStatus(200)
  })

  test('/tickets/:id [PUT] with invalid id', async ({ client }) => {
    const request = {
      title: 'test ticket updated',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .put(`/tickets/000000000`)
      .guard('api')
      .loginAs(admin.user)
      .json(request)
      .send()

    response.assertStatus(404)
    response.assertBodyContains({ message: 'E_ROW_NOT_FOUND: Row not found' })
  })

  test('/tickets/:id [PUT] with invalid permissions (guest)', async ({ client }) => {
    const request = {
      title: 'test ticket updated',
      description: 'test ticket description',
      status: 'open',
      priority: 'low',
      opener: admin.id,
      assignee: technician.id,
      location: 'test location',
    }

    const response = await client
      .put(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(guest.user)
      .json(request)
      .send()

    response.assertBodyContains({
      message: 'E_AUTHORIZATION_FAILURE: Not authorized to perform this action',
    })
    response.assertStatus(403)
  })

  test('/tickets/:id [DELETE]', async ({ client }) => {
    const response = await client
      .delete(`/tickets/${tickets[0].id}`)
      .guard('api')
      .loginAs(admin.user)
      .send()

    response.assertStatus(204)
  })

  test('/tickets/:id [DELETE] with invalid id', async ({ client }) => {
    const response = await client.delete('/tickets/100000').guard('api').loginAs(admin.user).send()

    response.assertStatus(404)
  })

  // users and guests should not be able to delete tickets
  test('/tickets/:id [DELETE] with invalid permissions (guest)', async ({ client }) => {
    const response = await client
      .delete(`/tickets/${tickets[3].id}`)
      .guard('api')
      .loginAs(guest.user)
      .send()

    response.assertStatus(403)
  })

  test('/tickets/:id [DELETE] with invalid permissions (technician)', async ({ client }) => {
    const response = await client
      .delete(`/tickets/${tickets[3].id}`)
      .guard('api')
      .loginAs(technician.user)
      .send()

    response.assertStatus(403)
  })
})
