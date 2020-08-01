import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointments from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointments;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 10),
      provider_id: 'provider',
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 11),
      provider_id: 'provider',
      user_id: 'another-user',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 7,
      day: 28,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });

  it('should be able to cache a list of appointments from a provider', async () => {
    const saveCache = jest.spyOn(fakeCacheProvider, 'save');

    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 10),
      provider_id: 'provider_id',
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 11),
      provider_id: 'provider_id',
      user_id: 'another-user',
    });

    await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 7,
      day: 28,
    });

    expect(
      saveCache,
    ).toHaveBeenCalledWith(
      `provider-appointments:provider_id:${2020}-${7}-${28}`,
      [appointment1, appointment2],
    );
  });

  it('should be able to recover a list of appointments from a provider in the cache', async () => {
    const recoverCache = jest.spyOn(fakeCacheProvider, 'recover');

    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 10),
      provider_id: 'provider_id',
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 6, 28, 11),
      provider_id: 'provider_id',
      user_id: 'another-user',
    });

    await fakeCacheProvider.save(
      `provider-appointments:provider_id:${2020}-${7}-${28}`,
      [appointment1, appointment2],
    );

    await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 7,
      day: 28,
    });

    expect(recoverCache).toHaveBeenCalledWith(
      `provider-appointments:provider_id:${2020}-${7}-${28}`,
    );
  });
});
