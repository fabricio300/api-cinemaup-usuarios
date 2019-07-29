'use strict'


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Usuario = use('App/Models/Usuario');
const stripe = require('stripe')('pk_test_AjSflyejK3J7quTKNeWfBY0v00XIuUpWtP');
class UsuarioController {

     /**
   * 
   * 
   *
   * 
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async index ({ request, response, view }) {
    let usuario = await Usuario.all()
    return response.json(usuario)

  }


  async store ({ request, response }) {
    const nombre = request.input('nombre')
    const password = request.input('password')
    const correo = request.input('correo')
    const status = request.input('status')
   
    const usuario = new Usuario()

    usuario.nombre=nombre
    usuario.password=password
    usuario.correo=correo
    usuario.status=status
   


    await usuario.save()
    return response.json(usuario)
  }


  async show ({ params, request, response, view }) {
    const usuario = await Usuario.find(params.id)
    return response.json(usuario)
  }


  async update ({ params, request, response }) {
    const nombre = request.input('nombre')
    const password = request.input('password')
    const correo = request.input('correo')
    const status = request.input('status')

    let usuario = await Usuario.find(params.id)


    usuario.nombre=nombre
    usuario.password=password
    usuario.correo=correo
    usuario.status=status
  
    await usuario.save()
    return response.json(usuario)
  }

  async destroy ({ params, request, response }) {
 
    const usuario = await Usuario.find(params.id)
        if (!usuario) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await usuario.delete()

        return response.status(204).json(null)

    
  }

  async login({request, response, auth}) {
    const {correo, contraseña} = request.all();
    console.log("contra", contraseña)
    const usuario = await auth.attempt(correo, contraseña);
    console.log("AL SALIR", usuario.token)
    const user_id = await Usuario.query().select('id').where('correo','=',correo).fetch()
    Object.assign(usuario,user_id.toJSON())
    console.log("AL SALIR", user_id.toJSON())
    return response.json(usuario);
}


async payx({ request, response }){
  const token = request.body.token; 
  console.log("apivd ",request.body.token)

  try{
    (async () => {
    
      const charge = await stripe.charges.create({
        amount: request.body.monto*100,
        currency: 'mxn',
        description: 'pago VIP',
        source: token,
      });
    })();
  }catch(error){console.error(error);
  }
}


}

module.exports = UsuarioController
