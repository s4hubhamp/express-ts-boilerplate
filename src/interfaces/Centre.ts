export default interface Centre {
  _id?: string
  code: string
  name?: string
  address?: string
  status: 'active' | 'inactive' | 'down'
  createdAt?: Date
  updatedAt?: Date
}
