// To install globally
npm install jspm -g

// In project directory
npm install jspm --save-dev
npm init

// NOTE: Set transpiler to babel!
jspm init

// To build a single-file version
jspm bundle lib/main --inject
