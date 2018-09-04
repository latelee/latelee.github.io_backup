
function genMenu(){

    document.writeln("</td><td>");
     //百度搜索
    (function(){document.write(unescape('%3Cdiv id="bdcs"%3E%3C/div%3E'));var bdcs = document.createElement('script');bdcs.type = 'text/javascript';bdcs.async = true;bdcs.src = 'http://znsv.baidu.com/customer_search/api/js?sid=8364670027275102702' + '&plate_url=' + encodeURIComponent(window.location.href) + '&t=' + Math.ceil(new Date()/3600000);var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bdcs, s);})();
    document.writeln("</td></tr>");
    
    document.writeln("</table>");
     
     
    
    document.writeln("　 <a href=\"javascript:zh_tran('s');\" class=\"zh_click\" id=\"zh_click_s\">【简体】</a> <a href=\"javascript:zh_tran('t');\" class=\"zh_click\" id=\"zh_click_t\">【繁體】</a>");
}
// 网页简繁体转换 for 劝学网
// 本js用于客户在网站页面选择繁体中文或简体中文显示，默认是正常显示，即简繁体同时显示
// 在用户第一次访问网页时,会自动检测客户端语言进行操作并提示.此功能可关闭
// 本程序只在UTF8编码下测试过，不保证其他编码有效。

// -------------- 以下参数大部分可以更改 --------------------
//s = simplified 简体中文 t = traditional 繁体中文 n = normal 正常显示
var zh_default = 'n'; //默认语言，请不要改变
var zh_choose = 'n'; //当前选择
var zh_expires = 7; //cookie过期天数
var zh_class = 'zh_click'; //链接的class名，id为class + s/t/n 之一
var zh_style_active = 'font-weight:bold; color:green;'; //当前选择的链接式样
var zh_style_inactive = 'color:blue;'; //非当前选择的链接式样
var zh_browserLang = ''; //浏览器语言
var zh_autoLang_t = true; //浏览器语言为繁体时自动进行操作
var zh_autoLang_s = false; //浏览器语言为简体时自动进行操作
var zh_autoLang_alert = true; //自动操作后是否显示提示消息
//自动操作后的提示消息
var zh_autoLang_msg = '歡迎來到本站,本站爲方便台灣香港的用戶\n1.采用UTF-8國際編碼,用任何語言發帖都不用轉碼.\n2.自動判斷繁體用戶,顯示繁體網頁\n3.在網頁最上方有語言選擇,如果浏覽有問題時可以切換\n4.本消息在cookie有效期內只顯示一次';
var zh_autoLang_checked = 0; //次检测浏览器次数,第一次写cookie为1,提示后为2,今后将不再提示

//判断浏览器语言的正则,ie为小写,ff为大写
var zh_langReg_t = /^zh-tw|zh-hk$/i;
var zh_langReg_s = /^zh-cn$/i;

