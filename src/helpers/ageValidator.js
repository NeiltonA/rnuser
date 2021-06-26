export function ageValidator(age) {
  if (!age) return "Idade não pode ser vazio."
  if (age < 18) return 'Idade não pode ser menor que 18 anos.'
  return ''
}
