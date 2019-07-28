'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.get('/api/usuarios', 'UsuarioController.index') 
Route.post('/api/usuarios', 'UsuarioController.store')
Route.get('/api/usuarios/:id', 'UsuarioController.show') 
Route.put('/api/usuarios/:id', 'UsuarioController.update')
Route.delete('/api/usuarios/:id', 'UsuarioController.destroy')
Route.post('/api/usuarios', 'UsuarioController.login')