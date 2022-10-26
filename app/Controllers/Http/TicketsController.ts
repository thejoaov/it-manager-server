import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
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

    const res = tickets.serialize()

    response.json(res)
  }

  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()
    const data = await request.validate(TicketValidator)

    await auth.user?.load('profile')
    await bouncer.authorize('createTicket', auth.user?.profile!)

    const { location, title, description, opener, assignee } = data

    const ticket = await Ticket.create({
      location,
      title,
      description,
      openerId: opener,
      assigneeId: assignee,
    })

    const res = {
      ...ticket.serialize(),
      opener: (await Profile.findOrFail(ticket.openerId)).serialize(),
      assignee: (await Profile.findOrFail(ticket.assigneeId)).serialize(),
    }

    response.json(res)
  }

  public async show({ params, response, auth }: HttpContextContract) {
    await auth.authenticate()
    const ticket = await Ticket.findOrFail(params.id)

    const res = {
      ...ticket.serialize(),
      opener: (await Profile.findOrFail(ticket.openerId)).serialize(),
      assignee: (await Profile.findOrFail(ticket.assigneeId)).serialize(),
    }

    response.json(res)
  }

  public async update({ request, params, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()
    const data = await request.validate(TicketUpdateValidator)

    await auth.user?.load('profile')
    await bouncer.authorize('updateTicket', auth.user?.profile!)

    const { location, title, description, opener, assignee } = data

    const ticket = await Ticket.findOrFail(params.id)

    ticket.location = location
    ticket.title = title
    ticket.description = description
    ticket.openerId = opener
    ticket.assigneeId = assignee

    await ticket.save()

    const res = {
      ...ticket.serialize(),
      opener: (await Profile.findOrFail(ticket.openerId)).serialize(),
      assignee: (await Profile.findOrFail(ticket.assigneeId)).serialize(),
    }

    response.json(res)
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
