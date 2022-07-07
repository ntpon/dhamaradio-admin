import IPriest from "./IPriest"
export default interface Priest {
  id: string
  name: string
  description: string
  coverImage: string
  isRecommend: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  priest: IPriest
}
