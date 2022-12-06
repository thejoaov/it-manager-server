import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'

export default class DashboardController {
  public async show({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.load('profile')

    if (['support', 'technician'].includes(user.profile.role)) {
      const tickets = await Ticket.query()
        .whereBetween('status', ['open', 'solving'])
        .where('assignee_id', user.profile.id)
        .preload('opener', (query) => {
          query.preload('user')
        })
        .preload('assignee', (query) => {
          query.preload('user')
        })
        .orderBy('created_at', 'desc')

      return response.json({
        solving: tickets.filter((t) => t.status === 'solving'),
        open: tickets.filter((t) => t.status === 'open'),
      })
    }

    if (['admin', 'manager'].includes(user.profile.role)) {
      const tickets = await Ticket.query()
        .whereBetween('status', ['open', 'solving'])
        .preload('opener', (query) => {
          query.preload('user')
        })
        .preload('assignee', (query) => {
          query.preload('user')
        })
        .orderBy('created_at', 'desc')

      return response.json({
        solving: tickets.filter((t) => t.status === 'solving'),
        open: tickets.filter((t) => t.status === 'open'),
      })
    }

    if (['user'].includes(user.profile.role)) {
      const tickets = await Ticket.query()
        .whereBetween('status', ['open', 'solving'])
        .where('opener_id', user.profile.id)
        .preload('opener', (query) => {
          query.preload('user')
        })
        .preload('assignee', (query) => {
          query.preload('user')
        })
        .orderBy('created_at', 'desc')

      return response.json({
        solving: tickets.filter((t) => t.status === 'solving'),
        open: tickets.filter((t) => t.status === 'open'),
      })
    }
  }
}
