import IAblum from "./IAlbum"
export default interface IAudio {
  id: string
  name: string
  source: string
  totalView: string
  albumId: string
  album: IAblum
  isActive: boolean
  createdAt: string
  updatedAt: string
}
