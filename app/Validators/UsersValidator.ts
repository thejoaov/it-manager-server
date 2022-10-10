import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const UserValidator = schema.create({
  username: schema.string({ trim: true }, [
    rules.minLength(3),
    rules.maxLength(20),
    rules.unique({ table: 'users', column: 'username' }),
  ]),
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({ trim: true }, [rules.minLength(8)]),
})