//简体繁体对照字表,可以自行替换
var zh_s = '万与丑专业东丝丢两严丧个丰临为举么义乐习乡书买乱争于亏云亚产亲亿仅从仑仓们价众优伙会伟传伤伦体余侥侧俩倾偿储儿党兰关兴兹养内册写军农冲冲决况净凄准凉减凑几凤凯凶击凿划刘则刚创删别刽剂剥剧劝办务动励劲劳势区医华协单卖占卫却厂历历厉压厌厕厘厢县参双发发变台叶号后向吓吕吗听启吴员周响哑哗团园围国图圆圣场坏块坚坛垄垒堕墙壮声壳处备复够头夸夹夺奋奖妇妈姜娄娱婴孙学宁宝实宠审宪对寻导将尔尝尴尽层届属岁岂岗巨币师带帮干并幸广庄库应庞废开异弃张弥弹强归当录彻征径径忆志怀态怆怜总恋恒恳恶悬悯惊惨惯愤愿懒戏战户扑托执扩扫扬扰折抚抢护报担拟拢拥拨择挂挤挥捞损换据搁摄摆摇摊撑攒敌敛数斗断无旧时显晓暂术机杀杂权条来杨杰板极构标栈栏树样档桦梦检楼槛横欢欧欲残毁毕气汇汉沟没沦泄泪泽浅测济浏浑浓涌涛涡涤润涨渐渗温游湾湿滚滞满潜灭灯灵灾灿点烂烦烧热熏爱爷牵牺状犹独狭狱环现电画畅畴疗疮痒监盖盘着矿码础确碍离种积称税稳穷竞笔筑筝筹签签简类粮糟系紧纠红约级纪纯纲纳纷纸纽纾线练组绅细织终绍经结给络绝统继绩绪续绳维绵综绿缓缔编缚缝缩缴网罗罢耀耸耻聋职联肤肾胁胆胜胳脉脏脏脑脚脱脸腾舆舍舰舱艰艺节芦苏范荐荡荣药莱莲获获营萧蓝虑虚虫虽蚀蚁蚂补袭装见观规视览觉触誉计订认讨让议讯记讲讳讶许论讽设访证评识诉词译试诗诚话询该详语误说请诸读课谁调谅谈谋谎谓谢谣谩谬贝负财责败货质贩贪贫购贯贴贵费资赌赏赖赘赚赛赞赞赢赶趋跃践车轨转轮软轰轻载较辄辆辈辉辐辑输辞辩边达迁过迈运还这进远违连迹迹适选递逻遗遥邓邮邻郑酿采释里针钙钟钢钦钮钱钻铁铅铜铲链销锁锄错锦键锺镖镜长门闪闭问闲间闷闹闻阂阅阙队阳阴阵阶际陆陈险随隐隶难雇雏雳静韩页顶顷项顺须顾顿颂预领颇频颖题额风飞饥饭饰饱饼饿馆马驭驱驳驼驾骂骆验骑骗骤鱼鲁鲜鸣鸭鸯鸳鹰黄齐齿龙樱剑';
var zh_t = '萬與醜專業東絲丟兩嚴喪個豐臨為舉麼義樂習鄉書買亂爭於虧雲亞產親億僅從崙倉們價眾優夥會偉傳傷倫體餘僥側倆傾償儲兒黨蘭關興茲養內冊寫軍農衝沖決況淨淒準涼減湊幾鳳凱兇擊鑿劃劉則剛創刪別劊劑剝劇勸辦務動勵勁勞勢區醫華協單賣佔衛卻廠歷曆厲壓厭廁釐廂縣參雙發髮變臺葉號後嚮嚇呂嗎聽啟吳員週響啞譁團園圍國圖圓聖場壞塊堅壇壟壘墮牆壯聲殼處備複夠頭誇夾奪奮獎婦媽薑婁娛嬰孫學寧寶實寵審憲對尋導將爾嘗尷盡層屆屬歲豈崗鉅幣師帶幫幹並倖廣莊庫應龐廢開異棄張彌彈強歸當錄徹徵徑逕憶誌懷態愴憐總戀恆懇惡懸憫驚慘慣憤願懶戲戰戶撲託執擴掃揚擾摺撫搶護報擔擬攏擁撥擇掛擠揮撈損換據擱攝擺搖攤撐攢敵斂數鬥斷無舊時顯曉暫術機殺雜權條來楊傑闆極構標棧欄樹樣檔樺夢檢樓檻橫歡歐慾殘毀畢氣彙漢溝沒淪洩淚澤淺測濟瀏渾濃湧濤渦滌潤漲漸滲溫遊灣濕滾滯滿潛滅燈靈災燦點爛煩燒熱薰愛爺牽犧狀猶獨狹獄環現電畫暢疇療瘡癢監蓋盤著礦碼礎確礙離種積稱稅穩窮競筆築箏籌簽籤簡類糧蹧係緊糾紅約級紀純綱納紛紙紐紓線練組紳細織終紹經結給絡絕統繼績緒續繩維綿綜綠緩締編縛縫縮繳網羅罷燿聳恥聾職聯膚腎脅膽勝骼脈臟髒腦腳脫臉騰輿捨艦艙艱藝節蘆甦範薦盪榮藥萊蓮穫獲營蕭藍慮虛蟲雖蝕蟻螞補襲裝見觀規視覽覺觸譽計訂認討讓議訊記講諱訝許論諷設訪證評識訴詞譯試詩誠話詢該詳語誤說請諸讀課誰調諒談謀謊謂謝謠謾謬貝負財責敗貨質販貪貧購貫貼貴費資賭賞賴贅賺賽贊讚贏趕趨躍踐車軌轉輪軟轟輕載較輒輛輩輝輻輯輸辭辯邊達遷過邁運還這進遠違連蹟跡適選遞邏遺遙鄧郵鄰鄭釀採釋裡針鈣鐘鋼欽鈕錢鑽鐵鉛銅鏟鏈銷鎖鋤錯錦鍵鍾鏢鏡長門閃閉問閒間悶鬧聞閡閱闕隊陽陰陣階際陸陳險隨隱隸難僱雛靂靜韓頁頂頃項順須顧頓頌預領頗頻穎題額風飛饑飯飾飽餅餓館馬馭驅駁駝駕罵駱驗騎騙驟魚魯鮮鳴鴨鴦鴛鷹黃齊齒龍櫻劍';
String.prototype.tran = function() {
var s1,s2;
if (zh_choose == 't') {
s1 = zh_s;
s2 = zh_t;
}else if(zh_choose == 's') {
s1 = zh_t;
s2 = zh_s;
}else {
return this;
}
var a = '';
var l = this.length;
for(var i=0;i<this.length;i++){
var c = this.charAt(i);
var p = s1.indexOf(c)
a += p < 0 ? c : s2.charAt(p);
}
return a;
}
function setCookie(name, value) {
var argv = setCookie.arguments;
var argc = setCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
if (expires != null) {
var LargeExpDate = new Date ();
LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
}
document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString()));
}
function getCookie(Name) {
var search = Name + "="
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search);
if(offset != -1) {
offset += search.length;
end = document.cookie.indexOf(";", offset);
if(end == -1) end = document.cookie.length;
return unescape(document.cookie.substring(offset, end));
}else {
return '';
}
}
}

