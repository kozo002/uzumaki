export function convert (data: UserPayloadT): UserT {
  return {
    id: parseInt(data.id),
    name: data.name
  }
}