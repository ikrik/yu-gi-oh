# Yu-Gi-Oh Cards project

## Installation instructions

### Prerequisites
* node and npm
* python
* grunt-cli (install with `npm install -g grunt-cli`)
* bower (install with `npm install -g bower`)

### Steps
* Clone the git repository
    `git clone git@github.com:ikrik/yugiohApp.git yourDirectoryName`

* cd to the cloned directory
    `cd yourDirectoryName`

* Install all npm dependencies and then install the bower dependencies.
    `npm install`
    `bower install

* Compile/minify less and all javascript files
`grunt`

## Starting server for cross-domain XHR requests

`cd yourDirectoryName/public`

`python -m SimpleHTTPServer 8000`

## Code directory structure

    ├── app - includes all the app's files
    │      ├── js
    │      │   ├── controllers
    │      │   ├── lib
    │      │   └── services
    │      ├── less
    │      ├── views
    │      └── index.html
    └── public
            └── images

public/ - The directory where whole application is served to the users.

## Grunt tasks

default - This compiles/minifies less/javascript files and places them in public/stylesheets and public/js directories

development - This compiles less/javascript files and places them in  public/stylesheets and public/js directories. Use this for development as the javascripts are not minified
