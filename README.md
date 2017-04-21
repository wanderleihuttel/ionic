# Instalação API

> Recortar e colar a pasta app, dentro de htdocs (Xampp)

> O banco de dados está na pasta app/storage/backup

> Adicionar em C:\Windows\System32\drivers\etc\hosts:

> 127.0.0.1	www.app.com.br

> 127.0.0.1	app.com.br

##### Acessar C:\xampp\apache\conf\extra\httpd-vhosts.conf

##### Tirar o '#' em NameVirtualHost *:80 e adicionar:

`<VirtualHost *:80>`

   `ServerName app.com.br`
   
   `ServerAlias www.app.com.br`
   
   `DocumentRoot "C:\xampp\htdocs\app\public"`
   
   `ErrorLog "logs/app-error.log"`
   
   `CustomLog "logs/app-access.log" common`
   
   `<Directory "C:\xampp\htdocs\app\public">`
   
       DirectoryIndex index.php index.html index.htm
       
       AllowOverride All
       
       Order allow,deny
       
       Allow from all
       
   `</Directory>`
   
`</VirtualHost>`

##### Executar `composer install` na raiz do projeto (API)
