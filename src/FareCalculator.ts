import * as fs from 'fs'
import { parse } from 'csv-parse'
import moment from 'moment'

import {
  DAILY_CAP,
  FARE_MATRIX,
  PEAK_HOURS,
  WEEKLY_CAP,
} from './utils/constants'
import { parseDateTime } from './utils/helpers'

export interface Journey {
  fromLine: string
  toLine: string
  dateTime: Date
}

function calculateFare(
  fromLine: string,
  toLine: string,
  dateTime: Date,
): number {
  const weekday = dateTime.getDay() // Get the day of the week (0 to 6)

  if (isNaN(weekday)) {
    throw new Error(`Invalid weekday: ${weekday}`)
  }

  // Calculate peak hours and fare
  const isPeak = PEAK_HOURS[weekday].some(
    ([start, end]) =>
      start <= dateTime.getHours() + dateTime.getMinutes() / 60 &&
      dateTime.getHours() + dateTime.getMinutes() / 60 < end,
  )
  const fare =
    FARE_MATRIX[`${fromLine},${toLine}`][isPeak ? 'peak' : 'non_peak']

  return fare
}

function applyCap(spending: { [key: string]: number }, key: string, cap: number, totalFare: number): void {
  if (spending[key] > cap) {
      totalFare -= spending[key] - cap;
      spending[key] = cap;
  }
}

export function calculateTotalFare(journeys: Journey[]): number {
  const dailySpending: { [key: string]: number } = {};
  const weeklySpending: { [key: string]: number } = {};
  let totalFare = 0;

  journeys.forEach(({ fromLine, toLine, dateTime }) => {
      const fare = calculateFare(fromLine, toLine, dateTime);
      totalFare += fare;

      const dailyKey = `${fromLine},${toLine},${dateTime.toISOString().substring(0, 10)}`;
      dailySpending[dailyKey] = (dailySpending[dailyKey] || 0) + fare;

      const weekNumber = moment(dateTime).isoWeek();
      const weeklyKey = `${fromLine},${toLine},${weekNumber}`;
      weeklySpending[weeklyKey] = (weeklySpending[weeklyKey] || 0) + fare;

      // Apply daily and weekly caps
      applyCap(dailySpending, dailyKey, DAILY_CAP[`${fromLine},${toLine}`], totalFare);
      applyCap(weeklySpending, weeklyKey, WEEKLY_CAP[`${fromLine},${toLine}`], totalFare);
  });

  return totalFare;
}

export function main() {
  const journeys: Journey[] = []
  const csvFilePath = './data/journeys.csv'
  const inputStream = fs.createReadStream(csvFilePath)
  const parser = parse({ columns: true })

  parser.on('data', (record: any) => {
    const dateTime = parseDateTime(record.dateTime)

    const journey: Journey = {
      fromLine: record.fromLine,
      toLine: record.toLine,
      dateTime: dateTime,
    }

    journeys.push(journey)
  })

  parser.on('end', () => {
    const totalFare = calculateTotalFare(journeys)
    console.log('Total fare applied:', totalFare)
  })

  inputStream.pipe(parser)
}
