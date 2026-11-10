/* CookXuan beginner edition. Adaptations are identified per recipe.
   Amounts are for one person; {{number}} in step copy scales with servings.
   A recipe's time is an estimate for one to two people, not a doneness test. */
window.COOKXUAN = {
  ingredients: {
    '番茄': ['Tomato','tomato','tomatoes','西红柿'], '鸡蛋':['Egg','egg','eggs'],
    '面条':['Noodles','noodle','noodles','挂面'], '西兰花':['Broccoli','broccoli','broccolini','花椰菜'],
    '鸡腿':['Chicken thigh','chicken','chicken thigh','chicken thighs','鸡腿肉','鸡肉'],
    '米饭':['Cooked rice','cooked rice','米饭','熟米饭'], '豆腐':['Tofu','tofu','嫩豆腐','silken tofu'],
    '蘑菇':['Mushroom','mushroom','mushrooms','white mushroom','口蘑'],
    '意面':['Spaghetti','pasta','spaghetti','意大利面'], '土豆':['Potato','potato','potatoes','马铃薯'],
    '胡萝卜':['Carrot','carrot','carrots','红萝卜'], '豌豆':['Peas','peas','pea','青豆'],
    '生抽':['Light soy sauce','soy sauce','light soy sauce','酱油'],
    '盐':['Salt','salt'], '食用油':['Cooking oil','oil','cooking oil','olive oil','橄榄油','植物油'],
    '糖':['Sugar','sugar','白糖'], '黑胡椒':['Black pepper','pepper','black pepper'],
    '大蒜':['Garlic','garlic','蒜','蒜头'], '醋':['Vinegar','vinegar','白醋','米醋'],
    '蚝油':['Oyster sauce','oyster sauce'], '淀粉':['Cornstarch','cornstarch','corn starch','玉米淀粉'],
    '香葱':['Spring onion','scallion','spring onion','green onion','葱','葱花'],
  },
  seasonings:['盐','生抽','食用油','糖','黑胡椒','大蒜','醋','蚝油'],
  recipes: [
    {
      id:'tomato-noodles',name:'番茄鸡蛋暖心面',en:'Tomato & egg noodle bowl',time:15,difficulty:'第一次也能做',type:'vegetarian',image:'hero',tag:'一锅治愈',description:'番茄的酸甜、鸡蛋的柔软，加一把面，就是离家再远也熟悉的一碗。',tools:'一口煮锅、一个碗、锅铲、漏勺',
      ingredients:[{name:'番茄',amount:1,unit:'个',note:'约 180 g'},{name:'鸡蛋',amount:2,unit:'个'},{name:'面条',amount:80,unit:'g'},{name:'食用油',amount:10,unit:'ml'},{name:'盐',amount:1.5,unit:'g'},{name:'生抽',amount:5,unit:'ml',optional:true},{name:'香葱',amount:0.5,unit:'根',optional:true}],
      steps:[
        {title:'先把食材准备好',text:'番茄洗净去蒂，切成约 2 cm 的块。把鸡蛋打进碗里，搅打到蛋白和蛋黄混合均匀。量好面条 {{80}} g 和食用油 {{10}} ml。',state:'番茄大小接近；蛋液里看不到大块透明蛋白。',art:'cut',seconds:180},
        {title:'把鸡蛋炒得刚刚好',text:'锅中加食用油，中火加热约 30 秒。倒入蛋液，用锅铲从边缘向中间轻推。蛋液全部凝固后，立即盛回碗里。',state:'鸡蛋凝固但仍有光泽，没有流动的蛋液。锅和油不需要冒烟。',art:'egg',seconds:60},
        {title:'给番茄一点时间',text:'用同一口锅，放入番茄，中小火翻炒约 2 分钟，直到番茄变软、锅底出现红色汁水。若锅底太干，先加一小勺水。',state:'用锅铲轻压时，番茄能轻松变软。',art:'tomato',seconds:120},
        {title:'煮面，最后让它们相遇',text:'加入 {{500}} ml 水，大火煮沸后放入面条，按包装建议时间煮。先从 {{1}} g 盐开始调味；面熟后放回鸡蛋，加剩余盐或可选生抽，再煮 30 秒。香葱可最后撒上。',state:'面条没有硬芯，鸡蛋热透。尝一口汤，再决定是否增加调味。',art:'noodles',seconds:300}
      ],
      why:[['为什么鸡蛋要先盛出？','鸡蛋在持续加热时会收紧、出水。先把凝固的鸡蛋盛出，等面煮好再放回去，口感更容易保持柔软。'],['为什么先炒番茄，再加水？','先炒到番茄出汁，果肉会更快分散进汤里。加水后直接长时间煮，也能熟，但汤的味道通常更淡。'],['时间只是参考，要观察什么？','面条的粗细会改变煮制时间，优先按包装说明，尝一小根检查硬芯。多人份要用更大的锅，并留出沸腾空间。']],
      substitutions:['没有中式面条 → 可以用意面，按包装时间煮熟后拌入番茄鸡蛋汤。','没有生抽、香葱 → 都可以省略，盐已经足够调味。'],
      source:{label:'基于 HowToCook「西红柿炒鸡蛋」，增加面条与汤底的新手改编',path:'dishes/vegetable_dish/西红柿炒鸡蛋.md'}
    },
    {
      id:'chicken-rice',name:'照烧鸡腿饭',en:'Teriyaki chicken & rice',time:25,difficulty:'掌握一点火候',type:'meat',image:'q0',tag:'一碗很满足',description:'不用买整瓶照烧汁，生抽和糖也能做出亮亮的酱汁。饭香和肉香，一碗装好。',tools:'不粘平底锅、锅盖、小碗、食物温度计（推荐）；米饭须提前煮好',
      ingredients:[{name:'鸡腿',amount:180,unit:'g',note:'去骨鸡腿肉'},{name:'米饭',amount:150,unit:'g',note:'熟米饭'},{name:'西兰花',amount:100,unit:'g'},{name:'生抽',amount:10,unit:'ml'},{name:'糖',amount:5,unit:'g'},{name:'食用油',amount:5,unit:'ml'}],
      steps:[
        {title:'先准备好酱汁',text:'鸡腿肉用厨房纸吸干表面水分，铺平到厚度约 1.5 cm。小碗里混合生抽 {{10}} ml、糖 {{5}} g、水 {{40}} ml。西兰花分小朵洗净。',state:'生肉的案板、刀与熟食分开使用；洗手后再接触其他食材。',art:'sauce',seconds:180},
        {title:'鸡皮朝下，先不要动',text:'锅里加油，中火加热。鸡皮朝下放入鸡腿，转中小火煎约 5 分钟，等鸡皮定型再翻面；另一面煎约 3 分钟。',state:'鸡皮表面金黄，能较容易地从锅底铲起。时间因厚度而变。',art:'chicken',seconds:300},
        {title:'加酱汁，慢慢煮透',text:'倒入酱汁，盖盖小火煮约 5–8 分钟。把温度计探头插入最厚处，不碰锅底；中心须达到 74°C。未达到就继续加热，再测一次。',state:'中心达到 74°C。酱汁只需轻轻冒小泡，浓稠过早就补少量水。',art:'simmer',seconds:360},
        {title:'配点绿色，盛一碗饭',text:'另起锅把水烧沸，放入西兰花煮约 2–3 分钟，捞出沥水。鸡肉完全熟透后开盖收汁，盛出静置 2 分钟再切块，和西兰花铺在热米饭上。',state:'西兰花变绿、能咬动；酱汁能薄薄挂在鸡肉上，别等到烧干。',art:'serve',seconds:180}
      ],
      why:[['为什么鸡皮朝下先煎？','先煎鸡皮能够让表面的水分蒸发，慢慢煎出油脂和香味。太早移动时，鸡皮容易粘锅、破损。'],['为什么用温度计？','鸡腿的厚度、锅的温度都不同，计时和颜色无法可靠判断中心温度。CookXuan 采用 USDA 对禽肉建议的最低中心温度 74°C（165°F）。'],['没有米饭怎么办？','可以搭配煮熟的面条或面包。这里的 25 分钟以已经备有熟米饭为前提，生米煮饭需另留时间。']],
      substitutions:['没有鸡腿 → 去骨鸡胸也可，但口感更容易变干，仍须确认中心 74°C。','没有西兰花 → 冷冻西兰花也可以，按包装指导加热。'],source:{label:'CookXuan 原创新手食谱',url:null},safetySource:'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart'
    },
    {
      id:'tomato-tofu',name:'番茄嫩豆腐煲',en:'Tomato-braised silken tofu',time:15,difficulty:'第一次也能做',type:'vegan',image:'q1',tag:'清爽又下饭',description:'用常见的番茄和嫩豆腐，煮一锅热乎乎的酸甜。调味简单，也很适合配饭。',tools:'一口小锅、锅盖、锅铲',
      ingredients:[{name:'番茄',amount:1,unit:'个',note:'约 180 g'},{name:'豆腐',amount:200,unit:'g',note:'嫩豆腐'},{name:'食用油',amount:5,unit:'ml'},{name:'盐',amount:1,unit:'g'},{name:'生抽',amount:5,unit:'ml',optional:true},{name:'香葱',amount:0.5,unit:'根',optional:true}],
      steps:[
        {title:'切番茄，轻放豆腐',text:'番茄洗净去蒂，切约 1 cm 小丁。嫩豆腐从盒里倒出，沥去多余水分，切约 2 cm 方块。',state:'豆腐不必用力挤压，保持完整就好。',art:'cut',seconds:180},
        {title:'把番茄炒成汤底',text:'锅中放食用油 {{5}} ml，中小火放入番茄，翻炒约 2–3 分钟，边炒边轻压，让汁水出来。',state:'番茄变软，锅底出现红色汁水。锅底太干时补一小勺水。',art:'tomato',seconds:150},
        {title:'豆腐慢慢煨，别大力翻',text:'加入 {{150}} ml 水，轻轻滑入豆腐。煮沸后转小火，盖盖煮约 5 分钟。期间轻晃锅身，尽量不翻动豆腐。',state:'汤汁轻轻冒泡，豆腐从里到外热透。',art:'simmer',seconds:300},
        {title:'试味，再决定放多少盐',text:'先加入盐 {{1}} g，轻推锅底拌匀，尝一口汤。喜欢更鲜的口味可加生抽 {{5}} ml。撒可选香葱，关火盛出。',state:'汤汁略浓、豆腐完整。配饭或单独吃，都先小口试温。',art:'serve',seconds:30}
      ],
      why:[['为什么要用小火？','嫩豆腐很柔软，大火的翻滚和频繁翻炒都会让它碎开。轻微沸腾可以让豆腐热透，同时保持完整。'],['为什么没有鸡精和淀粉？','这个版本由 HowToCook 的西红柿豆腐汤羹简化而来，改成番茄煨豆腐，省去蛋、淀粉和鸡精，减少海外厨房需要买的调味料。']],substitutions:['嫩豆腐 → Firm tofu 也可，切小块，口感会更扎实。','鲜番茄 → 无盐番茄罐头约 180 g，使用前看一下配料表。'],source:{label:'基于 HowToCook「西红柿豆腐汤羹」的简化改编',path:'dishes/vegetable_dish/西红柿豆腐汤羹/西红柿豆腐汤羹.md'}
    },
    {
      id:'mushroom-pasta',name:'蒜香蘑菇意面',en:'Garlic mushroom spaghetti',time:20,difficulty:'第一次也能做',type:'vegan',image:'q2',tag:'超市就能买齐',description:'蘑菇煎香，蒜片出味。一点煮面水，让清爽的酱汁也能挂住面条。',tools:'煮锅、平底锅、漏勺或夹子',
      ingredients:[{name:'意面',amount:80,unit:'g'},{name:'蘑菇',amount:150,unit:'g'},{name:'大蒜',amount:2,unit:'瓣'},{name:'食用油',amount:10,unit:'ml'},{name:'盐',amount:1.5,unit:'g'},{name:'黑胡椒',amount:0.3,unit:'g',optional:true}],
      steps:[
        {title:'水烧起来，先做切配',text:'煮锅里加入足够的水煮沸。蘑菇擦净或快速冲洗后擦干，切成约 5 mm 厚的片。大蒜去皮切薄片。',state:'蘑菇表面越干，后面越容易煎出金黄边缘。',art:'cut',seconds:180},
        {title:'煮面，留一点煮面水',text:'意面 {{80}} g 下入沸水，按包装建议煮到接近熟。舀出 {{100}} ml 煮面水备用，再把面沥出。多份用量时以能淹没面条为准。',state:'尝一小根，中心有轻微弹性而没有干硬芯。',art:'noodles',seconds:480},
        {title:'先煎蘑菇，再放蒜片',text:'平底锅里加油 {{10}} ml，中火把蘑菇铺开，先煎约 2 分钟不急着翻。出现褐色边缘后翻面，再放蒜片，转小火炒约 30 秒。',state:'蘑菇有金黄边缘，蒜片散发香味但没有焦黑。锅小就分批煎。',art:'pan',seconds:150},
        {title:'让面条裹上酱汁',text:'放入意面和一半备用煮面水，转中火翻拌约 1 分钟。用盐 {{1.5}} g 和可选黑胡椒调味。太干时分次补入剩下的煮面水。',state:'面条表面有薄薄的光泽，锅里不剩一大滩水。',art:'serve',seconds:60}
      ],why:[['为什么要留煮面水？','煮面水含有从面条释放出的淀粉，和油一起拌时，可以帮助形成轻薄的酱汁，让味道更均匀地裹在面条上。'],['为什么蒜片晚一点放？','蒜片很薄、含水量少，长时间煎很容易焦苦。等蘑菇煎出颜色再放，更容易掌握火候。']],substitutions:['意面 → 中式面条也可，但煮制时间以包装为准。','蘑菇 → White mushroom、cremini 都可。图中香草是可选点缀，不影响做法。'],source:{label:'CookXuan 原创新手食谱',url:null}
    },
    {
      id:'potato-stew',name:'土豆胡萝卜暖炖',en:'Cozy potato & carrot stew',time:30,difficulty:'交给时间就好',type:'vegan',image:'q3',tag:'一锅慢慢暖',description:'便宜好买的根茎蔬菜，煨得软软糯糯。锅里咕嘟一会儿，就能端上桌。',tools:'带盖小锅、锅铲',
      ingredients:[{name:'土豆',amount:200,unit:'g'},{name:'胡萝卜',amount:100,unit:'g'},{name:'豌豆',amount:30,unit:'g',optional:true},{name:'食用油',amount:5,unit:'ml'},{name:'生抽',amount:10,unit:'ml'},{name:'盐',amount:0.5,unit:'g',optional:true}],
      steps:[{title:'切成差不多大的块',text:'土豆、胡萝卜洗净去皮，都切成约 2 cm 的块。土豆用清水快速冲一下，沥水。',state:'块头相近，后面才能差不多同时煮软。',art:'cut',seconds:240},{title:'先给蔬菜一点香气',text:'锅中放油 {{5}} ml，中火放入土豆和胡萝卜，翻炒约 2 分钟，再倒入生抽 {{10}} ml。',state:'表面均匀裹上少量油和酱汁，没有糊底。',art:'pan',seconds:120},{title:'盖上盖子，慢慢炖',text:'加 {{300}} ml 水，水量接近食材表面。大火煮沸后转小火，盖盖炖约 15–20 分钟，中途看一次，水太少就少量补入。',state:'用筷子能轻松穿透土豆中心。锅底始终有水，不要干烧。',art:'simmer',seconds:1080},{title:'收一点汁，尝一口味',text:'如有豌豆，在最后约 3 分钟加入，按包装指导煮熟。开盖略收汁，尝味后决定是否加盐 {{0.5}} g，关火盛出。',state:'土豆边缘略松软，汤汁能附在蔬菜上。',art:'serve',seconds:180}],why:[['为什么土豆切块大小很重要？','大块中心熟得慢，小块可能先煮散。切成接近的尺寸，比严格对秒计时更容易煮得均匀。'],['怎么判断炖好了？','用筷子或叉子扎进最厚的一块土豆，能轻松穿过中心就熟软了。如果汤汁先变少、土豆仍硬，补少量水继续煮。']],substitutions:['没有豌豆 → 直接省略，不影响这道菜。','生抽含盐 → 先尝再加可选盐，不需要把调料全部加进去。'],source:{label:'CookXuan 原创新手食谱',url:null}
    },
    {
      id:'garlic-broccoli',name:'蒜蓉西兰花',en:'Broccoli with garlic sauce',time:15,difficulty:'第一次也能做',type:'vegan',image:'skill-leaf',tag:'学会一道基础菜',description:'先焯水，再拌入蒜香汁。蔬菜的颜色和口感，就是最直观的进度条。',tools:'煮锅、漏勺、小平底锅',
      ingredients:[{name:'西兰花',amount:200,unit:'g'},{name:'大蒜',amount:2,unit:'瓣'},{name:'食用油',amount:5,unit:'ml'},{name:'生抽',amount:5,unit:'ml'},{name:'糖',amount:1,unit:'g',optional:true}],
      steps:[{title:'掰小朵，洗干净',text:'西兰花切成大小相近的小朵，粗茎削去硬皮后切片，大蒜剁成细末。',state:'每朵约 3 cm，大小接近。',art:'cut',seconds:180},{title:'沸水里焯熟',text:'锅里加足量水烧沸。放入西兰花，煮约 2–3 分钟后捞出沥干。',state:'颜色变翠绿，茎部能轻松咬动。',art:'simmer',seconds:150},{title:'小火炒蒜，调一碗汁',text:'小锅加油 {{5}} ml，放蒜末，小火加热约 20–30 秒。加生抽 {{5}} ml、清水 {{15}} ml 和可选糖 {{1}} g，轻轻煮沸后关火。',state:'蒜末有香气，没有变成深褐色。',art:'sauce',seconds:30},{title:'淋上去，拌一拌',text:'把蒜蓉汁均匀淋在西兰花上，轻轻拌匀，趁热吃。',state:'汁水刚好附在花朵上，盘底没有大量积水。',art:'serve',seconds:30}],why:[['为什么先焯水？','让花朵与茎部先熟，再用少量蒜蓉汁调味，能减少新手直接翻炒时外焦内生的情况。'],['这个版本为什么没有蚝油？','从 HowToCook 的蒜蓉西兰花简化而来，省略蚝油并减量调味，也方便纯素食者使用。']],substitutions:['新鲜西兰花 → 冷冻西兰花，优先遵循包装加热说明。'],source:{label:'基于 HowToCook「蒜蓉西兰花」的无蚝油简化改编',path:'dishes/vegetable_dish/蒜蓉西兰花.md'}
    },
    {
      id:'tomato-eggs',name:'家常番茄炒蛋',en:'Classic tomato & scrambled eggs',time:12,difficulty:'第一次也能做',type:'vegetarian',image:'skill-chef',tag:'第一道拿手菜',description:'在厨房练习的第一道菜。学会看鸡蛋的凝固状态，也学会控制番茄的汁水。',tools:'不粘炒锅、碗、锅铲',
      ingredients:[{name:'番茄',amount:1,unit:'个',note:'约 180 g'},{name:'鸡蛋',amount:2,unit:'个'},{name:'食用油',amount:8,unit:'ml'},{name:'盐',amount:1.5,unit:'g'},{name:'糖',amount:1,unit:'g',optional:true}],
      steps:[{title:'番茄切块，鸡蛋打散',text:'番茄洗净去蒂，切约 2 cm 块。鸡蛋打入碗里，加一半盐，充分打散。',state:'蛋白和蛋黄混合均匀。',art:'cut',seconds:180},{title:'先炒蛋，再盛出',text:'油 {{8}} ml 中火加热约 30 秒，倒入蛋液，用锅铲轻推到全部凝固、还保持柔软，立即盛出。',state:'没有流动蛋液，鸡蛋表面仍有光泽。',art:'egg',seconds:60},{title:'炒到番茄有汁水',text:'同一口锅放番茄，中小火翻炒约 2 分钟，直到变软出汁。太干时加 {{20}} ml 清水。',state:'用锅铲能轻松压开番茄。',art:'tomato',seconds:120},{title:'合在一起，尝味出锅',text:'放回鸡蛋，加剩余盐和可选糖，翻拌约 30 秒，热透后关火盛出。',state:'鸡蛋表面裹着番茄汁，汤汁没有被完全烧干。',art:'serve',seconds:30}],why:[['为什么不要一直炒鸡蛋？','鸡蛋凝固后继续长时间受热，会更紧实、更容易出水。先盛出是最容易掌握嫩度的方法。'],['为什么糖是可选的？','番茄的酸度各不相同。糖可以平衡酸味，但并不是这道菜必需的调味料。']],substitutions:['大番茄 → 等重量的小番茄也可；小番茄对半切。'],source:{label:'基于 HowToCook「西红柿炒鸡蛋」的新手改编',path:'dishes/vegetable_dish/西红柿炒鸡蛋.md'}
    }
  ]
};
