import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'
import FitnessClass from './FitnessClass'

export default class Instructor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phone: string

  @column()
  public pastClasses: Array<FitnessClass> | null

  @column()
  public credentials: string | null

  @column()
  public bio: string | null

  @column()
  public instagram: string | null

  @column()
  public website: string | null

  @column()
  public photo: string | null

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (instructor: Instructor) {
    if (instructor.$dirty.password) {
      instructor.password = await Hash.make(instructor.password)
    }
  }
}
