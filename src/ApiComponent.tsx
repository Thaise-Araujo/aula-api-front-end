// ================================
// SEÇÃO 1: IMPORTAÇÕES
// ================================
// LINHA 1-4: Importando ferramentas necessárias
// 'import' = PALAVRA-CHAVE que importa código de outros lugares
// Pense como: "Eu preciso dessas ferramentas para construir meu projeto"
import React, { useState, useEffect } from 'react';
// 'React' = A BIBLIOTECA PRINCIPAL que usamos para construir interfaces
// É como o "conjunto de ferramentas" básico do React
// '{ useState, useEffect }' = DOIS HOOKS (ganchos) do React que vamos usar
// useState = para criar estados (variáveis que mudam e atualizam a tela)
// useEffect = para executar código em momentos específicos
import axios from 'axios';
// 'axios' = BIBLIOTECA que instalamos para fazer requisições HTTP
// HTTP = HyperText Transfer Protocol (protocolo para comunicação web)
// ================================
// SEÇÃO 2: DEFINIÇÃO DE TIPOS COM TYPESCRIPT
// ================================
// LINHA 6-9: Criando um tipo para representar um Usuário
// 'interface' = PALAVRA-CHAVE do TypeScript para definir a "forma" de um objeto
// 'User' = NOME que demos para este tipo (poderia ser qualquer nome)
interface User {
id: number; // 'id' deve ser um NÚMERO
name: string; // 'name' deve ser um TEXTO (string)
email: string; // 'email' deve ser um TEXTO
phone: string; // 'phone' deve ser um TEXTO
}
// POR QUE USAR TYPESCRIPT?
// Ele ajuda a evitar erros dizendo exatamente que tipo de dado cada variável deve ter
// É como um "checador" que verifica se você não está cometendo erros bobos
// ================================
// SEÇÃO 3: TIPO PARA O ESTADO DA API
// ================================
// LINHA 11-14: Criando um tipo para os possíveis estados da API
// 'type' = OUTRA PALAVRA-CHAVE do TypeScript para criar tipos
// 'ApiState' = NOME do tipo que estamos criando
type ApiState = 'idle' | 'loading' | 'success' | 'error';
// '|' = PIPE significa "OU" (um OU outro)
// EXPLICAÇÃO DOS VALORES:
// 'idle' = OCIOSO (ainda não começou nada)
// 'loading' = CARREGANDO (está buscando dados)
// 'success' = SUCESSO (dados foram carregados com sucesso)
// 'error' = ERRO (algo deu errado)
// ================================
// SEÇÃO 4: DECLARAÇÃO DO COMPONENTE
// ================================
// LINHA 16-19: Criando nosso componente principal
// 'const' = PALAVRA-CHAVE para criar uma CONSTANTE (algo que não muda)
// 'ApiComponent' = NOME do nosso componente (começa com letra maiúscula)
// ':' = DOIS PONTOS significa "do tipo"
// 'React.FC' = Functional Component (Componente Funcional do React)
// '() =>' = ARROW FUNCTION (função de seta) - forma moderna de escrever funções
const ApiComponent: React.FC = () => {
// ================================
// SEÇÃO 5: ESTADOS DO COMPONENTE (useState)
// ================================
// LINHA 21-27: Criando o primeiro estado - lista de usuários
// 'useState' = HOOK do React para criar estados
// Estados são como VARIÁVEIS ESPECIAIS que, quando mudam, atualizam a tela automaticamente
const [users, setUsers] = useState<User[]>([]);
// '[users, setUsers]' = DESTRUTURAÇÃO de array
// users = variável que ARMAZENA o valor atual (começa vazio [])
// setUsers = função que usamos para MUDAR o valor de 'users'
// 'useState<User[]>([])' =
// <User[]> = tipo: array de objetos User
// ([]) = valor inicial: array vazio
// LINHA 29-35: Segundo estado - estado da API
const [apiState, setApiState] = useState<ApiState>('idle');
// 'ApiState' = tipo (só pode ser 'idle' | 'loading' | 'success' | 'error')
// 'idle' = valor inicial (começa ocioso)
// LINHA 37-43: Terceiro estado - mensagem de erro
const [error, setError] = useState<string | null>(null);
// 'string | null' = pode ser um TEXTO ou NULL (vazio)
// 'null' = valor inicial (sem erro)
// ================================
// SEÇÃO 6: useEffect PARA BUSCAR DADOS
// ================================
// LINHA 45-69: Hook useEffect - executa código quando o componente é montado
// 'useEffect' = HOOK que executa código em momentos específicos
// É como dizer: "Quando alguma coisa acontecer, faça isso"
useEffect(() => {
// TUDO DENTRO DESTA FUNÇÃO será executado
// LINHA 47-49: Função assíncrona para buscar usuários
// 'async' = marca a função como ASSÍNCRONA (pode usar 'await')
// Assíncrono = não bloqueia outras coisas enquanto espera
const fetchUsers = async () => {
// LINHA 50-52: Atualiza estados para "carregando"
setApiState('loading'); // Muda estado para 'loading'
setError(null); // Limpa erros anteriores
// LINHA 54-68: try-catch para tratar erros
// 'try' = TENTA executar este código
// Se der erro, vai para o 'catch'
try {
// LINHA 56-61: Fazendo a requisição HTTP com Axios
// 'await' = ESPERA esta linha terminar antes de continuar
// axios.get = método GET (buscar dados)
// 'https://jsonplaceholder.typicode.com/users' = URL da API FAKE
const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
// 'response' = OBJETO com toda a resposta
// response.data = DADOS que a API enviou
// LINHA 63-66: Se deu certo, atualiza estados
setUsers(response.data); // Coloca os dados no estado 'users'
setApiState('success'); // Muda estado para 'success'
} catch (err) {
// LINHA 68-86: Se deu erro, executa este bloco
// 'err' = objeto de erro que foi capturado
setApiState('error'); // Muda estado para 'error'
// LINHA 72-81: Verifica que tipo de erro foi
// 'axios.isAxiosError(err)' = função que verifica se é erro do Axios
if (axios.isAxiosError(err)) {
// Se for erro de rede/API
setError(`Erro na API: ${err.message}`);
} else {
// Se for outro tipo de erro
setError('Erro desconhecido ao buscar dados');
}
// LINHA 83-86: Mostra erro no console (para desenvolvedores)
console.error('Erro ao buscar usuários:', err);
// 'console.error' = mostra erro no console (vermelho)
}
};
// LINHA 88-89: Chama a função para buscar os dados
fetchUsers();
// Esta função será executada quando o componente for montado
}, []); // LINHA 91: Array de dependências VAZIO = executa APENAS UMA VEZ
// ================================
// SEÇÃO 7: RENDERIZAÇÃO DO COMPONENTE
// ================================
// LINHA 93-238: Retorna o JSX (HTML do React)
// 'return' = PALAVRA-CHAVE que retorna o que será mostrado na tela
// Tudo dentro do return é o que o usuário vê
return (
// LINHA 95-102: Container principal (div)
// 'div' = elemento HTML para criar uma "caixa" ou container
// 'style' = atributo para aplicar estilos CSS diretamente
<div style={{
    maxWidth: '800px', // Largura máxima de 800 pixels
margin: '0 auto', // Margem: 0 em cima/baixo, auto nas laterais (centraliza)
padding: '20px', // Espaço interno de 20px em todas as direções
fontFamily: 'Arial, sans-serif' // Fonte: Arial, se não tiver, qualquer sans-serif
}}>
{/* LINHA 104-109: Título principal (h1) */}
{/* JSX COMENTÁRIOS: Dentro do JSX, comentários são com {/ * e * /} */}
<h1 style={{
color: '#333', // Cor hexadecimal: cinza escuro (#333 = #333333)
textAlign: 'center' // Alinhamento do texto: centro
}}>
📡 CONSUMINDO API NO FRONT-END
</h1>
{/* LINHA 111-116: Subtítulo (p) */}
<p style={{
textAlign: 'center', // Alinha ao centro
color: '#666' // Cor: cinza médio
}}>
Componente reutilizável para todos os projetos
</p>
{/* ====================================== */}
{/* CONDIÇÃO 1: SE ESTÁ CARREGANDO */}
{/* ====================================== */}
{/* LINHA 118-135: Condicional para estado 'loading' */}
{/* 'apiState === 'loading' &&' = Se apiState for igual a 'loading', renderiza */}
{/* '&&' = operador AND (E) - se a condição for verdadeira, mostra o que vem depois */}
{apiState === 'loading' && (
// Container do loading
<div style={{
textAlign: 'center', // Centraliza conteúdo
padding: '40px', // Espaço interno: 40px
backgroundColor: '#f5f5f5', // Cor de fundo: cinza muito claro
borderRadius: '8px', // Cantos arredondados: 8px
margin: '20px 0' // Margem: 20px em cima/baixo, 0 nas laterais
}}>
{/* Emoji de loading */}
<div style={{
fontSize: '48px', // Tamanho da fonte: 48px
marginBottom: '10px' // Margem inferior: 10px
}}>
⏳
</div>
<h3>Carregando dados...</h3>
<p>Buscando informações da API</p>
</div>
)}
{/* ====================================== */}
{/* CONDIÇÃO 2: SE DEU ERRO */}
{/* ====================================== */}
{/* LINHA 137-176: Condicional para estado 'error' */}
{apiState === 'error' && error && (
// Container de erro
<div style={{
textAlign: 'center',
padding: '40px',
backgroundColor: '#ffebee', // Fundo vermelho claro
borderRadius: '8px',
margin: '20px 0',
border: '1px solid #ffcdd2' // Borda vermelha clara
}}>
{/* Emoji de erro */}
<div style={{
fontSize: '48px',
marginBottom: '10px'
}}>
❌
</div>
{/* Título do erro */}
<h3 style={{ color: '#d32f2f' }}>Erro ao carregar dados</h3>
{/* Mensagem de erro (vem do estado 'error') */}
<p>{error}</p>
{/* LINHA 161-176: Botão para tentar novamente */}
<button
// onClick = evento que ocorre quando clica no botão
// window.location.reload() = recarrega a página
onClick={() => window.location.reload()}
style={{
padding: '10px 20px', // Espaço interno: 10px cima/baixo, 20px lados
backgroundColor: '#d32f2f', // Cor de fundo: vermelho
color: 'white', // Cor do texto: branco
border: 'none', // Remove borda padrão
borderRadius: '4px', // Cantos levemente arredondados
cursor: 'pointer', // Cursor vira "mãozinha" ao passar
marginTop: '10px' // Margem superior: 10px
}}
>
Tentar novamente
</button>
</div>
)}
{/* ====================================== */}
{/* CONDIÇÃO 3: SE DEU SUCESSO */}
{/* ====================================== */}
{/* LINHA 178-234: Condicional para estado 'success' */}
{apiState === 'success' && (
// Container principal dos dados
<div>
{/* LINHA 181-190: Cabeçalho da tabela */}
<div style={{
display: 'flex', // Usa Flexbox para layout
backgroundColor: '#2196f3', // Azul
color: 'white', // Texto branco
padding: '12px', // Espaço interno: 12px
borderRadius: '8px 8px 0 0', // Arredonda só o topo
fontWeight: 'bold' // Texto em negrito
}}>
{/* Colunas do cabeçalho */}
<div style={{ flex: 1 }}>ID</div> /* flex: 1 = ocupa 1 parte */
<div style={{ flex: 2 }}>Nome</div> /* flex: 2 = ocupa 2 partes */
<div style={{ flex: 3 }}>Email</div> /* flex: 3 = ocupa 3 partes */
<div style={{ flex: 2 }}>Telefone</div>/* flex: 2 = ocupa 2 partes */
</div>
{/* LINHA 192-232: Lista de usuários usando .map() */}
{/* users.map() = percorre cada item do array 'users' */}
{/* Para cada 'user', retorna um elemento JSX */}
{users.map((user) => (
// Container de cada linha (cada usuário)
// 'key={user.id}' = identificador ÚNICO obrigatório no React
<div
key={user.id}
style={{
display: 'flex',
padding: '12px',
borderBottom: '1px solid #eee', // Linha divisória cinza claro
// Fundo zebrado: se id é par (#f9f9f9), se ímpar (white)
backgroundColor: user.id % 2 === 0 ? '#f9f9f9' : 'white'
}}
>
{/* Coluna ID */}
<div style={{ flex: 1, fontWeight: 'bold' }}>
#{user.id} {/* Mostra o ID com # na frente */}
</div>
{/* Coluna Nome */}
<div style={{ flex: 2 }}>
{user.name} {/* Mostra o nome do usuário */}
</div>
{/* Coluna Email */}
<div style={{ flex: 3, color: '#1976d2' }}>
{user.email} {/* Mostra o email em azul */}
</div>
{/* Coluna Telefone */}
<div style={{ flex: 2, fontFamily: 'monospace' }}>
{user.phone} {/* Mostra telefone com fonte monoespaçada */}
</div>
</div>
))}
</div>
)}
{/* ====================================== */}
{/* SEÇÃO 8: RODAPÉ INFORMATIVO */}
{/* ====================================== */}
{/* LINHA 236-253: Rodapé com instruções para os grupos */}
<div style={{
marginTop: '40px', // Margem superior: 40px
padding: '20px', // Espaço interno: 20px
backgroundColor: '#e8f5e9', // Fundo verde claro
borderRadius: '8px', // Cantos arredondados
textAlign: 'center' // Texto centralizado
}}>
<h3>🎯 Como usar nos seus projetos:</h3>
<p>
{/* Instruções específicas para cada grupo */}
<strong>Grupo Verde (AnyLAI):</strong> Troque por API de imóveis<br />
<strong>Grupo Laranja (Inspeções):</strong> Troque por API de checklists<br />
<strong>Grupo Rosa (Diagnóstico):</strong> Troque por API de pacientes
</p>
</div>
</div> // Fecha a div principal
); // Fecha o return
}; // Fecha a função do componente
// ================================
// SEÇÃO 9: EXPORTAÇÃO DO COMPONENTE
// ================================
// LINHA 255-257: Exporta o componente para ser usado em outros arquivos
// 'export default' = exporta este componente como o PRINCIPAL deste arquivo
// Outros arquivos podem importá-lo com: import ApiComponent from './ApiComponent'
export default ApiComponent;