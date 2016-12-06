# 豆瓣电影列表

## 项目结构初始化

- .editorconfig
- README.md
- .gitignore
- package.json
  + 使用 `npm init` 初始化该文件

1. 本地项目安装 `npm install --save http-server`
2. 在 `package.json` 文件中找到 `scripts` 字段，加上一个属性：`start`，值是 `http-server -p 7080 -o`
3. 打开终端，切到 package.json 文件所属目录，执行 `npm start`，这个时候 npm 会自动找当前路径下的 package.json -> scripts -> start ，然后执行对应的命令

这样做的目的是为了把全局依赖变为本地项目依赖，这样的话团队成员开发模式就可以更加一致，
否则例如你用 Apache 还要手动把文件丢到 Apache 服务器里面，但是这样一做的话就不需要了，
例如别人想要看一下你的项目，你就可以直接打开终端，输入 `npm start` 启动，响应的开发效率也高。

注意：这里是为了让大家多了解一下这两个工具，而且两个工具使用一个就可以，设置不用工具也完全可以解决问题。
配置工具的过程肯定是比较麻烦的，都是一旦配置好运行起来，后期的过程就是自动化的使用方式而已，能大大的提高你的效率。

工具很灵活，一个人一个用法。

利用各种各样的工具搭配出一套自己的工作流。

## 豆瓣 API

- https://api.douban.com/v2/
- https://api.douban.com/v2/movie/in_theaters

## 接口测试工具：Postman

- https://www.getpostman.com/
- Postman 是一个专门用来测试接口的一个工具，非常方便。

## 分页数据

需求：
每页5条数据

一共分多少页 = 天花板(总记录数大小 / 每页显示大小)

查看某一页数据

start 从第几条开始
count 取几条

第1页  0 5
第2页  5 5
第3页  10 5
第4页  15 5

(n-1) * 5

## Develop

- `npm install`
- `npm start`
