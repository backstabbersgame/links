document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.links');

  const EMAIL = 'contato@solarastudios.com.br';

   fetch('links.json')
     .then((response) => response.json())
     .then((links) => {
       links.forEach((link) => {
         const a = document.createElement('a');
         a.className = 'link-button';

         const icon = document.createElement('i');
         icon.className = `ph ${link.icon}`;
         icon.setAttribute('aria-hidden', 'true');

         a.appendChild(icon);
         a.append(` ${link.label}`);

         if (link.url === 'copy-email') {
           a.href = '#';
           a.setAttribute('role', 'button');
           a.setAttribute('tabindex', '0');
           a.setAttribute('aria-label', `Copiar e-mail: ${EMAIL}`);

           a.addEventListener('click', (e) => {
             e.preventDefault();
             navigator.clipboard.writeText(EMAIL).then(() => {
               a.setAttribute('aria-label', 'E-mail copiado!');

               a.textContent = '';
               a.appendChild(icon);
               a.append(' E-mail copiado!');

               setTimeout(() => {
                 a.textContent = '';
                 a.appendChild(icon);
                 a.append(` ${link.label}`);
                 a.setAttribute('aria-label', `Copiar e-mail: ${EMAIL}`);
               }, 2000);
             });
           });

           a.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               a.click();
             }
           });
         } else {
           a.href = link.url;
           a.target = '_blank';
           a.setAttribute('aria-label', `Abrir ${link.label} em nova aba`);
         }

         container.appendChild(a);
       });
     })
     .catch((error) => {
       console.error('Erro ao carregar os links:', error);
     });
});
