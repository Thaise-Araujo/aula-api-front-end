// LINHA 1-3: Importações
// 'import' = importa código de outros arquivos
// 'React' = biblioteca principal do React
// 'ApiComponent' = nosso componente que criamos acima
import React from 'react';
import ApiComponent from './ApiComponent';
// LINHA 5-6: Declaração do componente App
// 'function App()' = define uma função chamada App
// Esta é a função principal da nossa aplicação
function App() {
// LINHA 8-22: Retorno do JSX (o que será mostrado na tela)
return (
// 'div' com className "App" (classe CSS)
// className = atributo para classes CSS (parecido com class no HTML)
<div className="App">
{/* Renderiza nosso componente ApiComponent */}
<ApiComponent />
{/* LINHA 14-22: Rodapé da aplicação */}
<footer style={{
textAlign: 'center', // Texto centralizado
padding: '20px', // Espaço interno: 20px
marginTop: '40px', // Margem superior: 40px
color: '#666', // Cor do texto: cinza
fontSize: '14px' // Tamanho da fonte: 14px
}}>
<p>Desenvolvido para a aula de Web Services (Client) - Front-End</p>
<p>Turma 32 PE - C1 - ID82</p>
</footer>
</div>
);
}
// LINHA 24-25: Exporta o componente App
// 'export default App' = exporta este componente como padrão
// O arquivo index.tsx irá importar e usar este componente
export default App;