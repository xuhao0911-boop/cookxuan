(function(root){
'use strict';
const example='htc-519a666f6f20';
const prep=[
 {title:'猪肉切片',body:'肥肉、瘦肉分开放。'},
 {title:'青椒、小米辣',body:'分别切成段。'},
 {title:'大蒜',body:'用刀背拍成末。'},
 {title:'生姜',body:'切成细丝。'},
 {title:'鸡蛋',body:'打进小碗，用筷子打散。'}
];
function splitText(text){
 const chunks=[];let current='',depth=0;
 const emit=()=>{if(current.trim())chunks.push(current.trim());current='';};
 for(const char of String(text||'')){current+=char;if(/[（(【「“]/.test(char))depth++;if(/[）)】」”]/.test(char))depth=Math.max(0,depth-1);if((/[。！？!?；;\n]/.test(char)&&depth===0))emit();}emit();
 const result=[];
 for(const chunk of chunks){
  if(chunk.length<40){result.push(chunk);continue;}
  let start=0;
  for(let i=0;i<chunk.length;i++){
   if(!/[，,]/.test(chunk[i]))continue;
   const before=chunk.slice(start,i+1),after=chunk.slice(i+1);
   if(before.length<12||/(?:的时候|时候|之前|之后|后|前|时|如果|若|待|当|直到)[，,]$/.test(before))continue;
   if(/^(?:\s*)(?:再(?:将|把)?|然后|接着|随后|最后|同时|将|把|倒入|加入|放入|取出|盛出|捞出|关火|转[大小中]|盖上|用[锅勺筷刀]|另起|开[大小中]|翻炒)/.test(after)){result.push(before.trim());start=i+1;}
  }
  const rest=chunk.slice(start).trim();if(rest)result.push(rest);
 }
 return result.length?result:[String(text||'').trim()];
}
function actionsFor(recipe,index,transform){
 if(recipe.id===example&&index===0)return prep.map(a=>({...a}));
 const s=recipe.steps[index];let text=s?.text||'';if(transform)text=transform(text);
 return splitText(text).map(body=>({title:'',body}));
}
function headingFor(recipe,index){
 if(recipe.id===example)return ['先把食材备好','先炒鸡蛋','小火煸出猪油','放入瘦肉翻炒','加入姜蒜和豆瓣酱','放入辣椒和鸡蛋','盛盘，开饭'][index]||recipe.name;
 const s=recipe.steps[index];if(recipe.editorial)return s.title;
 const label=(s.text.match(/^([^：:。]{2,12})[：:]/)||[])[1];return label||s.group||`第 ${index+1} 步`;
}
root.CookXuanReading={splitText,actionsFor,headingFor,example};
})(typeof window==='undefined'?globalThis:window);
