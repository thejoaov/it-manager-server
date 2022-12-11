yarn run v1.22.19
$ nyc yarn test
$ node ace test
c[ info ]  running tests...
{"level":30,"time":1670748771219,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"started server on 0.0.0.0:3333"}

functional / dashboard [GET][2m (tests/functional/dashboard.spec.ts)[22m
  [32m✔[39m [90m/dashboard [GET] when admin[39m [2m(447ms)[22m
  [32m✔[39m [90m/dashboard [GET] when user[39m [2m(92ms)[22m

functional / login[2m (tests/functional/login.spec.ts)[22m
  [32m✔[39m [90m/login [POST][39m [2m(112ms)[22m
  [32m✔[39m [90m/login [POST] with invalid credentials[39m [2m(19ms)[22m
  [32m✔[39m [90m/login [POST] with invalid body[39m [2m(4ms)[22m

functional / /profiles [GET] group[2m (tests/functional/profile.spec.ts)[22m
  [32m✔[39m [90m/profiles [GET] list[39m [2m(72ms)[22m
{"level":40,"time":1670748772433,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/profiles [GET] search by name[39m [2m(15ms)[22m
{"level":40,"time":1670748772447,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/profiles [GET] search by email[39m [2m(14ms)[22m
{"level":40,"time":1670748772466,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/profiles [GET] search by username[39m [2m(22ms)[22m

functional / profile[2m (tests/functional/profile.spec.ts)[22m
  [32m✔[39m [90m/profile/:id [GET][39m [2m(22ms)[22m
  [32m✔[39m [90m/profile/:id [GET] with invalid token[39m [2m(15ms)[22m
  [32m✔[39m [90m/profile/:id [POST][39m [2m(33ms)[22m
  [32m✔[39m [90m/profile/:id [PUT][39m [2m(27ms)[22m

functional / tickets/count [GET][2m (tests/functional/ticket.spec.ts)[22m
  [32m✔[39m [90m/tickets/count [GET][39m [2m(138ms)[22m

functional / tickets [GET][2m (tests/functional/ticket.spec.ts)[22m
{"level":40,"time":1670748772791,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/tickets [GET][39m [2m(93ms)[22m
{"level":40,"time":1670748772889,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/tickets?status=open [GET][39m [2m(105ms)[22m
{"level":40,"time":1670748772987,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"A valid integer must be provided to offset"}
  [32m✔[39m [90m/tickets?status=open [GET][39m [2m(88ms)[22m
  [32m✔[39m [90m/tickets/:id [GET][39m [2m(83ms)[22m

functional / tickets [PUT][2m (tests/functional/ticket.spec.ts)[22m
  [32m✔[39m [90m/tickets/:id [PUT][39m [2m(126ms)[22m
{"level":40,"time":1670748773288,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_ROW_NOT_FOUND: Row not found"}
  [32m✔[39m [90m/tickets/:id [PUT] with invalid id[39m [2m(84ms)[22m
{"level":40,"time":1670748773366,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_AUTHORIZATION_FAILURE: Not authorized to perform this action"}
  [32m✔[39m [90m/tickets/:id [PUT] with invalid permissions (guest)[39m [2m(77ms)[22m

functional / tickets [DELETE][2m (tests/functional/ticket.spec.ts)[22m
  [32m✔[39m [90m/tickets/:id [DELETE][39m [2m(83ms)[22m
{"level":40,"time":1670748773526,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_ROW_NOT_FOUND: Row not found"}
  [32m✔[39m [90m/tickets/:id [DELETE] with invalid id[39m [2m(76ms)[22m
{"level":40,"time":1670748773601,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_AUTHORIZATION_FAILURE: Not authorized to perform this action"}
  [32m✔[39m [90m/tickets/:id [DELETE] with invalid permissions (guest)[39m [2m(75ms)[22m
{"level":40,"time":1670748773681,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_AUTHORIZATION_FAILURE: Not authorized to perform this action"}
  [32m✔[39m [90m/tickets/:id [DELETE] with invalid permissions (technician)[39m [2m(80ms)[22m

functional / tickets [POST][2m (tests/functional/ticket.spec.ts)[22m
  [32m✔[39m [90m/tickets [POST] with only required (opener_id: admin)[39m [2m(82ms)[22m
  [32m✔[39m [90m/tickets [POST] with (opener_id: admin, assignee_id: admin)[39m [2m(78ms)[22m
  [32m✔[39m [90m/tickets [POST] with (opener_id: admin, assignee_id: technician)[39m [2m(79ms)[22m
  [32m✔[39m [90m/tickets [POST] with (opener_id: admin, assignee_id: technician)[39m [2m(77ms)[22m
  [32m✔[39m [90m/tickets [POST] with (opener_id: admin, assignee_id: manager)[39m [2m(79ms)[22m
  [32m✔[39m [90m/tickets [POST] with (opener_id: admin, assignee_id: support)[39m [2m(82ms)[22m
  [32m✔[39m [90m/tickets [POST] with invalid data[39m [2m(78ms)[22m
  [32m✔[39m [90m/tickets [POST] with invalid permissions (opener_id: guest, assignee_id: technician)[39m [2m(78ms)[22m
  [32m✔[39m [90m/tickets [POST] with invalid permissions (opener_id: admin, assignee_id: user)[39m [2m(78ms)[22m
{"level":40,"time":1670748774471,"pid":49442,"hostname":"MacBook-Pro-de-Joao.local","name":"it-manager-server","msg":"E_AUTHORIZATION_FAILURE: Not authorized to perform this action"}
  [32m✔[39m [90m/tickets [POST] with invalid permissions (guest token)[39m [2m(77ms)[22m

functional / users[2m (tests/functional/users.spec.ts)[22m
  [32m✔[39m [90m/users [POST][39m [2m(68ms)[22m
  [32m✔[39m [90m/users/:id [GET][39m [2m(19ms)[22m
  [32m✔[39m [90m/users/:id [PUT][39m [2m(30ms)[22m
  [32m✔[39m [90m/users/:id [DELETE][39m [2m(17ms)[22m

[42m[30m PASSED [49m[39m

[2mtotal        : 39[22m
[2mpassed       : 39[22m
[2mduration     : 6s[22m
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   95.32 |    80.76 |   89.36 |    95.3 |                   
 app/Controllers/Http       |    94.2 |    79.16 |   88.57 |   94.16 |                   
  DashboardController.ts    |      76 |    66.66 |   69.23 |      76 | 10-23             
  ProfilesController.ts     |   94.28 |    66.66 |     100 |   94.11 | 27-29             
  SessionsController.ts     |     100 |      100 |     100 |     100 |                   
  TicketsController.ts      |     100 |    91.66 |     100 |     100 | 56                
  UsersController.ts        |     100 |      100 |     100 |     100 |                   
 app/Exceptions             |     100 |      100 |     100 |     100 |                   
  Handler.ts                |     100 |      100 |     100 |     100 |                   
 app/Middleware             |   85.71 |      100 |      75 |   85.71 |                   
  Auth.ts                   |     100 |      100 |     100 |     100 |                   
  SilentAuth.ts             |       0 |      100 |       0 |       0 | 18-19             
 app/Routes                 |     100 |      100 |     100 |     100 |                   
  DashboardRoutes.ts        |     100 |      100 |     100 |     100 |                   
  ProfileRoutes.ts          |     100 |      100 |     100 |     100 |                   
  SessionRoutes.ts          |     100 |      100 |     100 |     100 |                   
  TicketRoutes.ts           |     100 |      100 |     100 |     100 |                   
  UserRoutes.ts             |     100 |      100 |     100 |     100 |                   
 app/Validators             |     100 |      100 |     100 |     100 |                   
  ProfileUpdateValidator.ts |     100 |      100 |     100 |     100 |                   
  ProfileValidator.ts       |     100 |      100 |     100 |     100 |                   
  SessionValidator.ts       |     100 |      100 |     100 |     100 |                   
  TicketUpdateValidator.ts  |     100 |      100 |     100 |     100 |                   
  TicketValidator.ts        |     100 |      100 |     100 |     100 |                   
  UserUpdateValidator.ts    |     100 |      100 |     100 |     100 |                   
  UserValidator.ts          |     100 |      100 |     100 |     100 |                   
 start                      |     100 |      100 |     100 |     100 |                   
  routes.ts                 |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------
Done in 16.00s.
