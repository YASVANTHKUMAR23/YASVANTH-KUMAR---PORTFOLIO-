const https = require('https');

https.get('https://api.github.com/repos/YASVANTHKUMAR23/AI-STUDIO/contents', {
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const files = JSON.parse(data);
    files.forEach(f => console.log(f.name));
  });
}).on('error', (err) => {
  console.error(err);
});
