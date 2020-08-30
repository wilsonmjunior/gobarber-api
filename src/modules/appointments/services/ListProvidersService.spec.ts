import { classToClass } from 'class-transformer';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe One',
      email: 'johndoeone@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe Two',
      email: 'johndoetwo@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe Three',
      email: 'johndoethree@email.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should be able saved list of cached provider', async () => {
    const saveCache = jest.spyOn(fakeCacheProvider, 'save');

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe One',
      email: 'johndoeone@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe Two',
      email: 'johndoetwo@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe Three',
      email: 'johndoethree@email.com',
      password: '123456',
    });

    await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(saveCache).toHaveBeenCalledWith(
      `providers-list:${loggedUser.id}`,
      classToClass([user1, user2]),
    );
  });

  it('should be able recover list of cached provider', async () => {
    const recoverCache = jest.spyOn(fakeCacheProvider, 'recover');

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe One',
      email: 'johndoeone@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe Two',
      email: 'johndoetwo@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe Three',
      email: 'johndoethree@email.com',
      password: '123456',
    });

    await fakeCacheProvider.save(`providers-list:${loggedUser.id}`, [
      user1,
      user2,
    ]);

    await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(recoverCache).toHaveBeenCalledWith(
      `providers-list:${loggedUser.id}`,
    );
  });
});
