const fs = require('fs');
const lines = fs.readFileSync('backend/routes/bookings.js','utf8').split('\n');
let open = 0;
for(let i=0;i<lines.length;i++){
  const line = lines[i];
  for(const ch of line){ if(ch==='(') open++; if(ch===')') open--; }
  if(open<0){ console.log('Negative at line', i+1); break; }
  if(open>0) console.log((i+1)+': open='+open+' | '+line);
}
console.log('final open count', open);
