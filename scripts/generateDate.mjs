import fs from 'fs';
import { execSync } from 'child_process';

let gitDate = new Date().toLocaleDateString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
try {
  gitDate = execSync('git log -1 --format="%cd" --date=format:"%d.%m.%Y"', {
    encoding: 'utf8',
  }).trim();
} catch (error) {
  // fallback to current date
}

fs.writeFileSync(
  'src/lib/gitDate.ts',
  `export const GIT_LAST_MODIFIED: string = '${gitDate}';
`
);
