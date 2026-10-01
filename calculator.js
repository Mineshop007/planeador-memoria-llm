/* Estimativa aproximada da memória de inferência de um transformer denso. Não é um benchmark. */
(function(root){
  function estimate(p){
    for(const k of ['parameters','bits','overhead','layers','kvHeads','headDim','context','parallel','kvBytes','reserve']) {
      if(!Number.isFinite(p[k]) || p[k]<0) throw new Error('Valor inválido: '+k);
    }
    if(!p.parameters || !p.bits || !p.layers || !p.kvHeads || !p.headDim || !p.context || !p.parallel || !p.kvBytes) throw new Error('Todos os valores, exceto a reserva e o acréscimo do formato, têm de ser positivos.');
    const weights=p.parameters*1e9*p.bits/8/2**30;
    const quantOverhead=weights*p.overhead/100;
    const kv=2*p.layers*p.kvHeads*p.headDim*p.context*p.parallel*p.kvBytes/2**30;
    return {weights,quantOverhead,kv,reserve:p.reserve,total:weights+quantOverhead+kv+p.reserve};
  }
  if(typeof module!=='undefined') module.exports={estimate};
  root.estimate=estimate;
})(typeof window==='undefined'?globalThis:window);
