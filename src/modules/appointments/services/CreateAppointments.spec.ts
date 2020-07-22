import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id: '123-123-123',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123-123-123');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    // const appointmentDate = new Date(2020, 6, 20, 11);
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      provider_id: '123-123-123',
      date: appointmentDate,
    });

    expect(
      createAppointmentService.execute({
        provider_id: '123-123-123',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
