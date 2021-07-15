import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Box from './Box'
import Location from './Location'

export default class FitnessClass extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public instructor: string

  @column()
  public location: Location | string

  @column()
  public box: Box | string

  @column()
  public classTime: DateTime | string

  @column()
  public length: number

  @column()
  public equipmentProvided: string | null

  @column()
  public eqipmentRequired: string | null

  @column()
  public capacity: number

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}