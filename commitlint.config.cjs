module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'doc',
        'docs',
        'feat',
        'fix',
        'bugfix',
        'choice',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
