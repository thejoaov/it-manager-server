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
      .preload('opener', (query) => {
        query.preload('user')
      })
      .preload('assignee', (query) => {
        query.preload('user')
      })
      .paginate(page, perPage)

    response.json(tickets.serialize())
  }

  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    const user = await auth.authenticate()
    const body = request.body()

    const {
      status = 'open',
      priority = 'medium',
      opener_id = user.profile.id,
      assignee_id = body.assignee_id || null,
      ...data
    } = await request.validate(TicketValidator)

    await auth.user?.load('profile')
    await bouncer.authorize('createTicket', auth.user?.profile!)

    const ticket = await Ticket.create({
      ...data,
      status,
      priority,
      openerId: opener_id,
      assigneeId: assignee_id,
    })
    await ticket.save()

    await ticket.load('assignee')
    await ticket.load('opener')

    response.json(ticket.serialize())
  }

  public async show({ params, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const ticket = await Ticket.findOrFail(params.id)

    await ticket.load('assignee')
    await ticket.load('opener')

    response.json(ticket.serialize())
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

    response.json(ticket.serialize())
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
