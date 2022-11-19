import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TicketValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([rules.maxLength(120), rules.required()]),
    description: schema.string.optional([rules.maxLength(255)]),
    status: schema.enum.optional(['open', 'closed', 'solving'] as const),
    priority: schema.enum.optional(['low', 'medium', 'high'] as const),
    location: schema.string([rules.maxLength(120), rules.required()]),
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
    opener_id: schema.number([
      rules.exists({
        table: 'profiles',
        column: 'id',
        whereNot: {
          role: 'guest',
        },
      }),
      rules.required(),
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
    'assignee_id.required': 'assignee_id_required',
    'assignee_id.exists': 'assignee_id_invalid',
    'opener_id.required': 'opener_id_required',
    'opener_id.exists': 'opener_id_invalid',
  }
}
