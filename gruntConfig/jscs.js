module.exports = {

    main: {
        src: [
            "src/method.js",
            'test/method-tests.js'
        ],
        options: {
            requireCurlyBraces: [
                "if",
                "else",
                "for",
                "while",
                "do",
                "try",
                "catch",
                "case",
                "default"
            ],
            requireSpaceAfterKeywords: [
                "do",
                "for",
                "if",
                "else",
                "switch",
                "case",
                "try",
                "catch",
                "void",
                "while",
                "with",
                "return",
                "typeof",
                "function"
            ],
            requireSpaceBeforeBlockStatements: true,
            requireParenthesesAroundIIFE: true,
            requireSpacesInFunctionExpression: {
                "beforeOpeningRoundBrace": true,
                "beforeOpeningCurlyBrace": true
            },
            requireSpacesInAnonymousFunctionExpression: {
                "beforeOpeningRoundBrace": true,
                "beforeOpeningCurlyBrace": true
            },
            requireSpacesInNamedFunctionExpression: {
                "beforeOpeningRoundBrace": true,
                "beforeOpeningCurlyBrace": true
            },
            requireSpacesInFunctionDeclaration: {
                "beforeOpeningRoundBrace": true,
                "beforeOpeningCurlyBrace": true
            },
            requireSpacesInFunction: {
                "beforeOpeningRoundBrace": true,
                "beforeOpeningCurlyBrace": true
            },
            disallowSpacesInCallExpression: true,
            requireBlocksOnNewline: true,
            requireSpacesInsideObjectBrackets: "all",
            disallowSpaceAfterObjectKeys: true,
            requireSpaceBeforeObjectValues: true,
            requireCommaBeforeLineBreak: true,
            requireOperatorBeforeLineBreak: [
                "?",
                "=",
                "+",
                "-",
                "/",
                "*",
                "==",
                "===",
                "!=",
                "!==",
                ">",
                ">=",
                "<",
                "<="
            ],
            disallowSpaceAfterPrefixUnaryOperators: ["++", "--", "+", "-", "~", "!"],
            disallowSpaceBeforePostfixUnaryOperators: ["++", "--"],
            disallowMixedSpacesAndTabs: true,
            disallowTrailingWhitespace: true,
            disallowTrailingComma: true,
            disallowKeywordsOnNewLine: ["else"],
            requireLineFeedAtFileEnd: true,
            requireCapitalizedConstructors: true,
            requireSpaceAfterLineComment: true,
            disallowNewlineBeforeBlockStatements: true
        }
    }
}
