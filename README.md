Yii 2 Advanced Gulp Sass Application Template using Zurb Foundation for Sites
===============================

Yii 2 Advanced Gulp Sass Application Template using Zurb Foundation for Sites is a skeleton [Yii 2](http://www.yiiframework.com/) application for
developing complex Web applications with multiple tiers.

The template includes three tiers: front end, back end, and console, each of which
is a separate Yii application.

The template is designed to work in a team development environment. It supports
deploying the application in different environments.

Documentation is at [docs/guide/README.md](docs/guide/README.md).

[![Latest Stable Version](https://poser.pugx.org/jacmoe/yii2-app-advanced-zurbified/v/stable.png)](https://packagist.org/packages/jacmoe/yii2-app-advanced-zurbified)
[![Total Downloads](https://poser.pugx.org/jacmoe/yii2-app-advanced-zurbified/downloads.png)](https://packagist.org/packages/jacmoe/yii2-app-advanced-zurbified)

# Installation
## Prerequisites
Before you start, make sure you have installed [composer](https://getcomposer.org/) and [Node.js](http://nodejs.org/).
If you are on Debian or Ubuntu you might also want to install the [libnotify-bin](https://packages.debian.org/jessie/libnotify-bin) package, which is used by Gulp to inform you about its status.

### Gulp
install gulp globally if you haven't done so before

```
npm install -g gulp-cli
```
### Browsersync
install browsersync globally if you haven't done so before

```
npm install -g browser-sync
```
## Composer
```
php composer.phar global require "fxp/composer-asset-plugin:~1.1.1"
php composer.phar create-project --prefer-dist --stability=dev jacmoe/yii2-app-advanced-gulp-sass advanced
```

## Post-installation

initialize the application, choose "development"
```
./init
```

### Post-installation
Install the node modules by running this command at the project root directory:
```
npm install
```
After a successful install, build the project using:
```
gulp build
```

To launch a browser window and watch the project for changes:
~~~
gulp
~~~

To build optimized for production (minification, etc) specify the `production` flag:

~~~
gulp build --production
~~~
and/or
~~~
gulp --production
~~~

DIRECTORY STRUCTURE
-------------------

```
common
    config/              contains shared configurations
    mail/                contains view files for e-mails
    models/              contains model classes used in both backend and frontend
console
    config/              contains console configurations
    controllers/         contains console controllers (commands)
    migrations/          contains database migrations
    models/              contains console-specific model classes
    runtime/             contains files generated during runtime
backend
    assets/              contains application assets such as JavaScript and CSS
    config/              contains backend configurations
    controllers/         contains Web controller classes
    models/              contains backend-specific model classes
    runtime/             contains files generated during runtime
    views/               contains view files for the Web application
    web/                 contains the entry script and Web resources
frontend
    assets/              contains application assets such as JavaScript and CSS
    config/              contains frontend configurations
    controllers/         contains Web controller classes
    models/              contains frontend-specific model classes
    runtime/             contains files generated during runtime
    views/               contains view files for the Web application
    web/                 contains the entry script and Web resources
    widgets/             contains frontend widgets
vendor/                  contains dependent 3rd-party packages
environments/            contains environment-based overrides
tests                    contains various tests for the advanced application
    codeception/         contains tests developed with Codeception PHP Testing Framework
```
