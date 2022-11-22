import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TicketUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional([rules.maxLength(120)]),
    description: schema.string.optional([rules.maxLength(255)]),
    status: schema.enum.optional(['open', 'closed', 'solving'] as const),
    priority: schema.enum.optional(['low', 'medium', 'high'] as const),
    location: schema.string.optional([rules.maxLength(120)]),
    assignee_id: schema.number.nullableAndOptional([
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: {
          role: 'user',
        },
      }),
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: {
          role: 'guest',
        },
      }),
    ]),
    opener_id: schema.number.optional([
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: {
          role: 'guest',
        },
      }),
    ]),
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
