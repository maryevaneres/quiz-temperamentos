# Quiz de Temperamentos — Casal na Medida Certa

Pequeno site estático com quiz de 10 perguntas para descobrir o temperamento predominante (Sanguíneo, Colérico, Melancólico, Fleumático).

Como usar
1. Coloque os arquivos em um projeto (ex.: pasta `site/`) com a estrutura:
   - index.html
   - css/styles.css
   - js/app.js
   - public/logo.png (insira aqui a logo do projeto; se não houver, mantenha o arquivo como placeholder)
2. Faça deploy em Vercel / Netlify / GitHub Pages (basta apontar para a pasta).
3. Gere um QR code apontando para a URL pública antes do evento.

Observações técnicas
- Projeto sem backend — todas as operações são client-side.
- O botão "Tirar print / Compartilhar" tenta usar Web Share API (melhor experiência no mobile) e cai para window.print() como fallback.
- Para personalizar perguntas ou textos, edite `js/app.js`.
- Sugestão: se quiser gerar uma imagem do resultado automaticamente, integre a biblioteca `html2canvas` e capture a área do resultado antes de compartilhar.

Licença e manutenção
- Código simples e comentado para facilitar futuras edições.
- Posso ajustar cores, fontes, animações ou transformar em React caso prefira um repo pronto para Vercel.
