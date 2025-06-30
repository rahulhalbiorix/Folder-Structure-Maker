export interface BaseProperty {
  _id: number
  value: string
  type: string
  children: BaseProperty[]
}
