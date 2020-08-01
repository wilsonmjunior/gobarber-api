import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 25, 12).getTime());

    const appointment = await createAppointmentService.execute({
      provider_id: 'any-provider-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 14),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any-provider-id');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 25, 12).getTime());

    const appointmentDate = new Date(2020, 6, 26, 14);

    await fakeAppointmentRepository.create({
      provider_id: 'any-provider-id',
      user_id: 'any-user-id',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'any-provider-id',
        user_id: 'any-user-id',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 24, 12).getTime());

    await expect(
      createAppointmentService.execute({
        provider_id: 'any-provider-id',
        user_id: 'any-user-id',
        date: new Date(2020, 6, 24, 8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as povider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 24, 8).getTime());

    await expect(
      createAppointmentService.execute({
        provider_id: 'any-user-id',
        user_id: 'any-user-id',
        date: new Date(2020, 6, 26, 8),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before 8am and after 5pm.', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 24, 12).getTime());

    await expect(
      createAppointmentService.execute({
        provider_id: 'another-provider-id',
        user_id: 'another-user-id',
        date: new Date(2020, 6, 25, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        provider_id: 'another-provider-id',
        user_id: 'another-user-id',
        date: new Date(2020, 6, 25, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
