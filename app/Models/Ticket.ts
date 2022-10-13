import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public status: 'open' | 'closed' | 'solving'

  @column()
  public priority: 'low' | 'medium' | 'high'

  @column()
  public location: string

  @column()
  public openerId: number

  @column()
  public assigneeId: number

  @hasOne(() => Profile, {
    foreignKey: 'id',
  })
  public opener: HasOne<typeof Profile>

  @hasOne(() => Profile, {
    foreignKey: 'id',
  })
  public assignee: HasOne<typeof Profile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
