import fs from "fs";
import promptSync from 'prompt-sync';
const prompt = promptSync();


const raw = fs.readFileSync("dados01.txt", "utf8");// Leitura e parse do arquivo JSON
const dadosBrutos= JSON.parse(raw);// Filtragem de dados inválidos
const falhasErro= dadosBrutos.filter(item => item.status === "falha"); //
const dados = JSON.parse(raw).filter(item =>
  item.orgao &&
  item.data &&
  item.valor !== undefined &&
  item.status &&
  !(item.status === "falha" && (!item.motivo || item.motivo.trim() === ""))
);//
// TotalGeral de repasses por orgão
const totalGeralPorOrgao = dados.reduce((acc, item) => {
  acc[item.orgao] = (acc[item.orgao] || 0) + 1;
  return acc;
}, {});



// Q01 - Total de repasses
console.log("Q01 - Total de repasses:", dados.length);
console.log("-".repeat(60));
//  Q02_1a Apenas sucessos
const sucessos = dados.filter(item => item.status === "sucesso");
console.log("Q02_1a - Total de repasses bem-sucedidos:", sucessos.length);
console.log("-".repeat(60));
// Q02_1b Total por órgão
const totalSucessoPorOrgao = sucessos.reduce((acc, item) => {
  acc[item.orgao] = (acc[item.orgao] || 0) + 1;
  return acc;
}, {});

console.log("Q02_1b - Total de repasses bem-sucedidos por órgão:");
console.log(totalSucessoPorOrgao);
console.log("-".repeat(60));
// Q02_1c Valor total sucessos
const valorTotalSucesso = sucessos.reduce((acc, item) => acc + item.valor, 0);
console.log("Q02_1c - Valor total dos repasses bem-sucedidos:", valorTotalSucesso.toFixed(2));
console.log("-".repeat(60));
// Q02_1d Valor por órgão
const valorSucessoPorOrgao = sucessos.reduce((acc, item) => {
  acc[item.orgao] = (acc[item.orgao] || 0) + item.valor;
  return acc;
}, {});

console.log("Q02_1d Valor dos repasses bem-sucedidos por órgão:");
console.log(valorSucessoPorOrgao);
console.log("-".repeat(60));



//Q02_2 Resutado Detalhado com Falhas
// Q02_2-a Quantidade Total de falhas
const falhas = dados.filter(item => item.status === "falha");
console.log("Q02_2a - Quantidade Total de repasses com falha:", falhas.length);
console.log("-".repeat(60));



// Q02_2b Quantidade falha por órgão
const totalFalhaPorOrgao = falhas.reduce((acc, item) => {
  acc[item.orgao] = (acc[item.orgao] || 0) + 1;
  return acc;
}, {});

console.log("Q02_2b - Quantidade de repasses com falha por órgão:");
console.log(totalFalhaPorOrgao);
console.log("-".repeat(60));

// Q02_2c Quantidade total Motivo de Falha
const valorTotalMotivoFalha = falhas.reduce((acc, item) => {
    acc[item.motivo] = (acc[item.motivo] || 0) + 1;
    return acc;
}, {});
 
console.log("Q02_2c - Quantidade total dos repasses com falha por motivo:");
console.log(valorTotalMotivoFalha);
console.log("-".repeat(60));

// Q02_2d Valor total falhas
const valorTotalFalha = falhas.reduce((acc, item) => acc + item.valor, 0);
console.log("Q02_2d - Valor total dos repasses com falha:", valorTotalFalha.toFixed(2));

console.log("-".repeat(60));
// Q02_2e Valor falhas por órgão
const valorFalhaPorOrgao = falhas.reduce((acc, item) => {
  acc[item.orgao] = (acc[item.orgao] || 0) + item.valor;
  return acc;
}, {});

console.log("Q02_2e - Valor total dos repasses com falha por órgão:");
console.log(valorFalhaPorOrgao);
console.log("-".repeat(60));

// Q02_2f Quantidade total falhas por motivo
const totalFalhaPorMotivo = falhas.reduce((acc, item) => {
  acc[item.motivo] = (acc[item.motivo] || 0) + item.valor;
  return acc;
}, {});

console.log("Q02_2f - Quantidade total de repasses com falha por motivo:");
console.log(totalFalhaPorMotivo);
console.log("-".repeat(60));

// Q03 Estatistica de Repasses
// Q03_ 4a Repasse com mair valor geral
const repasseMaiorValor = dados.reduce((max, item) => item.valor > max.valor ? item : max, dados[0]);
console.log("Q03_4a - Repasse com maior valor geral:");
console.log(repasseMaiorValor);
console.log("-".repeat(60));

// Q03_4b Repasse com menor valor geral
const repasseMenorValor = dados.reduce((min, item) => item.valor < min.valor ? item : min, dados[0]);
console.log("Q03_4b - Repasse com menor valor geral:");
console.log(repasseMenorValor);
console.log("-".repeat(60));

// Q03_4c Dia com  mais repasses
const diaMaisRepasses = dados.reduce((acc, item) => {
    acc[item.data] = (acc[item.data] || 0) + 1;
    return acc;
}, {});
const diaComMaisRepasses = Object.entries(diaMaisRepasses)
  .sort((a, b) => b[1] - a[1])[0];
console.log("Q03_4c - Dia com mais repasses:", diaComMaisRepasses);
console.log("-".repeat(60));

// Q03_4d Orgão com mais repasses Geral

const valoresGerais = Object.values(totalGeralPorOrgao);
const maxGeral = Math.max(...valoresGerais);

