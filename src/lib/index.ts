/**
 * Example library function
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Example library function with options
 */
export interface GreetingOptions {
  prefix?: string;
  suffix?: string;
}

export function greetingWithOptions(
  name: string,
  options: GreetingOptions = {},
): string {
  const { prefix = "Hello", suffix = "!" } = options;
  return `${prefix}, ${name}${suffix}`;
}

// Re-export all modules
export * from "./utils";
