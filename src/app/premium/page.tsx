              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                  selectedPlan === 'monthly'
                    ? 'border-[#00FF00] bg-[#00FF00]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {selectedPlan === 'monthly' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#00FF00] text-[#0D0D0D] px-3 py-1 rounded-full text-sm font-bold">
                      Selecionado
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2">Plano Mensal</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">R$ 19,90</span>
                    <span className="text-white/60">/mês</span>
                  </div>
                  <p className="text-white/60 text-sm">Flexibilidade total, cancele quando quiser</p>
                </div>
              </div>

              {/* Annual Plan */}
              <div
                onClick={() => setSelectedPlan('annual')}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                  selectedPlan === 'annual'
                    ? 'border-[#00FF00] bg-[#00FF00]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                {selectedPlan === 'annual' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#00FF00] text-[#0D0D0D] px-3 py-1 rounded-full text-sm font-bold">
                      Selecionado
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-[#00FF00] text-[#0D0D0D] px-2 py-1 rounded-full text-xs font-bold">
                    2 MESES GRÁTIS
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">Plano Anual</h4>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">R$ 16,58</span>
                      <span className="text-white/60">/mês</span>
                    </div>
                    <p className="text-sm text-[#00FF00] font-semibold">R$ 199,90 por ano</p>
                    <p className="text-white/60 text-sm mt-2">Economize 34% - Melhor valor!</p>
                  </div>
                </div>
              </div>