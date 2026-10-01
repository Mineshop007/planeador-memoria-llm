# Planeador de memória LLM

Calculadora gratuita da memória (VRAM) necessária para executar um LLM, que funciona no navegador, mesmo sem ligação à Internet: pesos do modelo, acréscimo do formato de quantização, cache KV e reserva de execução, calculados em separado.

**Online:** https://mineshop007.github.io/planeador-memoria-llm/

## Fórmulas

- **Pesos em bruto (GiB)** = parâmetros × 10⁹ × bits ÷ 8 ÷ 2³⁰
- **Acréscimo do formato** = pesos × acréscimo (%), um pressuposto ajustável (15 % por omissão)
- **Cache KV (GiB)** = 2 × camadas × cabeças KV × dimensão de cabeça × tokens × sequências em paralelo × bytes por valor ÷ 2³⁰
- **Total** = pesos + acréscimo + cache KV + reserva

Exemplo (teste): 8B a 4 bits, 32 camadas, 8 cabeças KV, dimensão de cabeça 128, contexto de 8192 tokens, cache FP16 → cache KV = 1,00 GiB.

## Limites

Estimativa para transformers densos com cache de atenção completa; não é um benchmark e não garante velocidade. Arquiteturas com janela deslizante, MLA, híbridas ou MoE podem diferir bastante. Várias GPU não formam um único bloco de memória. Os resultados são apresentados com vírgula decimal; a exportação CSV usa `;` como separador.

## Testes

```
node test.js
```

## Sobre o projeto

Edição em português europeu do [LLM Memory Planner](https://github.com/Mineshop007/llm-memory-planner) (também em [alemão](https://github.com/Mineshop007/llm-speicher-planer), [francês](https://github.com/Mineshop007/planificateur-memoire-llm), [letão](https://github.com/Mineshop007/llm-atminas-planotajs) e [espanhol](https://github.com/Mineshop007/planificador-memoria-llm)), oferecida pela [Mineshop.eu](https://mineshop.eu/pt): [placas gráficas](https://mineshop.eu/pt/graphic-card-gpu-en) e [estações de trabalho de IA](https://mineshop.eu/pt/ai-workstation). Sem cookies nem ferramentas de análise; os valores introduzidos não são enviados para lado nenhum.
