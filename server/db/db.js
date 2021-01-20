const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,

    // starting below this line, I have added code>>>
    // UNCOMMENT ONLY WHEN DEPLOYING TO HEROKU, KEEP THIS COMMENTED OUT WHEN RUNNING LOCALLY-->
    operatorsAliases: false,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        ssl: true
      }
    }
    // code above is what I added^^^
  }
)
// copied from stack overflow to address the fact that sequelize is converting decimals into strings-->
Sequelize.postgres.DECIMAL.parse = function(value) {
  return parseFloat(value)
}
//^^^^

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
