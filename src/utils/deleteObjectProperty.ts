export default function deleteObjectProperty(
  obj: { [key: string]: any },
  prop: string
) {
  if (!obj.hasOwnProperty(prop)) return obj;
  const { [prop]: _, ...rest } = obj;
  return rest;
}
