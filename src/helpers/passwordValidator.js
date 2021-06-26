export function passwordValidator(password) {
  if (!password) return "Senha não pode ser vazia."
  if (password.length < 5) return 'Senha precisa ser maior que 5 dígitos.'
  return ''
}
