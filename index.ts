import { spawn } from 'child_process';
import consola from 'consola';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const version = '1.0.0';
consola.info(`Quick MTM v${version}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
	const file = await consola.prompt('Type target file name:', {
		placeholder: 'input.mp4',
	});
	consola.info(file);
	const file_x = file.replace(/\.[^/.]+$/, '');
	//todo: 自動でディレクトリ作成
	const outDir = join(__dirname, './out/' + file_x);
	await fs.mkdir(outDir, { recursive: true });
	const run_cmd = `ffmpeg -i target/${file} -c:v copy -c:a copy -f hls -hls_time 9 -hls_playlist_type vod -hls_segment_filename "${outDir}/output-${file_x}-%5d.ts" ${outDir}/output-${file_x}.m3u8`;
	spawn(run_cmd, [], { shell: true, stdio: 'inherit' });
}

main();
