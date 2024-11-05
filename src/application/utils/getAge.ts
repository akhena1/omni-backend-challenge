export function getAge(birthdate: Date): number {
  const today = new Date();
  const birthday = new Date(birthdate);

  let age = today.getFullYear() - birthday.getFullYear();
  const todayMonth = today.getMonth();
  const birthMonth = birthday.getMonth();

  // Ajusta a idade se o mês ou dia do aniversário ainda não tiver ocorrido este ano
  if (
    todayMonth < birthMonth ||
    (todayMonth === birthMonth && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}
