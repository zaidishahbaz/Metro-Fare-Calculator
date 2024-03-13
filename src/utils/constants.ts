// Fare details
export const FARE_MATRIX: {
  [key: string]: { peak: number; non_peak: number };
} = {
  "Green,Green": { peak: 2, non_peak: 1 },
  "Red,Red": { peak: 3, non_peak: 2 },
  "Green,Red": { peak: 4, non_peak: 3 },
  "Red,Green": { peak: 3, non_peak: 2 },
};

export const DAILY_CAP: { [key: string]: number } = {
  "Green,Green": 8,
  "Red,Red": 12,
  "Green,Red": 15,
  "Red,Green": 15,
};

export const WEEKLY_CAP: { [key: string]: number } = {
  "Green,Green": 55,
  "Red,Red": 70,
  "Green,Red": 90,
  "Red,Green": 90,
};

export const PEAK_HOURS: { [key: number]: Array<[number, number]> } = {
  0: [[18, 23]], // Sunday
  1: [
    [8, 10],
    [16.5, 19],
  ], // Monday
  2: [
    [8, 10],
    [16.5, 19],
  ], // Tuesday
  3: [
    [8, 10],
    [16.5, 19],
  ], // Wednesday
  4: [
    [8, 10],
    [16.5, 19],
  ], // Thursday
  5: [
    [8, 10],
    [16.5, 19],
  ], // Friday
  6: [
    [10, 14],
    [18, 23],
  ], // Saturday
};
