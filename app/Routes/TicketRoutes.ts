import Route from '@ioc:Adonis/Core/Route'

Route.get('/tickets/count', 'TicketsController.count').middleware('auth')
Route.get('/tickets', 'TicketsController.index').middleware('auth')
Route.post('/tickets', 'TicketsController.store').middleware('auth')
Route.get('/tickets/:id', 'TicketsController.show').middleware('auth')
Route.put('/tickets/:id', 'TicketsController.update').middleware('auth')
Route.delete('/tickets/:id', 'TicketsController.destroy').middleware('auth')
