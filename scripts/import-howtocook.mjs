import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let sharp;try{sharp=require('sharp');}catch{sharp=require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');}
const project=path.resolve(import.meta.dirname,'..');
const source=path.resolve(process.argv[2]||path.join(project,'../howtocook-mobile-source'));
const out=path.join(project,'dist');
const commit=execFileSync('git',['rev-parse','HEAD'],{cwd:source,encoding:'utf8'}).trim();
const categories={vegetable_dish:'素菜',meat_dish:'荤菜',aquatic:'水产',breakfast:'早餐',staple:'主食',soup:'汤粥',dessert:'甜品',drink:'饮品',condiment:'酱料', 'semi-finished':'半成品'};
const strip=t=>t.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[`*_]/g,'').replace(/<[^>]+>/g,'').trim();
const synonyms={'西红柿':'番茄','番茄':'番茄','西红柿块':'番茄','葱花':'香葱','葱末':'香葱','小葱':'香葱','葱':'香葱','蒜':'大蒜','蒜末':'大蒜','蒜瓣':'大蒜','蒜头':'大蒜','蒜蓉':'大蒜','白糖':'糖','细砂糖':'糖','食盐':'盐','油':'食用油','植物油':'食用油','橄榄油':'食用油','花生油':'食用油','色拉油':'食用油','生抽酱油':'生抽','老抽酱油':'老抽','冷饭':'米饭','熟米饭':'米饭','大米饭':'米饭','手枪腿':'鸡腿','鸡腿肉':'鸡腿','嫩豆腐':'豆腐','北豆腐':'豆腐','南豆腐':'豆腐','老豆腐':'豆腐','口蘑':'蘑菇','黑胡椒粉':'黑胡椒','玉米淀粉':'淀粉','生粉':'淀粉','火腿肠':'火腿','面粉':'小麦粉','鸡胸脯肉':'鸡胸肉','香醋':'醋','白醋':'醋','米醋':'醋','陈醋':'醋','鲜姜':'姜','生姜':'姜','姜片':'姜','姜丝':'姜','挂面':'面条','细面':'面条','二荆条':'辣椒'};
Object.assign(synonyms,{'白砂糖':'糖','绵白糖':'糖','食用盐':'盐','精盐':'盐','菜籽油':'食用油','葵花籽油':'食用油','芝麻油':'香油','麻油':'香油'});
const canonical=s=>synonyms[s]||s;
const tool=/^(?:锅|炒锅|不粘锅|平底锅|煮锅|蒸锅|高压锅|电饭煲|电饭锅|微波炉|烤箱|空气炸锅|电磁炉|刀|菜刀|案板|砧板|碗|盘|碟|筷子|叉|勺|汤匙|茶匙|打蛋器|保鲜膜|锡纸|烘焙纸|厨房纸|模具|温度计|电子秤|量杯|量勺|漏勺|筛子|搅拌机|榨汁机|砂锅|锅铲)/;
function ingredientName(line){
  let s=strip(line).replace(/^[\s\d.、)（(]+/,'').replace(/^(?:可选|适量|少量|约|新鲜的|新鲜|准备)[:：\s]*/,'');
  s=s.replace(/[（(][^）)]*[）)]/g,'').split(/\s*[=:：]\s*/)[0].split(/\s*(?:或者|或|\/|、|，|,|\+)\s*/)[0].replace(/\s*\d[\s\S]*$/,'').replace(/\s+(?:适量|少许|若干|一.*|半.*)$/,'').replace(/(?:适量|少许|若干)$/,'').trim();
  return canonical(s);
}
function sections(md){const result={};let key='intro';for(const line of md.split('\n')){const h=line.match(/^##\s+(.+)$/);if(h){key=strip(h[1]);result[key]??=[];}else(result[key]??=[]).push(line);}return Object.fromEntries(Object.entries(result).map(([k,lines])=>[k,lines.join('\n').trim()]));}
function get(sec,re){return Object.entries(sec).find(([k])=>re.test(k))?.[1]||'';}
function parseIngredients(text){let optional=false;const found=[];for(const line of text.split('\n')){if(/^\s*###/.test(line))optional=/可选|备选|非必/.test(line);const m=line.match(/^\s*[-*+]\s+(.+)$/);if(!m)continue;const raw=strip(m[1]);const name=ingredientName(raw);if(!name||name.length>16||tool.test(name)||/^(?:必须配料|进阶配料|可选配料|可选原料|原料|工具|原材料|材料|配料|调料|主料|辅料|总量|每份|必备)$/.test(name))continue;const alternatives=[...raw.matchAll(/[（(]([^）)]+)[）)]/g)].flatMap(x=>x[1].split(/或(?:者)?|\/|、/)).map(ingredientName).filter(n=>n&&n.length<=12&&!/\d|可选|适量/.test(n));found.push({name,raw,optional:optional||/可选|备选|非必|可以不|可省/.test(raw),alternatives:[...new Set(alternatives)]});}return [...new Map(found.map(i=>[i.name,i])).values()];}
function steps(text){let result=[],current=null,group='';const finish=()=>{if(current?.text.trim())result.push({...current,text:current.text.trim()});current=null;};for(const line of text.split('\n')){if(/^###\s/.test(line)){finish();group=strip(line.replace(/^###\s+/,''));continue;}const m=line.match(/^\s{0,3}\d+[.、)]\s*(.+)$/);if(m){finish();current={text:m[1],group};}else if(current)current.text+='\n'+line;}
  finish();if(!result.length)result=text.split(/\n\s*\n/).map(text=>({text,group:''})).filter(s=>strip(s.text)&&!/^!\[/.test(s.text.trim()));return result;
}
function getTime(intro){const s=strip(intro);const regex=/(?:大约|约|大概|大致|一般|需要|只需|全程)[^。\n]{0,20}?(\d+(?:\.\d+)?)(?:\s*[-–到至]\s*(\d+(?:\.\d+)?))?\s*(小时|分钟|分)(?!钟?内[^。]{20})/g;let match,last;while((match=regex.exec(s)))last=match;return last?Math.round(Number(last[2]||last[1])*(last[3]==='小时'?60:1)):null;}
function timer(text){const vals=[...text.matchAll(/(\d+(?:\.\d+)?)(?:\s*[-–到至]\s*(\d+(?:\.\d+)?))?\s*(小时|分钟|秒钟|秒|min\b|minutes?\b|s\b)/gi)].map(m=>Math.round(Number(m[2]||m[1])*({'小时':3600,'分钟':60,'min':60,'minute':60,'minutes':60}[m[3].toLowerCase()]||1))).filter(n=>n>=10&&n<=86400);return vals.length?Math.max(...vals):0;}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const imageMap=new Map(),imageErrors=[];const downloads=fs.existsSync(path.join(project,'PHOTO-DOWNLOAD.json'))?JSON.parse(fs.readFileSync(path.join(project,'PHOTO-DOWNLOAD.json'),'utf8')):{errors:[]};fs.mkdirSync(path.join(out,'assets/library'),{recursive:true});
async function imageFor(relative,mdPath){let resolved;try{const clean=relative.split(/\s+["']/)[0].replace(/^<|>$/g,'');if(/^https?:\/\//i.test(clean)){const file=path.resolve(project,'../cookxuan-photo-cache',crypto.createHash('sha256').update(clean).digest('hex').slice(0,18));if(downloads.errors.some(e=>e.file===clean)){imageErrors.push({file:clean,error:'Original URL returns 404'});return null;}if(fs.existsSync(file)){const name=crypto.createHash('sha256').update(clean).digest('hex').slice(0,18)+'.webp';if(!imageMap.has(clean)){await sharp(file).rotate().resize({width:1100,height:1100,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(path.join(out,'assets/library',name));imageMap.set(clean,{src:'assets/library/'+name,original:clean});}return imageMap.get(clean);}return {remote:clean};}resolved=path.resolve(path.dirname(mdPath),decodeURIComponent(clean.split('#')[0]));if(!resolved.startsWith(source+path.sep))return null;}catch{return null;}
  if(imageMap.has(resolved))return imageMap.get(resolved);
  const filename=crypto.createHash('sha256').update(path.relative(source,resolved)).digest('hex').slice(0,18)+'.webp';const target=path.join(out,'assets/library',filename);
  const original=path.relative(source,resolved).replaceAll('\\','/');const cached=path.resolve(project,'../cookxuan-photo-cache',crypto.createHash('sha256').update(original).digest('hex').slice(0,18));
  const input=fs.existsSync(resolved)?resolved:fs.existsSync(cached)?cached:null;
  if(!input)return {remote:'https://raw.githubusercontent.com/Anduin2017/HowToCook/'+commit+'/'+original.split('/').map(encodeURIComponent).join('/'),original};
  try{await sharp(input,{animated:false,limitInputPixels:150000000}).rotate().resize({width:1100,height:1100,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(target);const value={src:'assets/library/'+filename,original};imageMap.set(resolved,value);return value;}catch(error){imageErrors.push({file:original,error:error.message});return {remote:'https://raw.githubusercontent.com/Anduin2017/HowToCook/'+commit+'/'+original.split('/').map(encodeURIComponent).join('/'),original};}
}
const files=walk(path.join(source,'dishes')).filter(f=>f.endsWith('.md')).sort();
const items=[],excluded=[];
for(const file of files){const rel=path.relative(source,file).replaceAll('\\','/');if(rel.startsWith('dishes/template/')){excluded.push(rel);continue;}
  const raw=fs.readFileSync(file,'utf8').replaceAll('\r\n','\n');const sec=sections(raw);const title=strip((raw.match(/^#\s+(.+)$/m)||[])[1]||path.basename(file,'.md')).replace(/的做法$/,'');
  const ingredientText=get(sec,/必备原料|原料和工具|所需材料|准备材料|食材|材料和工具|原材料/);const calc=get(sec,/计算|用量/);const ops=get(sec,/操作|做法|步骤|制作过程/);
  let parsedIngredients=parseIngredients(ingredientText);if(!parsedIngredients.length)parsedIngredients=parseIngredients(calc);
  const photos=[];for(const m of raw.matchAll(/!\[([^\]]*)\]\(((?:[^()]|\([^()]*\))*)\)/g)){const img=await imageFor(m[2],file);if(img)photos.push({...img,alt:m[1],ref:m[2]});}
  const cover=[...photos].reverse().find(p=>/成品|摆盘|完成|盛盘/.test(p.alt+' '+(p.original||'')))||photos.find(p=>(p.alt+' '+(p.original||'')).includes(title))||photos.at(-1)||null;
  const intro=sec.intro||'';const desc=strip(intro.split('\n').filter(x=>x&&!x.startsWith('#')&&!/预估|难度|卡路里/.test(x)).join(' ')).split(/(?<=[。！!])/)[0].slice(0,85);
  const list=steps(ops).map((s,i)=>({text:strip(s.text),rich:s.text,group:s.group,seconds:timer(s.text),title:strip(s.text).split(/[，,；;。]/)[0].slice(0,24)||`第 ${i+1} 步`}));
  items.push({id:'htc-'+crypto.createHash('sha1').update(rel).digest('hex').slice(0,12),name:title,category:categories[rel.split('/')[1]]||'其他',sourcePath:rel,sourceUrl:'https://github.com/Anduin2017/HowToCook/blob/'+commit+'/'+rel,hash:crypto.createHash('sha256').update(raw).digest('hex'),description:desc,difficulty:(intro.match(/难度[：:]\s*(★+)/)||[])[1]?.length||null,time:getTime(intro),ingredients:parsedIngredients,ingredientText,calculation:calc,steps:list,operations:ops,extras:get(sec,/附加/),raw,photos,cover:cover?.src||cover?.remote||null,editorial:false});
}
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(project,'scripts/editorial-recipes.js'),'utf8'),ctx);const editorial=ctx.window.COOKXUAN;
const curated=editorial.recipes.filter(r=>['tomato-noodles','chicken-rice','tomato-tofu','mushroom-pasta','potato-stew'].includes(r.id)).map(r=>({...r,category:r.id==='tomato-tofu'?'素菜':r.id==='potato-stew'?'素菜':'主食',editorial:true,ingredients:r.ingredients.map(i=>({...i,raw:i.name,alternatives:[]})),cover:r.image==='hero'?'assets/hero.png':null,steps:r.steps.map(s=>({...s,text:s.text,rich:s.text})),sourceUrl:r.source?.path?'https://github.com/Anduin2017/HowToCook/blob/'+commit+'/'+r.source.path:null}));
const tips=walk(path.join(source,'tips')).filter(f=>f.endsWith('.md')).map(f=>({name:path.basename(f,'.md'),raw:fs.readFileSync(f,'utf8').replaceAll('\r\n','\n'),sourcePath:path.relative(source,f).replaceAll('\\','/')}));
const all=[...curated,...items];const stats=Object.fromEntries(Object.entries(categories).map(([,name])=>[name,items.filter(r=>r.category===name).length]));
const manifest={repository:'https://github.com/Anduin2017/HowToCook',commit,importedAt:new Date().toISOString(),sourceRecipeCount:items.length,curatedRecipeCount:curated.length,total:all.length,categories:stats,excluded,photoCount:imageMap.size,imageErrors,tipsCount:tips.length,recipes:items.map(r=>({id:r.id,path:r.sourcePath,sha256:r.hash}))};
const data={meta:{...manifest,recipes:undefined},dictionary:editorial.ingredients,synonyms,seasonings:['盐','食用油','生抽','糖','大蒜','姜','黑胡椒','料酒','醋','蚝油','老抽','淀粉','鸡精','香油','花椒','辣椒','豆瓣酱'],recipes:all,tips};
fs.writeFileSync(path.join(out,'catalog.js'),'window.COOKXUAN_CATALOG='+JSON.stringify(data)+';\n');
fs.writeFileSync(path.join(project,'IMPORT-MANIFEST.json'),JSON.stringify(manifest,null,2));fs.copyFileSync(path.join(source,'LICENSE'),path.join(project,'HOWTOCOOK-LICENSE.txt'));
console.log(JSON.stringify({sourceRecipes:items.length,curated:curated.length,total:all.length,categories:stats,images:imageMap.size,imageErrors,stepsMissing:items.filter(r=>!r.steps.length).map(r=>r.sourcePath),ingredientsMissing:items.filter(r=>!r.ingredients.length).map(r=>r.sourcePath),bytes:fs.statSync(path.join(out,'catalog.js')).size,commit},null,2));
