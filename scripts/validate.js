// Usage: node scripts/validate.js  -> checks data and reports missing translations
const fs=require("fs"),D=JSON.parse(fs.readFileSync("data/countries.json"));
let err=0;const bad=m=>{console.error("ERROR:",m);err++};
if(D.length!==54)bad(`expected 54 countries, got ${D.length}`);
const regions=["north","west","central","east","south"];
D.forEach(d=>{["code","region","capital","pop","female_pct","languages","gdp_bn","gdp_ppp_bn","currency","tz"].forEach(k=>d[k]===undefined&&bad(`${d.code}: missing ${k}`));
 if(!regions.includes(d.region))bad(`${d.code}: unknown region`);
 if(d.female_pct<40||d.female_pct>60)bad(`${d.code}: suspicious female_pct`)});
for(const l of ["fr","en","de","zh","ru"]){const T=JSON.parse(fs.readFileSync(`i18n/${l}.json`));
 const miss=D.filter(d=>!T.tips[d.code]).length;
 console.log(`${l}: ${54-miss}/54 tips translated`)}
process.exit(err?1:0);
