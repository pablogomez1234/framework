const { Router } = require('express')
const sessionRouter = Router() 

const passport = require('passport')
require('../middlewares/auth')

const { logger, loggererr } = require('../log/logger')


/* ------------------ router session ----------------- */
//--------------------- usuario logeado?
sessionRouter.get(
  '/',
  (req, res) => {
    if (req.session.passport) {
      logger.info(`Usuario ${req.session.passport.user} logeado`)
      res.status(200).send({ user: req.session.passport.user })
    } else {
      logger.warn(`No hay usuario logeado`) 
      res.status(401).send({ user: '' })
    }
  }
)


//--------------------- post login user
sessionRouter.post(
  '/login', 
  passport.authenticate('login'),
  function(_, res) {
    logger.info(`Autenticacion exitosa`)
    res.status(200).send({ message: 'Autenticación exitosa.' })
  }
)


//--------------------- post login/register user with google
sessionRouter.post(
  '/logingoogle', 
  passport.authenticate('googleauth'),
  function(_, res) {
    logger.info(`Autenticacion con Google exitosa`)
    res.status(200).send({ message: 'Autenticación exitosa.' })
  }
)


//--------------------- post Register user
sessionRouter.post(
  '/register',
  passport.authenticate('register'),
  function(_, res) {
    logger.info(`Usuario creado correctamente`)
    res.status(200).send({ rlt: true, msg: 'Usuario creado correctamente'})
  }
)


//------------ post cerrar sesion
sessionRouter.post(
  '/logout',
  async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        loggererr.error(`No se ha podido cerrar la sesion, error: ${error}`)
        res.status(500).send(`Something terrible just happened!!!`)
      } else {
        logger.info(`Sesion cerrada.`)
        res.redirect('/')
      }
    })
  }
)


module.exports = sessionRouter