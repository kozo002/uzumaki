module.exports = {
  rootDir: '../',
  setupFilesAfterEnv: ['./test/setup.js'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/$1'
  }
}