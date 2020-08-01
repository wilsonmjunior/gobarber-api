import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });
  it('should be a ble to list month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 13, 0, 0),
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

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user-id',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 24, available: true },
        { day: 25, available: false },
        { day: 27, available: true },
        { day: 28, available: true },
      ]),
    );
  });
});
