export const mustCheckEnv = (...names: string[]) => {
  const empty = names.filter((key) => !process.env[key]);
  if (empty.length) {
    throw new Error(`Missing env ${empty.join(", ")}`);
  }
};

export const mustCheckEnvValues = (name: string, values: string[]) => {
  const env= process.env[name] as string
  if (!values.includes(env)) {
    throw new Error(`Invalid env ${name}=${env} expect ${values.join(' | ')}`)
  }
}

export const envToBoolean = (name: string) => {
  const env = process.env[name]
  return env === '1' || env === 'true'
}