const orgaosEmpatadosGeral = Object.entries(totalGeralPorOrgao)
  .filter(([orgao, valor]) => valor === maxGeral);

console.log("Q03_4d - Órgãos com MAIS repasses (geral):");
console.log(orgaosEmpatadosGeral);
console.log("-".repeat(60));

// Q03_4e Orgão com mais repasses Sucesso
const valoresSucesso = Object.values(totalSucessoPorOrgao);
const maxSucesso = Math.max(...valoresSucesso);

const orgaosEmpatadosSucesso = Object.entries(totalSucessoPorOrgao)
  .filter(([orgao, valor]) => valor === maxSucesso);

console.log("Q03_4e - Órgãos com MAIS repasses (sucesso):");
console.log(orgaosEmpatadosSucesso);
console.log("-".repeat(60));

// Q03_4f Orgão com mais repasses Falha
const valoresFalha = Object.values(totalFalhaPorOrgao);
const maxFalha = Math.max(...valoresFalha);

const orgaosEmpatadosFalha = Object.entries(totalFalhaPorOrgao)
  .filter(([orgao, valor]) => valor === maxFalha);

console.log("Q03_4f - Órgãos com MAIS repasses (falha):");
console.log(orgaosEmpatadosFalha);
console.log("-".repeat(60));

//Q03_4g Motivo de falha com mais repasses
const valoresMotivoFalha = Object.values(valorTotalMotivoFalha);
const maxMotivoFalha = Math.max(...valoresMotivoFalha);

const motivoEmpatadosFalha = Object.entries(valorTotalMotivoFalha)
  .filter(([motivo, valor]) => valor === maxMotivoFalha);

console.log("Q03_4g - Motivo de falha com MAIS repasses:");
console.log(motivoEmpatadosFalha);
console.log("-".repeat(60));

//Q04 Apresentação automatica de Detalhes de Transações
//  Função de normalização: remove acentos, converte para minúsculas e remove espaços extras
const normalizarTexto = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .normalize('NFD')                     // Decompõe caracteres acentuados (ex: á → a + ´)
    .replace(/[\u0300-\u036f]/g, '')     // Remove os diacríticos (acentos)
    .toLowerCase()                        // Tudo minúsculo
    .trim();                              // Remove espaços no início/fim
};

//Entrada do usuário
const orgaoDigitado = prompt("Q04Digite o nome do órgão para exibir suas transações: ");
const orgaoNormalizadoUsuario = normalizarTexto(orgaoDigitado);

//Filtragem usando normalização em tempo real (sem alterar dadosBrutos!)
const transacoesOrgao = dadosBrutos.filter(item => {
  const orgaoNormalizadoItem = normalizarTexto(item.orgao);
  return orgaoNormalizadoItem === orgaoNormalizadoUsuario;
});

//Saída
if (transacoesOrgao.length === 0) {
  console.log(`\n Nenhuma transação encontrada para: "${orgaoDigitado}"`);
  console.log(`  Você digitou (normalizado): "${orgaoNormalizadoUsuario}"`);
  // Opcional: sugerir órgãos próximos (se quiser, posso adicionar depois)
} else {
  console.log(`\n Encontradas ${transacoesOrgao.length} transação(ões) para: "${orgaoDigitado}"`);
  console.log("=".repeat(60));

  transacoesOrgao.forEach((item, i) => {
    console.log(`[#${i + 1}]`);
    console.log(`Órgão.............: ${item.orgao}`); // mostra o original (com acento/maiúscula)
    console.log(`Data..............: ${item.data || "(não informada)"}`);
    console.log(`Valor.............: ${item.valor !== undefined ? item.valor : "(não informado)"}`);
    console.log(`Status............: ${item.status || "(não informado)"}`);
    if (item.status === "falha") {
      console.log(`Motivo............: ${item.motivo || "(não informado)"}`);
    }
    console.log("-".repeat(60));
  });
}


console.log("=".repeat(60));
console.log("\n");


// Q05 - Registros com erro de processamento
const processamentoErro= dadosBrutos.
filter(item =>  item.status === "falha" 
     && (!item.motivo 
     || item.motivo.trim() === ""));


processamentoErro.forEach((item, index) => {
  console.log(`Q05Repasse(s) com erro de processamento: ${index + 1}`);
  console.log("\n");
  console.log(`Órgão.............: ${item.orgao}`);
  console.log(`Data..............: ${item.data}`);
  console.log(`Valor.............: ${item.valor}`);
  console.log(`Status............: ${item.status}`);
  console.log(`Erro..............: Falha sem motivo informado`);
  console.log("-".repeat(60));
});
console.log("-".repeat(60));

//Q06 Demostração do ajuste na Estatística de Repasses

console.log("Q06 - Ajuste na Estatística de Repasses considerando erros de processamento:");
console.log("-".repeat(60));

// Valor tota de repsse que falhou sem erro de processamento
const valorTotalFalhaSemErro = falhas.reduce((acc, item) => acc + item.valor, 0);
console.log("Q06 - Valor total dos repasses com falha e Sem erro de processamento:", valorTotalFalhaSemErro.toFixed(2));

// Valor total de repasses que falhou e com erro de processamento
const valorTotalFalhaComErro = falhasErro.reduce((acc, item) => acc + item.valor, 0);
console.log("Q06 - Valor total dos repasses com falha e Com erro de processamento:", valorTotalFalhaComErro.toFixed(2));
console.log("-".repeat(60));


// Órgão definido automaticamente
//const prompt = require('prompt-sync')();

//import promptSync from 'prompt-sync';
//const prompt = promptSync();



