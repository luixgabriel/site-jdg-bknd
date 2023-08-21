import { isWithinTimeLimit } from "@/utils/authUtils/isWithinTimeLimit";

describe('isWithinTimeLimit', () => {

  it('should return true when the time difference is within the time limit', () => {
    const currentDate = new Date(Date.now());

    const result = isWithinTimeLimit(currentDate, 5);

    expect(result).toBe(true);
  });

  it('should return false when the time difference exceeds the time limit', () => {
    const currentDate = new Date();
    const fiveMinutesAgo = new Date(currentDate.getTime() - (5 * 60 * 1000 + 1000));

    const result = isWithinTimeLimit(fiveMinutesAgo, 5);

    expect(result).toBe(false);
  });

  it('should return true when the time difference is exactly equal to the time limit', () => {
    const currentDate = new Date();
    const fiveMinutesAgo = new Date(currentDate.getTime() - (5 * 60 * 1000));

    const result = isWithinTimeLimit(fiveMinutesAgo, 5);

    expect(result).toBe(true);
  });

  it('should handle a zero time limit correctly', () => {
    const currentDate = new Date();
    const fiveMinutesAgo = new Date(currentDate.getTime() - (5 * 60 * 1000));

    const result = isWithinTimeLimit(fiveMinutesAgo, 0);

    expect(result).toBe(false); // Assuming zero time limit should always return false
  });
});
