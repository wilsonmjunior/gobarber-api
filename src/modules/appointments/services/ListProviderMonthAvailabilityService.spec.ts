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
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 6, 24, 11).getTime());

    console.log('TESTE: ', Date.now());

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 8),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 9),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 12),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 13),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 15),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 16),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user-id',
      user_id: 'any-user-id',
      date: new Date(2020, 6, 25, 17),
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
        { day: 26, available: true },
        { day: 27, available: true },
      ]),
    );
  });
});
