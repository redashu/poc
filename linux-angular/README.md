# Visit Source for Official documentations 

[click_here](https://github.com/nodesource/distributions)

## Installing ng in RHEL 9

```
sudo yum install https://rpm.nodesource.com/pub_20.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
sudo yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
```

### Note: if failing and showing GpgKey then use above to link to get the gpgkey

### verify installation 

```
[root@ip-172-31-63-158 ~]# node -v
v20.10.0
```

### Install development tool

```
sudo yum install gcc-c++ make
```

### Installing angular cli 

```
[root@ip-172-31-63-158 ~]# npm -v
10.2.3

[root@ip-172-31-63-158 ~]# npm install -g @angular/cli
(#########⠂⠂⠂⠂⠂⠂⠂⠂⠂) ⠇ idealTree:lib: timing idealTree:#
```

### verify 

```
[root@ip-172-31-63-158 ~]# ng version 

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 17.0.7
Node: 20.10.0
Package Manager: npm 10.2.3
OS: linux x64

Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1700.7 (cli-only)
@angular-devkit/core         17.0.7 (cli-only)
@angular-devkit/schematics   17.0.7 (cli-only)
@schematics/angular          17.0.7 (cli-only)

```

### Creating sample project 

```
[root@ip-172-31-63-158 ~]# cd /opt/
[root@ip-172-31-63-158 opt]# ls
[root@ip-172-31-63-158 opt]# mkdir sample
[root@ip-172-31-63-158 opt]# cd sample/
[root@ip-172-31-63-158 sample]# ls
[root@ip-172-31-63-158 sample]# ng new helloworld
? Which stylesheet format would you like to use? (Use arrow keys)
❯ CSS 
  SCSS   [ https://sass-lang.com/documentation/syntax#scss                ] 
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
  Less   [ http://lesscss.org                                             ] 

```

### we can directory host it using ng 

```
 ng serve --host 0.0.0.0

Warning: This is a simple server for use in testing or debugging Angular applications
locally. It hasn't been reviewed for security issues.

Binding this server to an open connection can result in compromising your application or
computer. Using a different host than the one passed to the "--host" flag might result in
websocket connection issues. You might need to use "--disable-host-check" if that's the
case.
    

Initial Chunk Files | Names         |  Raw Size
polyfills.js        | polyfills     |  82.71 kB | 
main.js             | main          |  23.32 kB | 
styles.css          | styles        |  95 bytes | 

                    | Initial Total | 106.12 kB

Application bundle generation complete. [9.302 seconds]
Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
  ➜  Network: http://172.31.63.158:4200/

```

### we can build angular app which will be creating dist folder to deploy 

```
ng build 
? Would you like to share pseudonymous usage data about this project with the Angular Team
at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more
details and how to change this setting, see https://angular.io/analytics. Yes

Thank you for sharing pseudonymous usage data. Should you change your mind, the following
command will disable this feature entirely:

    ng analytics disable

Global setting: enabled
Local setting: enabled
Effective status: enabled

Initial Chunk Files   | Names         |  Raw Size | Estimated Transfer Size
main-YJWPQ75W.js      | main          | 192.67 kB |                52.96 kB
polyfills-LZBJRJJE.js | polyfills     |  32.69 kB |                10.59 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

                      | Initial Total | 225.36 kB |                63.55 kB

Application bundle generation complete. [9.800 seconds]
[root@ip-172-31-63-158 ok]# ls
angular.json  dist  node_modules  package.json  package-lock.json  README.md  src  tsconfig.app.json  tsconfig.json  tsconfig.spec.json
[root@ip-172-31-63-158 ok]# cd dist/
[root@ip-172-31-63-158 dist]# ls
ok
[root@ip-172-31-63-158 dist]# cd ok/
[root@ip-172-31-63-158 ok]# ls
3rdpartylicenses.txt  browser
[root@ip-172-31-63-158 ok]# ls browser/
favicon.ico  index.html  main-YJWPQ75W.js  polyfills-LZBJRJJE.js  styles-5INURTSO.css
[root@ip-172-31-63-158 ok]# 

```

### Note: you can deploy browser folder to httpd or nginx 


