import * as fs from 'fs';
import csvParser from 'csv-parser';
import { calculateTotalFare, Journey } from '../src/FareCalculator';
import { parseDateTime } from './utils/helpers';

const sampleData1Path = './data/sample_data_1.csv';
const sampleData2Path = './data/sample_data_2.csv';

describe('Metro Fare Calculator', () => {
  let journeys1: Journey[];
  let journeys2: Journey[];

  beforeAll(async () => {
    journeys1 = await readJourneysFromCSV(sampleData1Path);
    journeys2 = await readJourneysFromCSV(sampleData2Path);
  });

  it('calculates total fare correctly for sample journeys in CSV 1', () => {
    const expectedTotalFare = 7;
    const totalFare = calculateTotalFare(journeys1);
    expect(totalFare).toBe(expectedTotalFare);
  });

  it('calculates total fare correctly for sample journeys in CSV 2', () => {
    const expectedTotalFare = 8;
    const totalFare = calculateTotalFare(journeys2);
    expect(totalFare).toBe(expectedTotalFare);
  });

  // Helper function to read journeys from CSV
  async function readJourneysFromCSV(filename: string): Promise<Journey[]> {
    const journeys: Journey[] = [];
    return new Promise<Journey[]>((resolve, reject) => {
      fs.createReadStream(filename)
        .pipe(csvParser())
        .on('data', (data: any) => {
          const { fromLine, toLine, dateTime } = data;
          journeys.push({ fromLine, toLine, dateTime: parseDateTime(dateTime)});
        })
        .on('end', () => {
          resolve(journeys);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  }
});
