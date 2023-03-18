export default function deleteObjectProperty(
  obj: { [key: string]: any },
  prop: string
) {
  const { [prop]: _, ...rest } = obj;
  return rest;
}
