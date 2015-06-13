System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "build": [
      "npm:core-js@0.9.16/library/modules/$.fw",
      "npm:babel-runtime@5.5.7/helpers/class-call-check",
      "npm:core-js@0.9.16/library/modules/$.string-at",
      "npm:core-js@0.9.16/library/modules/$.uid",
      "npm:core-js@0.9.16/library/modules/$.shared",
      "npm:core-js@0.9.16/library/modules/$.assert",
      "npm:core-js@0.9.16/library/modules/$.def",
      "npm:core-js@0.9.16/library/modules/$.redef",
      "npm:core-js@0.9.16/library/modules/$.ctx",
      "npm:core-js@0.9.16/library/modules/$.iter-call",
      "npm:core-js@0.9.16/library/modules/$.iter-detect",
      "npm:core-js@0.9.16/library/modules/$.unscope",
      "npm:core-js@0.9.16/library/modules/core.iter-helpers",
      "npm:core-js@0.9.16/library/fn/get-iterator",
      "npm:core-js@0.9.16/library/fn/object/create",
      "npm:core-js@0.9.16/library/modules/$.get-names",
      "lib/graph/Edge",
      "npm:core-js@0.9.16/library/modules/es6.object.to-string",
      "npm:core-js@0.9.16/library/modules/$.for-of",
      "npm:core-js@0.9.16/library/modules/$.mix",
      "npm:core-js@0.9.16/library/modules/$.species",
      "npm:core-js@0.9.16/library/modules/$.collection-to-json",
      "lib/graph/Node",
      "lib/sim/Connection",
      "lib/sim/Message",
      "lib/graph/Graph",
      "npm:core-js@0.9.16/library/modules/$",
      "npm:core-js@0.9.16/library/modules/$.wks",
      "npm:core-js@0.9.16/library/modules/$.iter-define",
      "npm:core-js@0.9.16/library/modules/es6.array.from",
      "npm:core-js@0.9.16/library/modules/es6.array.iterator",
      "npm:babel-runtime@5.5.7/core-js/get-iterator",
      "npm:babel-runtime@5.5.7/core-js/object/create",
      "npm:core-js@0.9.16/library/modules/es6.object.statics-accept-primitives",
      "npm:core-js@0.9.16/library/modules/$.collection-strong",
      "npm:core-js@0.9.16/library/modules/$.collection",
      "npm:core-js@0.9.16/library/modules/es7.map.to-json",
      "npm:core-js@0.9.16/library/fn/object/define-property",
      "npm:core-js@0.9.16/library/modules/$.cof",
      "npm:core-js@0.9.16/library/modules/web.dom.iterable",
      "npm:babel-runtime@5.5.7/helpers/inherits",
      "npm:core-js@0.9.16/library/fn/object/get-own-property-descriptor",
      "npm:core-js@0.9.16/library/modules/es6.map",
      "npm:babel-runtime@5.5.7/core-js/object/define-property",
      "npm:core-js@0.9.16/library/modules/$.iter",
      "npm:core-js@0.9.16/library/fn/is-iterable",
      "npm:babel-runtime@5.5.7/core-js/object/get-own-property-descriptor",
      "npm:core-js@0.9.16/library/fn/map",
      "npm:babel-runtime@5.5.7/helpers/create-class",
      "npm:core-js@0.9.16/library/modules/es6.string.iterator",
      "npm:babel-runtime@5.5.7/core-js/is-iterable",
      "npm:babel-runtime@5.5.7/helpers/get",
      "npm:babel-runtime@5.5.7/core-js/map",
      "npm:core-js@0.9.16/library/fn/array/from",
      "npm:babel-runtime@5.5.7/helpers/sliced-to-array",
      "lib/sim/BridgeEdge",
      "lib/sim/BridgeNode",
      "npm:babel-runtime@5.5.7/core-js/array/from",
      "npm:babel-runtime@5.5.7/helpers/to-consumable-array",
      "lib/sim/Network",
      "lib/main"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.5.7",
    "babel-runtime": "npm:babel-runtime@5.5.7",
    "core-js": "npm:core-js@0.9.16",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.5.7": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.16": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
