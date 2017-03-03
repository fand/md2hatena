import test from 'ava';
import fs from 'fs';
import { execFileSync } from 'child_process';

test('cli', t => {
  const actual = execFileSync(`${__dirname}/../bin/cli.js`, [`${__dirname}/input.md`]).toString();
  const expected = fs.readFileSync(`${__dirname}/output.hatena`, 'utf8');
  t.is(actual, expected, 'CLI command transforms Markdown file into Hatena Syntax Correctly');
});

test('cli with invalid file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`, ['xxxxxx'], { stdio: ['pipe', 'pipe', 'pipe'] });
  }, Error);
  t.regex(error.stderr.toString(), /ERROR/);
});

test('cli without file', t => {
  const error = t.throws(() => {
    execFileSync(`${__dirname}/../bin/cli.js`);
  }, Error);
  t.regex(error.stdout.toString(), /Usage/);
});
