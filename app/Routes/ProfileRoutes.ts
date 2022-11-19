import Route from '@ioc:Adonis/Core/Route'

Route.get('/profiles', 'ProfilesController.index').middleware('auth')
Route.get('/profile/:id', 'ProfilesController.show').middleware('auth')
Route.put('/profile/:id', 'ProfilesController.update').middleware('auth')
Route.post('/profile/:id', 'ProfilesController.store').middleware('auth')
