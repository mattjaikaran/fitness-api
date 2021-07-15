import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'

// need to have a date time for the scheduling here

export default class Box extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: Location | string

  @column()
  public name: string

  @column()
  public capacity: number | null

  @column()
  public available: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
