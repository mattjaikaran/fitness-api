/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'
import FitnessClassesController from 'App/Controllers/Http/FitnessClassesController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('dashboard', async ({ auth }) => {
  await auth.use('web').authenticate()
  console.log(auth.use('web').user!)
})

Route.post('login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')

Route.get('classes', 'FitnessClassesController.index')
Route.get('classes/:id', 'FitnessClassesController.show')


// Route.get('/api/v1', async () => {
//   return { hello: 'world' }
// })