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
    file: ($) => repeat($._item),

    _item: ($) =>
      seq(repeat($.doc), choice($.service, $.operation, $.struct, $.enum)),

    service: ($) =>
      seq(
        "service",
        $.ident,
        "{",
        "operations",
        ":",
        "[",
        repeat(seq($.type, optional(","))),
        "]",
        "}",
      ),

    operation: ($) =>
      seq(
        "operation",
        $.ident,
        "{",
        repeat(choice($.input, $.output, $.error)),
        "}",
      ),

    input: ($) => seq("input", ":", $.type),

    output: ($) => seq("output", ":", $.type),

    error: ($) => seq("error", ":", $.type),

    struct: ($) => seq("struct", $.ident, "{", repeat($.field), "}"),

    field: ($) => seq(repeat($.doc), $.ident, ":", $.type, optional(",")),

    enum: ($) =>
      seq(repeat($.attr), "enum", $.ident, "{", repeat($.variant), "}"),

    variant: ($) =>
      seq(repeat($.doc), $.ident, optional($.variant_fields), optional(",")),

    variant_fields: ($) => choice($.named_fields, $.unnamed_fields),

    named_fields: ($) => seq("{", repeat($.field), "}"),

    unnamed_fields: ($) => seq("(", repeat(seq($.type, optional(","))), ")"),

    ident: ($) => /[a-zA-Z][a-zA-Z0-9_]+/,

    type: ($) =>
      choice(
        /[a-zA-Z][a-zA-Z0-9_]+/,
        seq("[", /[a-zA-Z][a-zA-Z0-9_]+/, "]"),
        seq("option", "<", /[a-zA-Z][a-zA-Z0-9_]+/, ">"),
        seq(
          "map",
          "<",
          /[a-zA-Z][a-zA-Z0-9_]+/,
          ",",
          /[a-zA-Z][a-zA-Z0-9_]+/,
          ">",
        ),
      ),

    comment: ($) => token(seq("//", /.*/)),

    doc: ($) => token(prec(1, seq("///", /.*/))),

    attr: ($) => seq("#", "[", $.meta, "]"),

    meta: ($) => choice($.meta_name, $.meta_name_val, $.meta_list),

    meta_name: ($) => $.ident,

    meta_name_val: ($) => seq($.ident, "=", $.expr),

    meta_list: ($) => seq($.ident, "(", repeat1($.meta), ")"),

    expr: ($) => choice($.expr_str),

    expr_str: ($) =>
      token(seq('"', repeat(choice(/[^"\\]/, /\\["\\nrt0]/)), '"')),
  },
});
