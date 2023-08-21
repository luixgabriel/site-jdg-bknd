export const isWithinTimeLimit = (userDate: Date, timeLimitInMinutes: number): boolean => {
  const currentTime = new Date();
  const timeDifferenceInMilliseconds = currentTime.getTime() - userDate.getTime();
  const timeLimitInMilliseconds = timeLimitInMinutes * 60 * 1000;

  return timeDifferenceInMilliseconds <= timeLimitInMilliseconds;
}