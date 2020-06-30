/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */
const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

if (typeof window !== "undefined") {
  throw new Error(
    "It looks like you're loading the configuration in the browser. Use process.env.VARIABLE instead"
  )
}

function loadEnvFile(configPath) {
  const configuration = dotenv.config({ path: configPath })

  // eslint-disable-next-line no-console
  console.info(`> Loading configuration from ${configPath}`)

  if (configuration.error) {
    throw configuration.error
  }

  return configuration.parsed
}

function loadConfiguration() {
  const envDir = path.join(process.cwd(), ".env")
  const environments = fs.readdirSync(envDir)

  const nodeEnv = process.env.NODE_ENV || "development"

  const env = process.env.CONFIG_ENV || nodeEnv
  const localEnv = `${env}.local`
  const version = process.env.VERSION

  if (!environments.includes(env)) {
    throw new Error(`Invalid environment: ${env}`)
  }

  const configPath = path.resolve(envDir, env)
  const configuration = {
    CONFIG_ENV: env,
    VERSION: version,
    ...loadEnvFile(configPath),
  }

  if (environments.includes(localEnv)) {
    const localConfiguration = loadEnvFile(path.resolve(envDir, localEnv))
    return { ...configuration, ...localConfiguration }
  }

  return configuration
}

module.exports = loadConfiguration
