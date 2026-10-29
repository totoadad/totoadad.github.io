import { readdir, readFile, mkdir, cp, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '_site');
const entries = ['index.html', 'schedule.html', 'businesscard.html', 'css/bootstrap.min.css', 'css/custom.css', 'js/bootstrap.bundle.min.js', 'js/custom.js', 'LICENSE.bootstrap.txt', 'img', 'tobimori', '.nojekyll'];
const files = [];
async function walk(relative) {
  const absolute = path.join(root, relative);
  if ((await stat(absolute)).isDirectory()) {
    for (const name of await readdir(absolute)) await walk(path.join(relative, name));
  } else files.push(relative);
}
for (const entry of entries) await walk(entry);
let checked = 0;
for (const name of files) {
  if (name.endsWith('.js')) new Script(await readFile(path.join(root, name), 'utf8'), {filename: name});
  if (!name.endsWith('.html') && !name.endsWith('.css')) continue;
  const text = await readFile(path.join(root, name), 'utf8');
  const references = name.endsWith('.html')
    ? [...text.replace(/<!--[\s\S]*?-->/g, '').matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1])
    : [...text.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)].map(m => m[1]);
  for (const reference of references) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
    const local = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!local) continue;
    const resolved = path.resolve(reference.startsWith('/') ? root : path.dirname(path.join(root, name)), '.' + (reference.startsWith('/') ? local : '/' + local));
    if (!resolved.startsWith(root + path.sep)) throw Error('Path escapes site: ' + reference);
    await stat(resolved).catch(() => {throw Error(name + ': missing file ' + reference);});
    checked++;
  }
  if (name.endsWith('.html') && /<script[^>]+src=["']http:\/\//i.test(text)) throw Error(name + ': insecure script');
}
if (path.dirname(output) !== root || path.basename(output) !== '_site') throw Error('Unexpected output path');
await rm(output, {recursive: true, force: true});
await mkdir(output, {recursive: true});
for (const entry of entries) await cp(path.join(root, entry), path.join(output, entry), {recursive: true});
console.log('Validated ' + checked + ' local references and JavaScript syntax. Published files: ' + files.length);