function zh_tranBody(obj) {
var o = (typeof(obj) == "object") ? obj.childNodes : document.body.childNodes;
for (var i = 0; i < o.length; i++) {
var c = o.item(i);
if ('||BR|HR|TEXTAREA|SCRIPT|'.indexOf("|"+c.tagName+"|") > 0) continue;
if (c.className == zh_class) {
if (c.id == zh_class + '_' + zh_choose) {
c.setAttribute('style', zh_style_active);
c.style.cssText = zh_style_active;
}else {
c.setAttribute('style', zh_style_inactive);
c.style.cssText = zh_style_inactive;
}
continue;
}
if (c.title != '' && c.title != null) c.title = c.title.tran();
if (c.alt != '' && c.alt != null) c.alt = c.alt.tran();
if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = c.value.tran();
if (c.nodeType == 3) {
c.data = c.data.tran();
}else{
zh_tranBody(c);
}
}
}

function zh_tran(go) {
if (go) zh_choose = go;
setCookie('zh_choose', zh_choose, zh_expires);
if (go == 'n') {
window.location.reload();
}else {
zh_tranBody();
}
}

function zh_getLang() {
if (getCookie('zh_choose')) {
zh_choose = getCookie('zh_choose');
return true;
}
if (!zh_autoLang_t && !zh_autoLang_s) return false;
if (getCookie('zh_autoLang_checked')) return false;
if (navigator.language) {
zh_browserLang = navigator.language;
}else if (navigator.browserLanguage) {
zh_browserLang = navigator.browserLanguage;
}
if (zh_autoLang_t && zh_langReg_t.test(zh_browserLang)) {
zh_choose = 't';
}else if (zh_autoLang_s && zh_langReg_s.test(zh_browserLang)) {
zh_choose = 's';
}
zh_autoLang_checked = 1;
setCookie('zh_choose', zh_choose, zh_expires);
if (zh_choose == zh_default) return false;
return true;
}

function zh_init() {
zh_getLang();
c = document.getElementById(zh_class + '_' + zh_choose);
if (zh_choose != zh_default) {
if (window.onload) {
window.onload_before_zh_init = window.onload;
window.onload = function() {
zh_tran(zh_choose);
if (getCookie('zh_autoLang_check')) {alert(zh_autoLang_msg);};
window.onload_before_zh_init();
};
}else {
window.onload = function() {
zh_tran(zh_choose);
if (getCookie('zh_autoLang_check')) {alert(zh_autoLang_msg);};
};
}
}

}
zh_init();

//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?da94247e5b70c927a6e6933bccb11e29";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


//footer
function genfooter(){
	 document.write("<div class='foot'>");
		document.write("本站所列电子书为方便之用，请大家尽可能购买实体书（本站<a href='http://buy.quanxue.cn' target='_blank'>书城</a>有售）<br>");
		document.write("海内存知已，天涯若比邻，欢迎您加入劝学网以下QQ群，结识志同道合的朋友：<br>");
		document.write("<b>劝学网儒家群(136761088)；</b>");
		document.write("<b>劝学网道家群(121709505)；</b>");
		document.write("<b>劝学网佛家群(130338651)</b><br>");
		document.write("<b>劝学网周易群(123208056)；</b>");
		document.write("<b>劝学网历史群(154204903)；</b> ");
		document.write("<b>劝学网国学讲堂群(103317201)</b><br>");
	 	 document.write("纠错或者投稿联系方式：电话 ：020-85626400　联系E-mail：513205549@qq.com QQ联系:513205549<br>");
		document.write("<img src='../img/quanxue-fojing.jpg'>");
	document.write("</div>");
}