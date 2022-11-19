import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    birthdate: schema.date.optional(),
    role: schema.enum.optional([
      'admin',
      'user',
      'guest',
      'support',
      'manager',
      'technician',
    ] as const),
    telephone: schema.string.optional({ trim: true }, [rules.minLength(8), rules.maxLength(20)]),
    job_title: schema.string.optional(),
    start_date: schema.date.optional(),
  })

  public messages: CustomMessages = {
    'name.required': 'name_required',
    'birthdate.required': 'birthdate_required',
    'role.required': 'role_required',
    'telephone.minLength': 'telephone_min_length',
    'telephone.maxLength': 'telephone_max_length',
  }
}
