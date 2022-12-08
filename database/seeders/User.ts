import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  private async adminSeed() {
    const user = await User.updateOrCreate(
      { username: 'admin', email: 'admin@admin.com' },
      {
        username: 'admin',
        password: 'admin123',
        email: 'admin@admin.com',
      }
    )
    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
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
  }

  private async guestSeed() {
    const user = await User.updateOrCreate(
      { username: 'guest', email: 'guest@guest.com' },
      {
        password: 'guest123',
        username: 'guest',
        email: 'guest@guest.com',
      }
    )
    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
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
  }

  private async userSeed() {
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
  }

  private async supportSeed() {
    const user = await User.updateOrCreate(
      { username: 'support', email: 'support@support.com' },
      {
        password: 'support123',
        username: 'support',
        email: 'support@support.com',
      }
    )
    await user.related('profile').updateOrCreate(
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
  }

  private async technicianSeed() {
    const user = await User.updateOrCreate(
      { username: 'technician', email: 'technician@technician.com' },
      {
        password: 'technician123',
        username: 'technician',
        email: 'technician@technician.com',
      }
    )
    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
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
  }

  private async managerSeed() {
    const user = await User.updateOrCreate(
      { username: 'manager', email: 'manager@manager.com' },
      {
        password: 'manager123',
        username: 'manager',
        email: 'manager@manager.com',
      }
    )
    await user.related('profile').updateOrCreate(
      {
        userId: user.id,
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
  }

  public async run() {
    // admin user
    await this.adminSeed()
    // guest user
    await this.guestSeed()
    // common user
    await this.userSeed()
    // support user
    await this.supportSeed()
    // technician user
    await this.technicianSeed()
    // manager user
    await this.managerSeed()
  }
}
