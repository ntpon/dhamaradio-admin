export default interface IMember {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  isActive: boolean
  role: {
    name: string
  }
  createdAt: string
}
