import type { LoginSchema } from '../schemas/auth.schema';

export async function loginAction(data: LoginSchema) {
  console.log('Dados de login:', data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (data.email === 'error@test.com') {
    return { success: false, message: 'Credenciais inválidas.' };
  }

  return { success: true, message: 'Login realizado com sucesso!' };
}
