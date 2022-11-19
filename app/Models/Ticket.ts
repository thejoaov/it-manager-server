import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string | null

  @column()
  public status: 'open' | 'closed' | 'solving'

  @column()
  public priority: 'low' | 'medium' | 'high'

  @column()
  public location: string | null

  @column()
  public openerId: number

  @column()
  public assigneeId: number | null

  @belongsTo(() => Profile, {
    foreignKey: 'openerId',
    // localKey: 'openerId',
    // serializeAs: 'opener',
  })
  public opener: BelongsTo<typeof Profile>

  @belongsTo(() => Profile, {
    foreignKey: 'assigneeId',
    // localKey: 'assigneeId',
    // serializeAs: 'assignee',
  })
  public assignee: BelongsTo<typeof Profile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
