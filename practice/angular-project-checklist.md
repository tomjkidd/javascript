#Project Checklist
1. Download git
    git clone
    git pull
    git add --all
    git status
    git commit -m <message>
    git diff

2. Install node and npm (node package manager, a registry)
    [npm docs](https://docs.npmjs.com/json)
    ```node
    node -v
    npm install npm -g
    npm ls
    npm outdated
    npm update
    npm install
    npm install <package name> --save
    npm uninstall <package name> --save
    npm prune
    npm adduser
    npm config ls
    npm publish reusable-code
    npm init
    npm version [patch|minor|major]

    ```
    Local
    -----
    npm install lodash -> node_modules/
    npm install -> package.json
    npm install -g yo bower grunt-cli gulp jasmine

    Minimum package.json
    { "name": "name", "version": "version" }

    Versioning with [Semantic Versioning](http://semver.org/)

    npm install lodash --save -> updates package.json
    npm install tap --save -> same thing...

    Global
    ------

3. Install bower
    ```node
    npm install -g bower
    ```
    bower search <dep>
    bower install <dep>..<depN>
    bower list
    bower update <dep>
    bower init

4. Install grunt
    ```node
    npm install -g grunt-cli
    npm install grunt --save-dev
    npm install grunt-contrib-jshint --save-dev
    npm install grunt-contrib-uglify --save-dev
    npm install grunt-contrib-clean --save-dev
    npm install grunt-shell --save-dev
    ```
    grunt will typically use 2 files, package.json and Gruntfile (js or coffee)

    grunt serve
    grunt test
    grunt

    [Plugins](http://gruntjs.com/plugins)
    [Configuring Tasks](http://gruntjs.com/configuring-tasks)
    [jshint](https://github.com/gruntjs/grunt-contrib-jshint)
    npm install -g grunt-init
    grunt-init --help

5. Create bower.json and package.json for external dependencies
    bower init -> bower.json
    npm init -> package.json

6. Create a Gruntfile
    js or coffee file
    ```javascript
    // The wrapper function
    module.exports = function(grunt) { /* do stuff */}
    ```
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json'); // enables templates with <%= pkg.name %>
        uglify
    grunt.loadNpmTasks('<plugin name>')
    grunt.registerTask('<task name>', ['uglify'])

7. Install other dependencies
    lodash for utilities
    marked for markdown
    q for promises
    rewire for mocking
    semver for semantic versioning
    shelljs for shell script commands for node
    sorted-object for sorted keys for serialized json
    stringmap for string maps
    karma for web browser test runner
    jasmine for a test driven development framework
    karma-jasmine for combo

8. Unit Testing
  Angular talks about Karma and Jasmine

  Jasmine
  =======
  npm install -g jasmine
  jasmine init
  
  API: describe, it, expect, Matcher, beforeEach, afterEach, beforeAll, afterAll, xdescribe, xit

  @method describe
  @param {String} title Title of the spec suite
  @param {Function} specSuite The definition of the spec suite of it function calls.
  @return

  @method it
  @param {String} title Title of the spec
  @param {Function} test The spec test itself

  @method expect
  @param {object} actual Value to compare with expected
  @returns {Matcher}

  Custom Matchers can be made

  expect(value).
    [
      toBe|toEqual|toEqual|toMatch|
      toBeDefined|toBeUndefined|toBeNull|
      toBeTruthy|toBeFalsey|
      toContain|toBeCloseTo|toThrow|
      not
    ]

  Terms
  -----
  Spec: A test
  Expectation: assertion that is true or false
  Passing Spec: Spec where all Expectations are true
  Failing Spec: Spec where one or more Expectations are false
