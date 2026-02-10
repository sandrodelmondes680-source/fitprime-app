import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usar service role key para permissões administrativas
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Webhook Kiwify recebido:', JSON.stringify(body, null, 2));

    const { order_id, order_status, Customer, Product } = body;

    // Verificar se o pagamento foi aprovado
    if (order_status === 'paid' || order_status === 'approved') {
      const customerEmail = Customer?.email;

      if (!customerEmail) {
        return NextResponse.json(
          { error: 'Email do cliente não encontrado' },
          { status: 400 }
        );
      }

      // Determinar o plano (baseado no product_id ou nome do produto)
      const productName = Product?.product_name || '';
      const isPlanAnual = productName.toLowerCase().includes('anual') ||
                          productName.toLowerCase().includes('annual') ||
                          productName.toLowerCase().includes('ano');

      const premiumPlan = isPlanAnual ? 'annual' : 'monthly';

      // Calcular data de expiração
      const premiumStartedAt = new Date();
      const premiumExpiresAt = new Date();
      if (isPlanAnual) {
        premiumExpiresAt.setFullYear(premiumExpiresAt.getFullYear() + 1);
      } else {
        premiumExpiresAt.setMonth(premiumExpiresAt.getMonth() + 1);
      }

      // Buscar usuário pelo email
      const { data: profiles, error: searchError } = await supabaseAdmin
        .from('user_profiles')
        .select('*')
        .eq('email', customerEmail)
        .limit(1);

      if (searchError) {
        console.error('Erro ao buscar perfil:', searchError);
        return NextResponse.json(
          { error: 'Erro ao buscar perfil do usuário' },
          { status: 500 }
        );
      }

      if (profiles && profiles.length > 0) {
        // Atualizar usuário existente
        const { error: updateError } = await supabaseAdmin
          .from('user_profiles')
          .update({
            is_premium: true,
            premium_plan: premiumPlan,
            premium_started_at: premiumStartedAt.toISOString(),
            premium_expires_at: premiumExpiresAt.toISOString(),
            kiwify_order_id: order_id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profiles[0].id);

        if (updateError) {
          console.error('Erro ao atualizar perfil:', updateError);
          return NextResponse.json(
            { error: 'Erro ao atualizar perfil' },
            { status: 500 }
          );
        }

        console.log(`✅ Usuário ${customerEmail} atualizado para Premium ${premiumPlan}`);
      } else {
        console.log(`⚠️ Usuário ${customerEmail} não encontrado. Criar conta primeiro.`);
      }

      return NextResponse.json({
        success: true,
        message: 'Webhook processado com sucesso',
        email: customerEmail,
        plan: premiumPlan
      });
    }

    // Status de reembolso
    if (order_status === 'refunded' || order_status === 'cancelled') {
      const customerEmail = Customer?.email;

      if (customerEmail) {
        // Remover Premium
        await supabaseAdmin
          .from('user_profiles')
          .update({
            is_premium: false,
            premium_plan: null,
            premium_expires_at: null,
          })
          .eq('email', customerEmail);

        console.log(`⚠️ Premium removido para: ${customerEmail}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook recebido'
    });

  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// GET para teste
export async function GET() {
  return NextResponse.json({
    message: 'Webhook Kiwify FitPrime - Use POST para enviar dados'
  });
}
