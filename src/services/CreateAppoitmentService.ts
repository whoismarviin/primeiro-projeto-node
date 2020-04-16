import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository'
import { startOfHour} from 'date-fns';

interface Request {
    provider: string;
    date: Date;
}

class createAppointmentService(){

    private AppointmentRepository: AppointmentRepository;

    constructor(AppointmentRepository: AppointmentRepository) {
        this.appointmentRepository = AppointmentRepository
    }

    public execute({provider,date}: Request): Appointment{
        const appointDate = startOfHour(date);

        const findAppointmentInSameDate = AppointmentRepository.findByDate(appointDate);


        if (findAppointmentInSameDate){
           throw Error('Something is wrong, This appointment is already booked!')
        }


        const appointment = AppointmentRepository.create({
            provider,
            date:appointDate});

        return appointment;

    }
}

export default createAppointmentService;




