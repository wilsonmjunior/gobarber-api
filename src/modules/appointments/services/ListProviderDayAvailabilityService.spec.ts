import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 15, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 25, 10).getTime());

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user-id',
      year: 2020,
      month: 7,
      day: 25,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
