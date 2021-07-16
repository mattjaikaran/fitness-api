import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Box from './Box'
import Location from './Location'
import Instructor from './Instructor'

export default class FitnessClass extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public fitnessClassType: string

  @column()
  public instructor: Instructor | string

  @column()
  public location: Location | string

  @column()
  public boxes: Array<Box> | Array<string>

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
