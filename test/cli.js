import test from 'ava';
import fs from 'fs';
import { execFileSync } from 'child_process';

test('cli', t => {
  const actual = execFileSync(`${__dirname}/../bin/cli.js`, [`${__dirname}/input.md`]).toString();
  const expected = fs.readFileSync(`${__dirname}/output.hatena`, 'utf8');
  t.is(actual, expected, 'CLI command transforms Markdown file into Hatena Syntax Correctly');
});

test('cli error', t => {
  const res = execFileSync(`${__dirname}/../bin/cli.js`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString();
  t.regex(res, /ERROR:/);
});
