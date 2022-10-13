import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TicketValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
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
        where: { role: 'technician' || 'admin' || 'manager' || 'support' },
      }),
    ]),
    opener: schema.number([rules.exists({ table: 'profiles', column: 'id' })]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'title.required': 'Title is required',
    'title.maxLength': 'Title is too long',
    'description.required': 'Description is required',
    'status.required': 'Status is required',
    'status.enum': 'Status is invalid',
    'priority.required': 'Priority is required',
    'priority.enum': 'Priority is invalid',
    'location.required': 'Location is required',
    'location.maxLength': 'Location is too long',
    'assignee.required': 'Assignee is required',
    'assignee.exists': 'Assignee is invalid',
    'opener.required': 'Opener is required',
    'opener.exists': 'Opener is invalid',
  }
}
