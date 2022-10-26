import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(20),
      rules.unique({ table: 'users', column: 'username' }),
      rules.required(),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.required()]),
    passwordConfirmation: schema.string({ trim: true }, [rules.confirmed('password')]),
  })

  public messages: CustomMessages = {
    'username.required': 'username_required',
    'username.minLength': 'username_min_length',
    'username.maxLength': 'username_max_length',
    'username.unique': 'username_unique',
    'email.required': 'email_required',
    'email.email': 'email_email',
    'email.unique': 'email_unique',
    'password.required': 'password_required',
    'password.minLength': 'password_min_length',
    'passwordConfirmation.confirmed': 'password_confirmation_confirmed',
  }
}
