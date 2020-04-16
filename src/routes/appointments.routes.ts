import {Router} from 'express';
import {startOfHour, parseISO,isEqual, parse} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepositories from '../repositories/AppointmentRepository';

const appointmentRouter =  Router();
const AppointmentRepository = new AppointmentRepositories();

appointmentRouter.get('/', (request,response)=> {
    const appointments= AppointmentRepository.all();
    return response.json(appointments);
})

appointmentRouter.post('/', (request,response)=> {
    const {provider,date} = request.body;

    const parsedDate = parseISO(date);
    const appointDate = startOfHour(parsedDate);

    const findAppointmentInSameDate = AppointmentRepository.findDate(appointDate);


    if (findAppointmentInSameDate){
        return response.status(400).json({error : 'Something is wrong, This appointment is already booked!'})
    }


    const appointment = AppointmentRepository.create({provider,date:parsedDate});


    return response.json(appointment)


})

export default appointmentRouter;
