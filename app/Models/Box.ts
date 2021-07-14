import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

// need to have a date time for the scheduling here

export default class Box extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public name: string

  @column()
  public capacity: number

  @column()
  public available: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
