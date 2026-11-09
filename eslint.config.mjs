export default [
  {
    files: ["public/js/code.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        XMLHttpRequest: "readonly"
      }
    },
    rules: {
      "no-dupe-keys": "error",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-constant-condition": "error",
      "no-unused-vars": ["error", { "vars": "local", "args": "after-used" }]
    }
  },
  {
    ignores: ["public/js/md5.js", "node_modules/**"]
  }
];
