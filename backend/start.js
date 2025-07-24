import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting backend server...');

const server = spawn('node', ['src/index.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
});

server.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});

server.on('exit', (code) => {
    console.log(`📊 Server exited with code ${code}`);
    process.exit(code);
}); 