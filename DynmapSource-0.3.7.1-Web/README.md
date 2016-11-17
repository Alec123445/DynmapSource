# Server Configuration

By default, Nginx and PHP5 allow POST 2M.
It's to small. Some Map.png are larger than 2M.

### Nginx
In file /etc/nginx/nginx.conf, add this line:

`
http {

...

client_max_body_size 20M;

...

}
`

### PHP
Modify your php.ini file :

`
memory_limit = 32M

upload_max_filesize = 20M

post_max_size = 20M
`

### Custom Size :
Change 20M by the size you want, ex: 30M or 1G

# Dynmap Configuration

Copy/Paste file template-config.php to config.php.
Edit values in config.php.

# Authentication

If the file config/user.php, authentication is disable.

To enable, copy/paste config/template-ser.php to config/user.php and make sure `$login`is set to `true` in config/config.php.