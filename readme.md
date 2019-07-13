# 仿百度贴吧后端源码

## 项目启动

> 这个项目只有后端的源码，[前端源码](https://github.com/maoyeyang/tieba)

1. npm i

2. 项目上传 github 后会少 .env 文件 注意添加

3. 执行命令`./node_modules/.bin/sequelize db:create` 创建数据库

4. 执行命令`./node_modules/.bin/sequelize db:migrate` 执行迁移(执行后数据库就有表了)

5. 执行命令`./node_modules/.bin/sequelize db:seed:all` 插入假数据

6. nodemon app.js

```.env
# server
HOST = 127.0.0.1
PORT = 3000

# MYSQL
MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_DB_NAME = tieba
MYSQL_USERNAME = root
MYSQL_PASSWORD = 123456

# password秘钥
BCRYPT_PASSWORD = 10

# token秘钥
SECRET_PASSWORD = secret
```
