export function calculateAge(dob: string) {
  const dateOfBirth = new Date(dob)
  const month_diff = Date.now() - dateOfBirth.getTime()
  const age_dt = new Date(month_diff)
  const year = age_dt.getUTCFullYear()
  const age = Math.abs(year - 1970)
  return age
}

export function calculateDOB(age: number) {
  const currentYear = new Date().getUTCFullYear()
  const birthDate = new Date(currentYear - age, 0, 1)
  return birthDate.toISOString()
}
