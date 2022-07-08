import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync('123456', salt)

const Users = [
  {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: hash,
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@mail.com',
    password: hash,
  },
  {
    name: 'Jane Doe',
    email: 'jane@mail.com',
    password: hash,
  },
]

export default Users
