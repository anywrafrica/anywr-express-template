import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';
import {ErrorHandler} from "@middlewares/errorHandler";
import {TranslationService} from "@services/translation.service";

const container = new Container();

container.bind<ErrorHandler>("ErrorHandler").to(ErrorHandler);
container.bind<TranslationService>(TranslationService).toSelf().inRequestScope();

container.load(buildProviderModule());

export {
    container
};