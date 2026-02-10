import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log para debug (remover em produção)
    console.log('Webhook Kiwify recebido:', JSON.stringify(body, null, 2));

    // Kiwify envia os seguintes campos principais:
    // - order_id: ID do pedido
    // - order_status: Status do pedido (paid, approved, refunded, etc)
    // - Product: Informações do produto
    // - Customer: Informações do cliente (email, name, etc)

    const { order_status, Customer } = body;

    // Verificar se o pagamento foi aprovado
    if (order_status === 'paid' || order_status === 'approved') {
      const customerEmail = Customer?.email;

      if (!customerEmail) {
        return NextResponse.json(
          { error: 'Email do cliente não encontrado' },
          { status: 400 }
        );
      }

      // Aqui você pode:
      // 1. Salvar no banco de dados que o usuário é Premium
      // 2. Enviar email de boas-vindas
      // 3. Criar usuário no sistema de autenticação

      // Por enquanto, apenas retornar sucesso
      console.log(`✅ Pagamento aprovado para: ${customerEmail}`);

      return NextResponse.json({
        success: true,
        message: 'Webhook processado com sucesso'
      });
    }

    // Outros status (refunded, cancelled, etc)
    return NextResponse.json({
      success: true,
      message: 'Status não requer ação'
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
