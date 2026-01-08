// LINHA 1-4: Importações
import React from 'react';
// 'ReactDOM' = biblioteca que conecta React com o navegador
import ReactDOM from 'react-dom/client';
// './index.css' = arquivo de estilos CSS
import './index.css';
// 'App' = nosso componente principal
import App from './App';
// LINHA 6-9: Cria a raiz (root) da aplicação
// 'document.getElementById('root')' = busca elemento HTML com id "root"
// Este elemento está no arquivo public/index.html
// 'as HTMLElement' = diz ao TypeScript que é um elemento HTML
const root = ReactDOM.createRoot(
document.getElementById('root') as HTMLElement
);
// LINHA 11-15: Renderiza a aplicação
// 'root.render()' = método que desenha nossa aplicação no navegador
// '<React.StrictMode>' = modo estrito do React (ajuda a encontrar erros)
// '<App />' = nosso componente principal (renderiza tudo)
root.render(
<React.StrictMode>
<App />
</React.StrictMode> );