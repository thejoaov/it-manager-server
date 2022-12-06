import Route from '@ioc:Adonis/Core/Route'

Route.get('/dashboard', 'DashboardController.show').middleware('auth')
