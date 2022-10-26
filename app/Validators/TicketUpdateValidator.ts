import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TicketUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(255)]),
    description: schema.string({ trim: true }),
    status: schema.enum(['open', 'closed', 'solving'] as const),
    priority: schema.enum(['low', 'medium', 'high'] as const),
    location: schema.string({ trim: true }, [rules.maxLength(255)]),
    assignee: schema.number([
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: { role: 'user' },
      }),
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: { role: 'guest' },
      }),
    ]),
    opener: schema.number([rules.exists({ table: 'profiles', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'title.required': 'title_required',
    'title.maxLength': 'title_too_long',
    'description.required': 'description_required',
    'status.required': 'status_required',
    'status.enum': 'status_invalid',
    'priority.required': 'priority_required',
    'priority.enum': 'priority_invalid',
    'location.required': 'location_required',
    'location.maxLength': 'location_too_long',
    'assignee.required': 'assignee_required',
    'assignee.exists': 'assignee_invalid',
    'opener.required': 'opener_required',
    'opener.exists': 'opener_invalid',
  }
}
