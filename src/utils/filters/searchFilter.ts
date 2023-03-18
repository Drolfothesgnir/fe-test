export default function filter(
  query: string,
  config: Record<string, any>
): Record<string, any> {
  if (!query.length)
    return {
      ...config,
      q: undefined,
    };

  return { ...config, q: query };
}
