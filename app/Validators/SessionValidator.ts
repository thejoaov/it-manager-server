import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    login: schema.string({ trim: true }),
    password: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'login.required': 'login_required',
    'password.required': 'password_required',
  }
}
