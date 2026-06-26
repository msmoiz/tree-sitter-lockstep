/**
 * @file Lockstep grammar for tree-sitter
 * @author Mustafa Moiz <mustafa.moiz125@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "lockstep",

  extras: ($) => [/\s/, $.comment],

  rules: {
    source_file: ($) => repeat($._item),

    _item: ($) => choice($.service, $.operation, $.struct),

    service: ($) =>
      seq(
        "service",
        $.ident,
        "{",
        "operations",
        ":",
        "[",
        repeat($.ident),
        "]",
        "}",
      ),

    operation: ($) => seq("operation", $.ident, "{", "}"),

    struct: ($) => seq("struct", $.ident, "{", repeat($.field), "}"),

    field: ($) => seq($.ident, ":", $.ident, optional(",")),

    ident: ($) => /[a-zA-Z][a-zA-Z0-9_]+/,

    comment: ($) => token(seq("//", /.*/)),
  },
});
