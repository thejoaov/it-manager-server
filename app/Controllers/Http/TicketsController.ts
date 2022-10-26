import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import TicketUpdateValidator from 'App/Validators/TicketUpdateValidator'
import TicketValidator from 'App/Validators/TicketValidator'

export default class TicketsController {
  public async index({ request, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const { page, perPage, status, priority } = request.qs()

    const tickets = await Ticket.query()
      .where('status', 'like', status ?? '%')
      .where('priority', 'like', priority ?? '%')
      .paginate(page, perPage)

    const res = tickets.serialize({
      relations: {
        opener: { fields: { pick: ['name', 'role'] } },
        assignee: { fields: { pick: ['name', 'role'] } },
      },
    })

    response.json(res)
  }

  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()
    const data = await request.validate(TicketValidator)

    await auth.user?.load('profile')
    await bouncer.authorize('createTicket', auth.user?.profile!)

    const { opener, assignee } = data

    const ticket = await Ticket.create({
      ...data,
      openerId: opener,
      assigneeId: assignee,
    })

    await ticket.load('assignee')
    await ticket.load('opener')

    response.json(ticket)
  }

  public async show({ params, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const ticket = await Ticket.findOrFail(params.id)

    await ticket.load('assignee')
    await ticket.load('opener')

    response.json(ticket)
  }

  public async update({ request, params, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()
    const data = await request.validate(TicketUpdateValidator)

    await auth.user?.load('profile')
    await bouncer.authorize('updateTicket', auth.user?.profile!)

    const ticket = await Ticket.findOrFail(params.id)

    const updatedTicket = ticket.merge(data)

    await updatedTicket.save()

    await updatedTicket.load('assignee')
    await updatedTicket.load('opener')

    response.json(
      updatedTicket.serialize({
        relations: {
          opener: { fields: { pick: ['name', 'role', 'telephone'] } },
          assignee: { fields: { pick: ['name', 'role', 'telephone'] } },
        },
      })
    )
  }

  public async destroy({ params, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()

    await auth.user?.load('profile')

    await bouncer.authorize('deleteTicket', auth.user?.profile!)

    const ticket = await Ticket.findOrFail(params.id)

    await ticket.delete()

    response.status(204)
  }
}
