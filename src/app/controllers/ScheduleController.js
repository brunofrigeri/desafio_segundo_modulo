const { appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async show (req, res) {        
    const date = moment(parseInt(req.query.date))
    
    const appointments = await appointment.findAll({      
      include: [{ model: User, as: 'user'}],
       where: {
        provider_id: req.session.user.id,
        //Agendamentos do dia (HOJE)
        date: {                  
          [Op.between]: [            
            date.startOf('day').format(),            
            date.endOf('day').format()
          ]         
        }
      }
    })    

    return res.render('agenda/schedule_day', { appointments })
  }
}

module.exports = new ScheduleController()