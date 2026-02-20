/**
 * Helper para validar status Premium do usuário
 *
 * REGRAS:
 * 1. is_premium deve ser true
 * 2. premium_expires_at deve existir
 * 3. premium_expires_at deve ser maior que a data atual
 */

interface PremiumProfile {
  is_premium: boolean;
  premium_expires_at: string | null;
  premium_plan?: string | null;
}

/**
 * Valida se o usuário tem acesso Premium ativo
 * @param profile - Perfil do usuário com dados de Premium
 * @returns true se Premium está ativo, false caso contrário
 */
export function isPremiumActive(profile: PremiumProfile | null): boolean {
  // 1. Verificar se profile existe
  if (!profile) {
    return false;
  }

  // 2. Verificar se is_premium é true
  if (!profile.is_premium) {
    return false;
  }

  // 3. Verificar se há uma data de expiração
  if (!profile.premium_expires_at) {
    return false;
  }

  // 4. Validar se a data de expiração é maior que a data atual
  try {
    const expirationDate = new Date(profile.premium_expires_at);
    const now = new Date();

    // Premium ativo se a data de expiração for no futuro
    return expirationDate > now;
  } catch (error) {
    // Se houver erro ao parsear a data, considerar Premium inativo
    console.error('Erro ao validar data de expiração Premium:', error);
    return false;
  }
}

/**
 * Retorna quantos dias faltam até o Premium expirar
 * @param profile - Perfil do usuário com dados de Premium
 * @returns Número de dias restantes, ou null se Premium inativo
 */
export function getDaysUntilExpiration(profile: PremiumProfile | null): number | null {
  if (!profile || !profile.premium_expires_at) {
    return null;
  }

  try {
    const expirationDate = new Date(profile.premium_expires_at);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  } catch (error) {
    console.error('Erro ao calcular dias até expiração:', error);
    return null;
  }
}

/**
 * Retorna uma mensagem de status Premium
 * @param profile - Perfil do usuário com dados de Premium
 * @returns Mensagem descritiva do status Premium
 */
export function getPremiumStatusMessage(profile: PremiumProfile | null): string {
  if (!profile) {
    return 'Perfil não encontrado';
  }

  if (!profile.is_premium) {
    return 'Plano Free';
  }

  if (!profile.premium_expires_at) {
    return 'Premium inativo (sem data de expiração)';
  }

  const daysLeft = getDaysUntilExpiration(profile);

  if (daysLeft === null || daysLeft <= 0) {
    return 'Premium expirado';
  }

  if (daysLeft === 1) {
    return 'Expira amanhã';
  }

  if (daysLeft <= 7) {
    return `Expira em ${daysLeft} dias`;
  }

  return `Premium ativo (${daysLeft} dias restantes)`;
}
