import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string, rounds: number): Promise<string> {
    const hash = rounds ? payload : '';

    return hash;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
