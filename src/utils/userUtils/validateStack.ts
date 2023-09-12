export function validateStack(stack: string[] | undefined): string | null {
  if (!stack) {
    return null;
  }
  if (stack.length < 1) {
    return "The 'stack' field cannot be empty.";
  }
  if (stack.length > 20) {
    return "The 'stack' field cannot contain more than 20 elements.";
  }
  return null;
}