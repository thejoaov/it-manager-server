import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    birthdate: schema.date(),
    role: schema.enum(['admin', 'user', 'guest', 'support', 'manager', 'technician'] as const),
    telephone: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(20)]),
    jobTitle: schema.string(),
    startDate: schema.date(),
  })

  public messages: CustomMessages = {
    'name.required': 'name_required',
    'birthdate.required': 'birthdate_required',
    'role.required': 'role_required',
    'telephone.minLength': 'telephone_min_length',
    'telephone.maxLength': 'telephone_max_length',
  }
}
