import IParseMailTemplatDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplatDTO): Promise<string>;
}
