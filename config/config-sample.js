module.exports = {
  port: 3000,
  public_url: 'http://127.0.0.1:3000/',
  expire_minutes: 15,
  db: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nappikauppa2'
  },
  email: {
    mailgun: {
          api_key: '',
          domain: ''
        },
    from: ''
  },
  paytrail: {
    user: '13466',
    password: '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ'
  },
  admin_users: [
    {
      username: 'huuhaa',
      password: 'foobar'
    }
  ]
};
