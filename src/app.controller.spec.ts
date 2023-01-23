import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { QuotesService } from './app.service.quote';
import { Quote } from './entity/quote.entity';


describe('AppController', () => {
  let module: TestingModule;
  let appController: AppController;
  let quotesService: QuotesService;

  let result: Quote = {
    'quote_id': 1704,
    'quote': 'We need a new manager.',
    'character': 'Pam',
  };

  const mockQuotesService = {
    getRandomQuote: async () => {
      return result;
    },
  };

  const quoteServiceProvider = {
    provide: QuotesService,
    useValue: mockQuotesService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [quoteServiceProvider],
    }).compile();

    quotesService = module.get<QuotesService>(QuotesService);
    appController = module.get<AppController>(AppController);
  });

  describe('getRandomQuote', () => {
    it('should return random quote test coverage', async () => {
      let result: Quote = {
        'quote_id': 1704,
        'quote': 'We need a new manager.',
        'character': 'Pam',
      };

      jest.spyOn(quotesService, 'getRandomQuote').mockImplementation(async () => {
        return result;
      });

      expect(await appController.getRandomQuote()).toBe(result);
    });
  });
});
