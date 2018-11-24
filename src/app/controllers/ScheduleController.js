const { appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async index (req, res) {                
    const appointments = await appointment.findAll({      
      include: [{ model: User, as: 'user'}],
       where: {
        provider_id: req.session.user.id,
        //Agendamentos do dia (HOJE)
        date: {        
          [Op.gte]: moment(),
          [Op.between]: [            
            moment().startOf('day').format(),            
            moment().endOf('day').format()
          ]         
        }
      }
    })    
    
    return res.render('schedule', { appointments })
  }

  async show(req, res) {

  }
}

module.exports = new ScheduleController()