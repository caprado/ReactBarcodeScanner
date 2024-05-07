module.exports = {
  'root': true,
  'env': { 'browser': true },
  'parser': '@typescript-eslint/parser',
  'settings': { 'react': { 'version': 'detect' } },
  'extends': [
    'plugin:react/recommended', 
    'plugin:react/jsx-runtime', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:@typescript-eslint/eslint-recommended', 
  ],
  'plugins': [
    'import',
    'react',
    'promise',
    'unicorn',
    'react-hooks',
    '@typescript-eslint',
  ],
  'rules': {

    // =============  ESLint Rules  =============

    /*
      error for both debugger or console left in code

      @see https://eslint.org/docs/latest/rules/no-debugger
      @see https://eslint.org/docs/latest/rules/no-debugger
    */
    'no-console': 'warn',
    'no-debugger': 'warn',

    /*
      Disallow specified modules when loaded by import

      @see https://eslint.org/docs/latest/rules/no-restricted-imports
    */
    'no-restricted-imports': ['error', {
      'paths': [{
        'name': 'react',
        'importNames': ['default'],
        'message': `Please import directly from \'react\'. 
        No need to import the entire React object.`
      }]
    }],

    /*
      Arrow functions can omit parentheses when they 
      have exactly one parameter. 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/arrow-parens
    */
    'arrow-parens': ['error', 'as-needed'],

    /*
      Negated conditions are more difficult to understand. 
      Code can be made more readable by inverting the condition instead.

      @see https://eslint.org/docs/latest/rules/no-negated-condition
    */
    'no-negated-condition': 'error',

    /* 
      Unused expression which has no effect on  
      the state of the program indicates a logic error

      @see https://eslint.org/docs/latest/rules/no-unused-expressions
    */
    'no-unused-expressions': 'error',

    /*  
      Requires trailing commas when the last element or property is 
      in a different line than the closing ] or } 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/comma-dangle
    */
    'comma-dangle': ['error', 'only-multiline'],

    /*
      Enforce a maximum line length

      @see https://eslint.org/docs/latest/rules/max-len
    */
    'max-len': ['warn', {
      'code': 100,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreComments': true,
      'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true,
      'ignorePattern': '^import\\s.+\\sfrom\\s'
    }],

    /*
      Remove the semi-colon at the end of the line
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/semi
    */
    'semi': ['error', 'never'],

    /*
      Enforce sorted import declarations within modules
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/sort-imports
    */
    'sort-imports': ['error',
      {
        'ignoreCase': true,
        'ignoreDeclarationSort': true
      }
    ],
  
    /*
      Enforce a convention in the order of require() / import statements.
      ✓ Automatically fixable with --fix

      @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    */
    'import/order': ['error', {
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],

    /*
      Require braces around arrow function bodies,
      enforces no braces where they can be omitted
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/arrow-body-style
    */
    'arrow-body-style': ['error', 'as-needed', {
      'requireReturnForObjectLiteral': true
    }],

    /*
      Enforce consistent spacing inside braces
      and requires spacing inside of braces (except {})
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/object-curly-spacing
    */
    'object-curly-spacing': ['error', 'always'],

    /*
      Require destructuring from arrays and/or objects
      Enforces usage of destructuring instead of accessing property.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/prefer-destructuring
    */
    'prefer-destructuring': ['error', {
      'VariableDeclarator': {
        'array': false,
        'object': true,
      },
      'AssignmentExpression': {
        'array': true,
        'object': false,
      },
    }, {
      'enforceForRenamedProperties': false,
    }],

    /*
      Enforce the consistent use of single quotes
      Requires the use of single quotes wherever possible
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/quotes
    */
    'quotes': ['error', 'single'],

    /*
      Enforce consistent brace style for blocks
      Enforces one true brace style
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/brace-style
    */
    'brace-style': ['error'],

    /*
      Enforce consistent brace style for all control statements
      Warns whenever if, else, for, while, or do are used without block statements
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/curly
    */
    'curly': ['error', 'all'],

    /*
      Enforce camelcase naming convention
      This rule focuses on using the camelcase approach

      @see https://eslint.org/docs/latest/rules/camelcase
    */
    'camelcase': ['error', { 'properties': 'always' }],

    /*
      Enforce consistent linebreak style for operators
      Requires linebreaks to be placed before the operator
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/operator-linebreak
    */
    'operator-linebreak': ['error', 'after', {
      'overrides': { '?': 'after', ':': 'before' }
    }],

    /*
      Disallow shorthand type conversions flags shorter notations for 
      the type conversion, then suggest a more self-explanatory notation.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-implicit-coercion
    */
    'no-implicit-coercion': 'error',

    /*
      Disallow unnecessary boolean casts. casting to a Boolean via 
      double negation (!!) or a Boolean call is unnecessary.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-extra-boolean-cast
    */
    'no-extra-boolean-cast': 'error',

    /*
      Require methods and property shorthand syntax for object literals
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/object-shorthand
    */
    'object-shorthand': ['error', 'always'],

    /*
      Require padding within blocks
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/padded-blocks
    */
    'padded-blocks': ['error', { 'blocks': 'never' }],

    /*
      Require padding lines between statements
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/padding-line-between-statements
    */
    'padding-line-between-statements': ['error', {
      blankLine: 'always', prev: '*', next: 'return'
    }],

    /*
      Enforce capitalization of the first letter of a comment
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/capitalized-comments
    */
    'capitalized-comments': ['error', 'always', {
      'ignoreInlineComments': true,
      'ignoreConsecutiveComments': true,
      'ignorePattern': 'webpackChunkName',
    }],

    /*
      If an if block contains a return statement, the else block becomes unnecessary. 
      Its contents can be placed outside of the block.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-else-return
    */
    'no-else-return': 'error',

    /*
      If an if statement is the only statement in the else block, 
      it is often clearer to use an else if form.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-lonely-if
    */
    'no-lonely-if': 'error',

    /*
      Enclosing complex expressions by parentheses clarifies 
      the developer’s intention, which makes the code more readable

      @see https://eslint.org/docs/latest/rules/no-mixed-operators
    */
    'no-mixed-operators': 'error',

    /*
      Require spacing around infix operators 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/space-infix-ops
    */
    'space-infix-ops': 'error',

    /*
      Enforce the consistent use of single quotes in JSX attributes 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/jsx-quotes
    */
    'jsx-quotes': ['error', 'prefer-single'],

    /*
      Disallow unnecessary return await 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-return-await
    */
    'no-return-await': 'error',

    /*
      Enforce consistent spacing before and after the arrow in arrow functions 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/arrow-spacing
    */
    'arrow-spacing': 'error',

    /*
      Enforce consistent spacing inside parentheses 

      @see https://eslint.org/docs/latest/rules/space-in-parens
    */
    'space-in-parens': ['error', 'never'],

    /*
      Enforce consistent spacing before and after keywords 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/keyword-spacing
    */
    'keyword-spacing': 'error',

    /*
      Multiple spaces in a row that are not used 
      for indentation are typically mistakes 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-multi-spaces
    */
    'no-multi-spaces': 'error',

    /*
      Enforce consistent spacing between keys and 
      values in object literal properties 
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/key-spacing
    */
    'key-spacing': 'error',

    /*
      Disallow multiple empty lines, excess 
      whitespace takes up more of the screen.
      ✓ Automatically fixable with --fix

      @see https://eslint.org/docs/latest/rules/no-multiple-empty-lines
    */
    'no-multiple-empty-lines': 'error',

    /*
      Require default cases in switch statements

      @see https://eslint.org/docs/latest/rules/default-case
    */
    'default-case': 'error',

    /*
      Comparisons which will always evaluate to true or false and logical 
      expressions (||, &&, ??) which either always short-circuit or never 
      short-circuit are both likely indications of programmer error

      @see https://eslint.org/docs/latest/rules/no-constant-binary-expression
    */
    'no-constant-binary-expression': 'error',


    //  =============  React Rules  =============

    /*
      error if an element uses an Array index in its key

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    */
    'react/no-array-index-key': 'error',
 
    /*
      Disallow multiple component definition per file

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    */
    'react/no-multi-comp': ['error', { 'ignoreStateless': true }],

    /*
      Warns if a prop with a defined type isn't being used.

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    */
    'react/no-unused-prop-types': 'error',

    /*
      Enforce whitespace in and around the JSX opening and closing brackets
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
    */
    'react/jsx-tag-spacing': ['error', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'never'
    }],

    /*
      Enforce arrow function type for function components
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    */
    'react/function-component-definition': ['error', {
      'namedComponents': 'arrow-function',
    }],

    /*
      Enforce proper position of the first property in JSX
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    */
    'react/jsx-first-prop-new-line': ['error', 'multiline'],

    /*
      Enforce consistent linebreaks in curly braces in JSX attributes and expressions
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
    */
    'react/jsx-curly-newline': ['error'],

    /*
      Enforce maximum of props on a single line in JSX
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    */
    'react/jsx-max-props-per-line': [1, { 'maximum': 1, 'when': 'multiline' }],

    /*
      Enforce closing bracket location in JSX
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    */
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

    /*
      Require one JSX element per line
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
    */
    'react/jsx-one-expression-per-line': ['error', { 'allow': 'none' }],

    /*
      Disallow extra closing tags for components without children
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    */
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true,
    }],

    /*
      Disallow passing of children as props

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    */
    'react/no-children-prop': 'error',

    /*
      Disallow missing displayName in a React component definition

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
    */
    'react/display-name': 'error',

    /*
      Disallow missing key props in iterators/collection literals

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    */
    'react/jsx-key': 'error',

    /*
      Enforces consistent naming for boolean props

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
    */
    'react/boolean-prop-naming': 'error',

    /*
      Add missing parentheses around multiline JSX 
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
    */
    'react/jsx-wrap-multilines': ['error', {
      'declaration': 'parens-new-line',
      'assignment': 'parens-new-line',
      'return': 'parens-new-line',
      'arrow': 'parens-new-line',
      'condition': 'parens-new-line',
      'logical': 'parens-new-line'
    }],

    /*
      Ensure destructuring and symmetric naming of useState 
      hook value and setter variables 

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
    */
    'react/hook-use-state': ['error', {
      'allowDestructuredState': true
    }],

    /*
      Disallow unnecessary fragments  
      ✓ Automatically fixable with --fix

      @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
    */
    'react/jsx-no-useless-fragment': ['error', {
      'allowExpressions': true
    }],


    //  =============  React Hook Rules  =============


    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',


    //  =============  ESLint TypeScript Rules  =============

    /*
      Enforce consistent spacing inside braces.  
      ✓ Automatically fixable with --fix
      
      @see https://typescript-eslint.io/rules/object-curly-spacing/
    */
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],

    /*
      Enforce consistent indentation.  
      ✓ Automatically fixable with --fix
      
      @see https://typescript-eslint.io/rules/indent/
    */
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1 }],

    /*
      Require explicit return types on functions and class methods.
      
      @see https://typescript-eslint.io/rules/explicit-function-return-type/
    */
    '@typescript-eslint/explicit-function-return-type': ['error',
      { 'allowExpressions': true }
    ],

    /*
      Require a specific member delimiter style for interfaces and type literals.
      ✓ Automatically fixable with --fix

      @see https://typescript-eslint.io/rules/member-delimiter-style/
    */
    '@typescript-eslint/member-delimiter-style': ['error',
      {
        'multiline': {
          'delimiter': 'none',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false,
        }
      }
    ],

    /*
      Enforce type definitions to consistently use type
      ✓ Automatically fixable with --fix

      @see https://typescript-eslint.io/rules/consistent-type-definitions
    */
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    /*
      Disallow unused variables
      ✓ Automatically fixable with --fix

      @see https://typescript-eslint.io/rules/no-unused-vars/
    */
    'no-unused-vars': 'off', // Note: must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': 'error',

    /*
      Disallow the use of variables before they are defined.

      @see https://typescript-eslint.io/rules/no-use-before-define/
    */
    '@typescript-eslint/no-use-before-define': ['error',
      {
        'functions': false,
        'classes': false,
      }
    ],


    //  =============  Promise Rules  =============


    /*
      Enforce the use of catch() on un-returned promises

      @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/catch-or-return.md
    */
    'promise/catch-or-return': 'error',

    /*
      Require returning inside each then() to create 
      readable and reusable Promise chains

      @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md
    */
    'promise/always-return': 'error',


    //  =============  Unicorn Rules  =============


    /*
      Prefer .at() method for index access and String#charAt()

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
    */
    'unicorn/prefer-at': 'error',

    /*
      Do not use a for loop when it can be replaced with a for-of loop

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
    */
    'unicorn/no-for-loop': 'error',

    /*
      Improve regexes by making them shorter, consistent, and safer

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
    */
    'unicorn/better-regex': 'error',

    /*
      Prefer switch over multiple else-if

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
    */
    'unicorn/prefer-switch': 'error',

    /*
      Prefer the spread operator over Array.from(…), Array#concat(…), 
      Array#{slice,toSpliced}() and String#split('')

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
    */
    'unicorn/prefer-spread': 'error',

    /*
      Prefer ternary expressions over simple if-else statements

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
    */
    'unicorn/prefer-ternary': 'error',

    /*
      Prefer Set#has() over Array#includes() when checking 
      for existence or non-existence

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
    */
    'unicorn/prefer-set-has': 'error',

    /*
      Prefer .includes() over .indexOf() and Array#some() 
      when checking for existence or non-existence

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
    */
    'unicorn/prefer-includes': 'error',

    /*
      Prefer Date.now() to get the number of 
      milliseconds since the Unix Epoch

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
    */
    'unicorn/prefer-date-now': 'error',

    /*
      Enforce the use of new for all builtins, except 
      String, Number, Boolean, Symbol and BigInt

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
    */
    'unicorn/new-for-builtins': 'error',

    /*
      Disallow nested ternary expressions without
      nested temary's being wrapped in parens

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
    */
    'unicorn/no-nested-ternary': 'error',

    /*
      Disallow number literals with zero fractions or dangling dots

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
    */
    'unicorn/no-zero-fractions': 'error',

    /*
      Prefer .find(…) and .findLast(…) over 
      the first or last element from .filter(…)

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
    */
    'unicorn/prefer-array-find': 'error',

    /*
      Prefer Array#flat() over legacy techniques to flatten arrays

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
    */
    'unicorn/prefer-array-flat': 'error',

    /*
      Prefer .some(…) over .filter(…).length check and .{find,findLast}(…)

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
    */
    'unicorn/prefer-array-some': 'error',

    /*
      Prefer String#codePointAt(…) over String#charCodeAt(…) 
      and String.fromCodePoint(…) over String.fromCharCode(…)

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
    */
    'unicorn/prefer-code-point': 'error',

    /*
      Prefer String#slice() over String#substr() and String#substring()

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
    */
    'unicorn/prefer-string-slice': 'error',

    /*
      Enforce explicitly comparing the length or size property of a value

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
    */
    'unicorn/explicit-length-check': 'error',

    /*
      Prefer Array#{indexOf,lastIndexOf}() over 
      Array#{findIndex,findLastIndex}() when looking for the index of an item

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
    */
    'unicorn/prefer-array-index-of': 'error',

    /*
      Prefer Array#flat() over legacy techniques to flatten arrays

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
    */
    'unicorn/prefer-array-flat-map': 'error',

    /*
      Prefer top-level await over top-level 
      promises and async function calls

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
    */
    'unicorn/prefer-top-level-await': 'error',

    /*
      Use destructured variables over properties

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
    */
    'unicorn/consistent-destructuring': 'error',

    /*
      Prefer Number static properties over global ones

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
    */
    'unicorn/prefer-number-properties': 'error',

    /*
      Prefer String#replaceAll() over regex searches with the global flag

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
    */
    'unicorn/prefer-string-replace-all': 'error',

    /*
      Disallow member access from await expression

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
    */
    'unicorn/no-await-expression-member': 'error',

    /*
      Move function definitions to the highest possible scope

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
    */
    'unicorn/consistent-function-scoping': 'error',

    /*
      Prevent passing a function reference directly to iterator methods

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
    */
    'unicorn/no-array-callback-reference': 'error',

    /*
      Prefer .textContent over .innerText

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
    */
    'unicorn/prefer-dom-node-text-content': 'error',

    /*
      Disallow useless fallback when spreading in object literals

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
    */
    'unicorn/no-useless-fallback-in-spread': 'error',

    /*
      Prefer using String, Number, BigInt, Boolean, and Symbol directly

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md
    */
    'unicorn/prefer-native-coercion-functions': 'error',

    /*
      Prefer using a logical operator over a ternary

      @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md
    */
    'unicorn/prefer-logical-operator-over-ternary': 'error'
  }
}
