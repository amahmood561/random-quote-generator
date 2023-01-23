import { Injectable } from '@nestjs/common';
import { Quote } from './entity/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from './data/office_quotes.json';
@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async seed(): Promise<string> {
    let quotes = data;
    let count: number;
    count = await this.quotesRepository.count();
    if (count > 0) {
      return ("db has items: " + count)
    } else {
        for (const quote of quotes.data) {
          await this.quotesRepository.save(quote);
        }
        count = await this.quotesRepository.count();
    }
    return ("inserted: " + count)
  }

  async getRandomQuote(): Promise<Quote> {
    const count = await this.quotesRepository.count();
    const random = Math.floor(Math.random() * count);
    return this.quotesRepository.createQueryBuilder("quote")
      .skip(random)
      .take(1)
      .getOne();
  }
}