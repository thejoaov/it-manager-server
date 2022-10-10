import Route from '@ioc:Adonis/Core/Route'

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({
    show: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
  .except(['index'])
