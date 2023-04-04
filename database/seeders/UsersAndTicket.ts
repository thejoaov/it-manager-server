import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { TicketFactory } from 'Database/factories/TicketFactory'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  private async usersSeeds() {
    const admin = await User.updateOrCreate(
      { username: 'admin', email: 'admin@admin.com' },
      {
        username: 'admin',
        password: 'admin123',
        email: 'admin@admin.com',
      }
    )
    await admin.related('profile').updateOrCreate(
      {
        userId: admin.id,
      },
      {
        role: 'admin',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'admin',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'Ademilson',
        }),
      }
    )

    const guest = await User.updateOrCreate(
      { username: 'guest', email: 'guest@guest.com' },
      {
        password: 'guest123',
        username: 'guest',
        email: 'guest@guest.com',
      }
    )
    await guest.related('profile').updateOrCreate(
      {
        userId: guest.id,
      },
      {
        role: 'guest',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'guest',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'Guest',
        }),
      }
    )

    const user = await User.updateOrCreate(
      { username: 'user', email: 'user@user.com' },
      {
        password: 'user123',
        username: 'user',
        email: 'user@user.com',
      }
    )
    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
      },
      {
        role: 'user',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'user',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'User',
        }),
      }
    )

    const support = await User.updateOrCreate(
      { username: 'support', email: 'support@support.com' },
      {
        password: 'support123',
        username: 'support',
        email: 'support@support.com',
      }
    )
    await support.related('profile').updateOrCreate(
      {
        userId: user.id,
      },
      {
        role: 'support',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'support',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'Support',
        }),
      }
    )

    const technician = await User.updateOrCreate(
      { username: 'technician', email: 'technician@technician.com' },
      {
        password: 'technician123',
        username: 'technician',
        email: 'technician@technician.com',
      }
    )
    await technician.related('profile').updateOrCreate(
      {
        userId: technician.id,
      },
      {
        role: 'technician',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'technician',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'Technician',
        }),
      }
    )

    const manager = await User.updateOrCreate(
      { username: 'manager', email: 'manager@manager.com' },
      {
        password: 'manager123',
        username: 'manager',
        email: 'manager@manager.com',
      }
    )
    await manager.related('profile').updateOrCreate(
      {
        userId: manager.id,
      },
      {
        role: 'manager',
        birthdate: DateTime.fromJSDate(faker.date.past(20)),
        telephone: faker.phone.number('86 9########'),
        jobTitle: 'manager',
        startDate: DateTime.fromJSDate(faker.date.past(1)),
        name: faker.name.fullName({
          firstName: 'Manager',
        }),
      }
    )

    return { admin, guest, user, support, technician, manager }
  }

  private async ticketsSeeds() {
    const { admin, user, support, technician, manager } = await this.usersSeeds()

    await TicketFactory.merge({
      openerId: admin.id,
    }).createMany(5)
    await TicketFactory.merge({
      openerId: admin.id,
      assigneeId: technician.id,
    }).createMany(5)

    await TicketFactory.merge({
      openerId: user.id,
    }).createMany(5)
    await TicketFactory.merge({
      openerId: user.id,
      assigneeId: technician.id,
    }).createMany(5)

    await TicketFactory.merge({
      openerId: support.id,
    }).createMany(5)
    await TicketFactory.merge({
      openerId: support.id,
      assigneeId: technician.id,
    }).createMany(5)

    await TicketFactory.merge({
      openerId: technician.id,
    }).createMany(5)
    await TicketFactory.merge({
      openerId: technician.id,
      assigneeId: technician.id,
    }).createMany(5)

    await TicketFactory.merge({
      openerId: manager.id,
    }).createMany(5)

    await TicketFactory.merge({
      openerId: manager.id,
      assigneeId: technician.id,
    }).createMany(5)
  }

  public async run() {
    // Write your database queries inside the run method
    await this.ticketsSeeds()
  }
}
