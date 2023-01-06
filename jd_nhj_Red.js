/*
年货节red 解密 瓜瓜
脚本锁佣建议用新的京粉号
https://u.jd.com/xxxxxxx

返利变量：JD_nhj_rebateCode，若需要返利给自己，请自己修改环境变量[JD_nhj_rebateCode]
xxxxxxx换成自己的返利 就是链接后面那7位字母
export JD_nhj_rebateCode="xxxxxxx"

需要助力ck中的pin值
pin1换成对应的pin值 用,分开(填中文)
只助力2个 满了脚本自动从ck1开始替换未满的
export JD_nhj_rebatePin="pin1,pin2"

每次脚本领取红包次数
export JD_nhj_redTimes="0"
0=不限制 1=领取1次

助力次数
export JD_nhj_shareHelpCount="0"
0=默认 1=1次满 2=2次满

0 0,10,20 * * * https://raw.githubusercontent.com/smiek2121/scripts/master/gua_nhj_Red.js 年货节red
*/

let rebateCodes = ''; // 返利变量
let rebatePin = ''; // 助力pin变量
let redTimes = 0 // 领取次数
let shareHelpCount = 0 // 助力次数 0=默认 1=1次满 2=2次满

const Env=require('./utils/Env.js');

const $=new Env('年货节red');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):''
const jsdom=require('jsdom');
$.CryptoJS=require('crypto-js')
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach((item)=>{
		cookiesArr.push(jdCookieNode[item])
	})
    if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||"[]").map(item=>item.cookie)].filter(item=>!!item);
}
if(!rebateCodes)rebateCodes='https://u.jd.com/mIUnVGS';
if(!rebatePin)rebatePin='';
rebateCodes=$.isNode()?process.env['JD_nhj_rebateCode']?process.env['JD_nhj_rebateCode']:''+rebateCodes:$.getdata('JD_nhj_rebateCode')?$.getdata('JD_nhj_rebateCode'):''+rebateCodes;
rebatePin=$.isNode()?process.env['JD_nhj_rebatePin']?process.env['JD_nhj_rebatePin']:''+rebatePin:$.getdata('JD_nhj_rebatePin')?$.getdata('JD_nhj_rebatePin'):''+rebatePin;
redTimes=$.isNode()?process.env['JD_nhj_redTimes']?process.env['JD_nhj_redTimes']:''+redTimes:$.getdata('JD_nhj_redTimes')?$.getdata('JD_nhj_redTimes'):''+redTimes;
$.shareCount=$.isNode()?process.env['JD_nhj_shareHelpCount']?process.env['JD_nhj_shareHelpCount']:''+shareHelpCount:$.getdata('JD_nhj_shareHelpCount')?$.getdata('JD_nhj_shareHelpCount'):''+shareHelpCount;
$.shareCount=parseInt($.shareCount,10)||0;
let li111iII=rebatePin&&rebatePin.split(',')||[];
rebateCode=rebateCodes+'';
$.time('yyyy-MM-dd HH:mm:ss');
message='';
newCookie='';
resMsg='';
$.uiUpdateTime='';
$.endFlag=false;
$.runEnd=false;
let liIi={};
$.getH5st_WQ_Arr={};
$.runArr={};
let l1ll111l=null;
const iiI111II='2023/01/16 00:00:00+08:00';
let Ill1lI=new Date()['getTime']()+new Date()['getTimezoneOffset']()*60*1000+8*60*60*1000;
let iiIl11lI=$.time('H',Ill1lI);
$.UVCookieArr={};
lr={};
$.UVCookie='';
let IIliiI1i='';
let ilIlIIii='';
$.time('yyyy-MM-dd');
ilIIIl();
!(async()=>{
	if(/https:\/\/u\.jd\.com\/.+/['test'](rebateCode)){
		if(rebateCode.split('/')['pop']()){
			rebateCode=rebateCode.split('/')['pop']()['split']('?')['shift']();
		}else{
			console.log('请填写正确的rebateCode');
			return;
		}
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	if(Ill1lI>new Date(iiI111II)['getTime']()){
		$.msg($.name,'活动已结束','请删除此脚本');
		$.setdata('','JD_nhj_Reds');
		$.setdata('','JD_nhj_Red');
		$.setdata('','JD_nhj_Red_pin');
		return;
	}
	console.log('当前版本：2023年01月05日');
	console.log('返利码：'+rebateCode.replace(/.+(.{3})/,'***$1')+'\n');
	$.shareCodeArr={};
	$.shareCodePinArr=$.getdata('JD_nhj_Red_pin')||{};
	$.shareCode='';
	$.again=false;
	let I11II11l=false;
	await IiII1lil();
	if($.end)return;
	for(let lI1I111l=0;lI1I111l<cookiesArr.length&&!$.runEnd;lI1I111l++){
		if($.endFlag)break;
		cookie=cookiesArr[lI1I111l];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=lI1I111l+1;
			if($.runArr[$.UserName])continue;
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			let lii1ll=1;
			if(!cookie.includes('app_open')){
				lii1ll=2;
			}
			await iiil1iI(lii1ll);
			await iiI11III();
			if($.endFlag)break;
		}
		$.setdata($.shareCodePinArr,'JD_nhj_Red_pin');
	}
	$.setdata($.shareCodePinArr,'JD_nhj_Red_pin');
	if(message){
		$.msg($.name,'',message+'\nhttps://u.jd.com/'+rebateCode+'\n\n跳转到app 可查看助力情况');
		if($.isNode()){}
	}
})()['catch'](iIliiI1=>$.logErr(iIliiI1))['finally'](()=>{
	if(l1ll111l)l1ll111l.close();
	$.done();
});
async function iiI11III(Il1I1=0){
	try{
		$.UVCookie=$.UVCookieArr[$.UserName]||'';
		if(!$.UVCookie){
			ilIIIl();
		}
		resMsg='';
		let Ii1I1i1i=false;
		let iIIiliI=0;
		let iIl1Iiii=0;
		let iliI111l=0;
		$.shareFlag=true;
		do{
			if(iIl1Iiii>2)iIIiliI=0;
			$.flag=0;
			newCookie='';
			$.url1='';
			await iilIIlII();
			if(!$.url1){
				console.log('获取url1失败');
				$.end=true;
				break;
			}
			$.url2='';
			$.UVCookie=IIliiI1i.getUVCookie('','',$.url1,$.UVCookie);
			$.UVCookieArr[$.UserName]=$.UVCookie+'';
			await iliil1();
			if(!/unionActId=\d+/['test']($.url2)&&!new RegExp('&d='+rebateCode)['test']($.url2)){
				console.log('改返利url：https://u.jd.com/'+rebateCode+' 可能不是红包页面');
				$.runEnd=true;
				return;
			}
			if(!$.url2)$.url2='https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html?unionActId=31155&d='+rebateCode+'&cu=true&utm_source=kong&utm_medium=jingfen';
			$.actId=$.url2['match'](/mall\/active\/([^\/]+)\/index\.html/)&&$.url2['match'](/mall\/active\/([^\/]+)\/index\.html/)[1]||'CZVwK75uo38y7YdC2v8dJ6TH9SS';
			$.UVCookie=IIliiI1i.getUVCookie('','',$.url2,$.UVCookie);
			$.UVCookieArr[$.UserName]=$.UVCookie+'';
			$.eid='';
			if(!$.eid){
				$.eid=-1;
			}
			if(Il1I1==0){
				let iill1111=0;
				let i1lIIllI=true;
				let I1I1i1iI=0;
				if(Object.getOwnPropertyNames(liIi)['length']>iIIiliI&&$.shareFlag){
					for(let liII1i1I in liIi||{}){
						if(liII1i1I==$.UserName){
							$.flag=1;
							continue;
						}
						if(iill1111==iIIiliI){
							$.flag=0;
							$.shareCode=liIi[liII1i1I]||'';
							if($.shareCodePinArr[liII1i1I]&&$.shareCodePinArr[liII1i1I]['includes']($.UserName)){
								I1I1i1iI++;
								continue;
							}
							if($.shareCode['count']>=$.shareCodeArr['shareCount']){
								I1I1i1iI++;
								continue;
							}
							$.getlj=false;
							if($.shareCode)console.log('助力['+liII1i1I+']');
							let l11lilIi=await Illi1l($.shareCode['code'],1);
							if(/重复助力/['test'](l11lilIi)){
								if(!$.shareCodePinArr[liII1i1I])$.shareCodePinArr[liII1i1I]=[];
								$.shareCodePinArr[liII1i1I]['push']($.UserName);
								iIIiliI--;
								iliI111l--;
							}else if(/助力/['test'](l11lilIi)&&/上限/['test'](l11lilIi)){
								$.shareFlag=false;
							}else if(!/领取上限/['test'](l11lilIi)&&$.getlj==true){
								if(!$.shareCodePinArr[liII1i1I])$.shareCodePinArr[liII1i1I]=[];
								if(!$.shareCodePinArr[liII1i1I]['includes']($.UserName)){
									$.shareCodePinArr[liII1i1I]['push']($.UserName);
								}
								iIIiliI--;
							}else{
								i1lIIllI=false;
							}
						}
						iill1111++;
					}
				}
				if(i1lIIllI&&I1I1i1iI==Object.getOwnPropertyNames(liIi)['length']){
					Ii1I1i1i=true;
				}
				if(iill1111==0){
					$.getlj=false;
					let Ilil1il=await Illi1l('',1);
					if(!/领取上限/['test'](Ilil1il)&&$.getlj==true){
						iIIiliI--;
					}
				}
				if($.endFlag)break;
			}else{
				let IilliilI=await II1lIiiI();
				if(!$.endFlag&&IilliilI&&$.again==false)await I11ili11();
				if($.again==false)break;
			}
			if($.again==true&&iIl1Iiii<1){
				iIl1Iiii++;
				$.again=false;
			}
			iIIiliI++;
			iliI111l++;
			if($.flag==1){
				await $.wait(parseInt(Math.random()*500+100,10));
			}
			if(redTimes>0&&redTimes<=iliI111l)break;
		}while($.flag==1&&iIIiliI<5);
		if($.endFlag)return;
		if(resMsg){
			message+='【京东账号'+$.index+'】\n'+resMsg;
		}
		if(Ii1I1i1i){
			console.log('\n获取新的助力信息');
			await IiII1lil(1);
		}
		await $.wait(parseInt(Math.random()*500+200,10));
	}catch(IIl1Iil){
		console.log(IIl1Iil);
	}
}
async function IiII1lil(Il1l1lii=0){
	try{
		let i1lliiIl=2;
		if(Il1l1lii==1)i1lliiIl=1;
		let lllIlI1l=0;
		for(let iillli1i in $.shareCodeArr||{}){
			if(iillli1i==='flag'||iillli1i==='updateTime'||iillli1i==='shareCount')continue;
			if($.shareCodeArr[iillli1i]&&$.shareCodeArr['shareCount']&&$.shareCodeArr[iillli1i]['count']<$.shareCodeArr['shareCount'])lllIlI1l++;
		}
		for(let l1l1Ill=0;l1l1Ill<cookiesArr.length&&!$.runEnd;l1l1Ill++){
			cookie=cookiesArr[l1l1Ill];
			if(cookie){
				$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
				if(li111iII.length>0&&li111iII.indexOf($.UserName)==-1||$.shareCodeArr[$.UserName])continue;
				$.index=l1l1Ill+1;
				await iiil1iI();
				await iiI11III(1);
				let i111iil=0;
				for(let iillli1i in $.shareCodeArr||{}){
					if(iillli1i==='flag'||iillli1i==='updateTime'||iillli1i==='shareCount')continue;
					if($.shareCodeArr[iillli1i]&&$.shareCodeArr['shareCount']&&$.shareCodeArr[iillli1i]['count']<$.shareCodeArr['shareCount'])i111iil++;
				}
				if($.endFlag||i111iil-lllIlI1l>=i1lliiIl||$.end)break;
			}
		}
	}catch(Iliilili){
		console.log(Iliilili);
	}
	if(Object.getOwnPropertyNames($.shareCodeArr)['length']>0){
		for(let lIIl1I1i in $.shareCodeArr||{}){
			if(lIIl1I1i==='flag'||lIIl1I1i==='updateTime'||lIIl1I1i==='shareCount')continue;
			if($.shareCodeArr[lIIl1I1i])liIi[lIIl1I1i]=$.shareCodeArr[lIIl1I1i];
		}
	}
}
function Illi1l(Iii111l1='',IliIi1II=1){
	return new Promise(async IiI1l=>{
		$.UVCookie=IIliiI1i.getUVCookie('','',$.url2,$.UVCookie);
		$.UVCookieArr[$.UserName]=$.UVCookie+'';
		let l11llIII='';
		let l11IlI1i=new Date()['getTime']()+new Date()['getTimezoneOffset']()*60*1000+8*60*60*1000;
		let I1IiiI1i=1;
		if($.time('H',l11IlI1i)=='20'){
			I1IiiI1i=4;
		}
		const iiiill11={'platform':I1IiiI1i,'unionActId':'31155','actId':$.actId,'d':rebateCode,'unionShareId':Iii111l1,'type':IliIi1II,'eid':$.eid};
		const llIi1i={'appid':'u','body':iiiill11,'client':'apple','clientVersion':'8.3.6','functionId':'getCoupons'};
		l11llIII=await i11lI1i('6a98d',llIi1i);
		l11llIII=encodeURIComponent(l11llIII);
		let iiilIlil='';
		let IlIIIlI={'url':'https://api.m.jd.com/api?functionId=getCoupons&appid=u&_='+l11IlI1i+'&loginType=2&body='+encodeURIComponent($.toStr(iiiill11))+'&client=apple&clientVersion=8.3.6&h5st='+l11llIII,'headers':{'accept':'*/*','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':''+$.UVCookie+newCookie+' '+cookie,'origin':'https://prodev.m.jd.com','Referer':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html','User-Agent':$.UA}};
		if($.url2)IlIIIlI.headers['Referer']=$.url2;
		$.get(IlIIIlI,async(IIIlll1i,lll11IlI,ill1l1iI)=>{
			try{
				if(IIIlll1i){
					console.log(''+$.toStr(IIIlll1i));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					let lii1l11I=$.toObj(ill1l1iI,ill1l1iI);
					if(typeof lii1l11I=='object'){
						if(lii1l11I.msg){
							iiilIlil=lii1l11I.msg;
							console.log(lii1l11I.msg);
						}
						if(lii1l11I.msg['indexOf']('不展示弹层')>-1&&IliIi1II==1)$.again=true;
						if(lii1l11I.msg['indexOf']('领取上限')===-1&&lii1l11I.msg['indexOf']('登录')===-1){
							if(IliIi1II==1)$.flag=1;
						}
						if(lii1l11I.msg['indexOf']('活动已结束')>-1||lii1l11I.msg['indexOf']('活动未开始')>-1){
							$.endFlag=true;
							return;
						}
						if(Iii111l1&&typeof lii1l11I.data!=='undefined'&&typeof lii1l11I.data['joinNum']!=='undefined'){
							console.log('当前'+lii1l11I.data['joinSuffix']+':'+lii1l11I.data['joinNum']);
						}
						if(lii1l11I.code==0&&lii1l11I.data){
							if(IliIi1II==1)$.shareCode['count']++;
							let I1llIli='';
							for(let I1iIIili of lii1l11I.data['couponList']){
								if(I1iIIili.type==1){
									$.getlj=true;
									I1llIli+=(I1llIli?'\n':'')+'获得[红包]🧧'+I1iIIili.discount+'元 使用时间:'+$.time('yyyy-MM-dd',I1iIIili.beginTime)+' '+$.time('yyyy-MM-dd',I1iIIili.endTime);
								}else if(I1iIIili.type==3){
									$.getlj=true;
									I1llIli+=(I1llIli?'\n':'')+'获得[优惠券]🎟️满'+I1iIIili.quota+'减'+I1iIIili.discount+' 使用时间:'+$.time('yyyy-MM-dd',I1iIIili.beginTime)+' '+$.time('yyyy-MM-dd',I1iIIili.endTime);
								}else if(I1iIIili.type==6){
									$.getlj=true;
									I1llIli+=(I1llIli?'\n':'')+'获得[打折券]]🎫满'+I1iIIili.quota+'打'+I1iIIili.discount*10+'折 使用时间:'+$.time('yyyy-MM-dd',I1iIIili.beginTime)+' '+$.time('yyyy-MM-dd',I1iIIili.endTime);
								}else{
									$.getlj=true;
									I1llIli+=(I1llIli?'\n':'')+'获得[未知]🎉'+(I1iIIili.quota||'')+' '+I1iIIili.discount+' 使用时间:'+$.time('yyyy-MM-dd',I1iIIili.beginTime)+' '+$.time('yyyy-MM-dd',I1iIIili.endTime);
									console.log(I1iIIili);
								}
							}
							if(I1llIli){
								resMsg+=I1llIli+'\n';
								console.log(I1llIli);
							}
						}
						if(IliIi1II==1&&typeof lii1l11I.data!=='undefined'&&typeof lii1l11I.data['groupData']!=='undefined'&&typeof lii1l11I.data['groupData']['groupInfo']!=='undefined'){
							for(let l111Ii1I of lii1l11I.data['groupData']['groupInfo']||[]){
								if(l111Ii1I.status==2){
									console.log('助力满可以领取'+l111Ii1I.info+'元红包🧧');
									await $.wait(parseInt(Math.random()*2000+2000,10));
									await Illi1l('',2);
								}
							}
						}
					}else{
						console.log(ill1l1iI);
					}
				}
			}catch(iillilIi){
				$.logErr(iillilIi,lll11IlI);
			}finally{
				IiI1l(iiilIlil);
			}
		});
	});
}
function II1lIiiI(l1i1IIlI=''){
	let l1liII=true;
	return new Promise(llI11iIi=>{
		$.UVCookie=IIliiI1i.getUVCookie('','',$.url2,$.UVCookie);
		$.UVCookieArr[$.UserName]=$.UVCookie+'';
		let lii1Ii1i=new Date()['getTime']()+new Date()['getTimezoneOffset']()*60*1000+8*60*60*1000;
		let iIIll1Ii=1;
		if($.time('H',lii1Ii1i)=='20'){
			iIIll1Ii=4;
		}
		let li1Ii11I={'url':'https://api.m.jd.com/api?functionId=showCoupon&appid=u&_='+Date.now()+'&loginType=2&body={%22actId%22:%22'+$.actId+'%22,%22unionActId%22:%2231155%22,%22unpl%22:%22'+$.unpl+'%22,%22platform%22:'+iIIll1Ii+',%22unionShareId%22:%22%22,'+($.uiUpdateTime?'%22uiUpdateTime%22:'+$.uiUpdateTime+',':'')+'%22d%22:%22'+rebateCode+'%22,%22eid%22:%22'+$.eid+'%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=','headers':{'accept':'*/*','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':''+$.UVCookie+newCookie+' '+cookie,'origin':'https://prodev.m.jd.com','Referer':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html','User-Agent':$.UA}};
		if($.url2)li1Ii11I.headers['Referer']=$.url2;
		$.get(li1Ii11I,async(iIliiiiI,ii1IIlli,iilllIIl)=>{
			try{
				if(iIliiiiI){
					console.log(''+$.toStr(iIliiiiI));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					let i1IllIil=$.toObj(iilllIIl,iilllIIl);
					if(typeof i1IllIil=='object'){
						if(i1IllIil.msg)console.log(i1IllIil.msg);
						if(i1IllIil.msg['indexOf']('不展示弹层')>-1)$.again=true;
						if(i1IllIil.msg['indexOf']('领取上限')>-1)$.runArr[$.UserName]=true;
						if(i1IllIil.msg['indexOf']('上限')===-1&&i1IllIil.msg['indexOf']('登录')===-1){
							$.flag=1;
						}
						if(i1IllIil.msg['indexOf']('活动已结束')>-1||i1IllIil.msg['indexOf']('活动未开始')>-1){
							$.endFlag=true;
							return;
						}
						if(i1IllIil.data['uiUpdateTime'])$.uiUpdateTime=i1IllIil.data['uiUpdateTime'];
						if(typeof i1IllIil.data!=='undefined'&&typeof i1IllIil.data['groupData']!=='undefined'&&typeof i1IllIil.data['groupData']['joinNum']!=='undefined'){
							$.joinNum=i1IllIil.data['groupData']['joinNum'];
							let l1l11I1i=0;
							for(let il1Ill11 of i1IllIil.data['groupData']['groupInfo']){
								if(l1l11I1i<il1Ill11.num)l1l11I1i=il1Ill11.num;
							}
							if($.shareCount>0&&l1l11I1i>$.shareCount)l1l11I1i=$.shareCount;
							if($.shareCodeArr[$.UserName]){
								$.shareCodeArr[$.UserName]['count']=l1l11I1i;
							}
							$.shareCodeArr['shareCount']=l1l11I1i;
							if(l1l11I1i<=$.joinNum){
								if(!$.shareCodeArr[$.UserName])$.shareCodeArr[$.UserName]={};
								$.shareCodeArr[$.UserName]['count']=$.joinNum;
								l1liII=false;
							}
							console.log('【账号'+$.index+'】'+($.nickName||$.UserName)+' '+$.joinNum+'/'+l1l11I1i+'人');
						}
						if(i1IllIil.msg['indexOf']('活动已结束')>-1){
							l1liII=false;
						}
						if(typeof i1IllIil.data!=='undefined'&&typeof i1IllIil.data['groupData']!=='undefined'&&typeof i1IllIil.data['groupData']['groupInfo']!=='undefined'){
							for(let iIlIlI11 of i1IllIil.data['groupData']['groupInfo']||[]){
								if(iIlIlI11.status==2){
									console.log('助力满可以领取'+iIlIlI11.info+'元红包🧧');
									await $.wait(parseInt(Math.random()*2000+2000,10));
									await Illi1l('',2);
								}
							}
						}
					}else{
						console.log(iilllIIl);
					}
				}
			}catch(II1IiI1){
				$.logErr(II1IiI1,ii1IIlli);
			}finally{
				llI11iIi(l1liII);
			}
		});
	});
}
function I11ili11(){
	if($.shareCodeArr[$.UserName]){
		console.log('【账号'+$.index+'】缓存分享码:'+$.shareCodeArr[$.UserName]['code']['replace'](/.+(.{3})/,'***$1'));
		return;
	}
	return new Promise(i1iIiiil=>{
		let llI11II1={'url':'https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_='+Date.now()+'&loginType=2&body={%22unionActId%22:%2231155%22,%22actId%22:%22'+$.actId+'%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22'+rebateCode+'%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22'+$.eid+'%22}&client=iPhone&clientVersion=&osVersion=iOS&screen=414*896&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=','headers':{'accept':'*/*','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':''+$.UVCookie+newCookie+' '+cookie,'origin':'https://prodev.m.jd.com','Referer':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html','User-Agent':$.UA}};
		$.get(llI11II1,async(l11iili,IIIiI1II,Il11Ii1I)=>{
			try{
				if(l11iili){
					console.log(''+$.toStr(l11iili));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					let iIiiIi1i=$.toObj(Il11Ii1I,Il11Ii1I);
					if(typeof iIiiIi1i=='object'){
						if(iIiiIi1i.code==0&&iIiiIi1i.data&&iIiiIi1i.data['shareUrl']){
							let iIl1l1li=iIiiIi1i.data['shareUrl']['match'](/\?s=([^&]+)/)&&iIiiIi1i.data['shareUrl']['match'](/\?s=([^&]+)/)[1]||'';
							if(iIl1l1li){
								console.log('【账号'+$.index+'】分享码：'+iIl1l1li.replace(/.+(.{3})/,'***$1'));
								$.shareCodeArr[$.UserName]={'code':iIl1l1li,'count':$.joinNum};
							}
						}
					}else{
						console.log(Il11Ii1I);
					}
				}
			}catch(il1iill){
				$.logErr(il1iill,IIIiI1II);
			}finally{
				i1iIiiil();
			}
		});
	});
}
function iliil1(){
	return new Promise(l1lII1iI=>{
		const li1li1Il={'url':$.url1,'followRedirect':false,'headers':{'Cookie':''+$.UVCookie+newCookie+' '+cookie,'User-Agent':$.UA}};
		$.get(li1li1Il,async(iiIi1Il1,li1liIii,iIIilIl1)=>{
			try{
				l1iiiI(li1liIii);
				$.url2=li1liIii&&li1liIii.headers&&(li1liIii.headers['location']||li1liIii.headers['Location']||'')||'';
				$.url2=decodeURIComponent($.url2);
				$.url2=$.url2['match'](/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/)&&$.url2['match'](/(https:\/\/prodev[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1]||'';
			}catch(l1i1l1ll){
				$.logErr(l1i1l1ll,li1liIii);
			}finally{
				l1lII1iI(iIIilIl1);
			}
		});
	});
}
function iilIIlII(){
	return new Promise(lII11IIl=>{
		const lIilI1I={'url':'https://u.jd.com/'+rebateCode+($.shareCode&&'?s='+$.shareCode||''),'followRedirect':false,'headers':{'Cookie':''+$.UVCookie+newCookie+' '+cookie,'User-Agent':$.UA}};
		$.get(lIilI1I,async(Il1IIil1,iI1liIi,iiIiIiii)=>{
			try{
				l1iiiI(iI1liIi);
				$.url1=iiIiIiii&&iiIiIiii.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)&&iiIiIiii.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1]||'';
			}catch(l1I1Ii1l){
				$.logErr(l1I1Ii1l,iI1liIi);
			}finally{
				lII11IIl(iiIiIiii);
			}
		});
	});
}
function liI11111(ll1il1i1){
	return new Promise(IIiii1I1=>{
		const iIliili={'url':'https://gia.jd.com/fcf.html?a='+ll1il1i1.a,'body':'d='+ll1il1i1.d,'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','User-Agent':$.UA}};
		$.post(iIliili,async(Ii1lIIII,l1il1l,l1iiiIlI)=>{
			try{
				if(Ii1lIIII){}else{
					if(l1iiiIlI.indexOf('*_*')>0){
						l1iiiIlI=l1iiiIlI.split('*_*',2);
						l1iiiIlI=JSON.parse(l1iiiIlI[1]);
						$.eid=l1iiiIlI.eid;
					}else{
						console.log('京东api返回数据为空，请检查自身原因');
					}
				}
			}catch(l1iIlI1){
				$.logErr(l1iIlI1,l1il1l);
			}finally{
				IIiii1I1(l1iiiIlI);
			}
		});
	});
}
function l1iiiI(IlII1iii){
	let lIIi1ll1=IlII1iii&&IlII1iii.headers&&(IlII1iii.headers['set-cookie']||IlII1iii.headers['Set-Cookie']||'')||'';
	let iI1lI1i='';
	if(lIIi1ll1){
		if(typeof lIIi1ll1!='object'){
			iI1lI1i=lIIi1ll1.split(',');
		}else iI1lI1i=lIIi1ll1;
		for(let IIiIl11I of iI1lI1i){
			let iiiiiIlI=IIiIl11I.split(';')[0]['trim']();
			if(iiiiiIlI.split('=')[1]){
				if(iiiiiIlI.split('=')[0]=='unpl'&&iiiiiIlI.split('=')[1]){
					$.unpl=iiiiiIlI.split('=')[1];
				}
				if(newCookie.indexOf(iiiiiIlI.split('=')[1])==-1)newCookie+=iiiiiIlI.replace(/ /g,'')+'; ';
			}
		}
	}
}
function iiil1iI(li1IlliI=1){
	li1IlliI=1;
	if(li1IlliI==2){
		$.UA='Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
	}else{
		let I1iIIlIl=$.CryptoJS['SHA1']($.UserName+'reds')['toString']();
		$.UA='jdapp;iPhone;10.1.4;14.3;'+I1iIIlIl+';M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
	}
}
function ilili1I1(IiIiiIIl){
	if(typeof IiIiiIIl=='string'){
		try{
			return JSON.parse(IiIiiIIl);
		}catch(lI1II1i){
			console.log(lI1II1i);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function l11illI1(llilIl1i){
	return new Promise(IiiIIi=>setTimeout(IiiIIi,llilIl1i));
}
async function I1ii11Il(){
	try{
		const{JSDOM}=jsdom;
		let iiliIiil={'url':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html?unionActId=31155&d='+rebateCode+'&cu=true&utm_source=kong&utm_medium=jingfen','referrer':'https://u.jd.com/','userAgent':'jdapp;iPhone;10.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','runScripts':'dangerously','resources':new jsdom[('ResourceLoader')]({'userAgent':'jdapp;iPhone;10.1.4;14.3;;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','referrer':'https://u.jd.com/'}),'includeNodeLocations':true,'storageQuota':10000000,'pretendToBeVisual':true,'virtualConsole':new jsdom[('VirtualConsole')]()};
		const iiliI1Il=new JSDOM('<body>\n        <script src="https://static.360buyimg.com/siteppStatic/script/mescroll/map.js"></script>\n        <script src="https://storage.360buyimg.com/webcontainer/js_security_v3.js"></script>\n        <script src="https://static.360buyimg.com/siteppStatic/script/utils.js"></script>\n        </body>',iiliIiil);
		await l11illI1(1000);
		l1ll111l=iiliI1Il.window;
	}catch(IIIIlII1){
		console.log(IIIIlII1);
	}
}
async function i11lI1i(iii11lIl,llilIil1){
	if(!$.getH5st_WQ_Arr[$.UserName])$.getH5st_WQ_Arr[$.UserName]={};
	let iI11lIi=$.getH5st_WQ_Arr[$.UserName];
	if(!l1ll111l){
		await I1ii11Il();
	}
	l1ll111l.localStorage['setItem']('WQ__dy_tk_s_'+iii11lIl,iI11lIi['WQ__dy_tk_s_'+iii11lIl]||'');
	l1ll111l.localStorage['setItem']('WQ__dy_algo_s_'+iii11lIl,iI11lIi['WQ__dy_algo_s_'+iii11lIl]||'');
	l1ll111l.localStorage['setItem']('WQ_qe_'+iii11lIl,iI11lIi['WQ_qe_'+iii11lIl]||'');
	return new Promise(async illIIi1=>{
		let lIIIilIl='';
		try{
			if(typeof l1ll111l.signWaap==='function'){
				lIIIilIl=await l1ll111l.signWaap(iii11lIl,llilIil1);
			}else{
				let IiiIl1li=0;
				timer=setInterval(async()=>{
					IiiIl1li++;
					if(typeof l1ll111l.signWaap==='function'){
						clearInterval(timer);
						timer=null;
						lIIIilIl=await l1ll111l.signWaap(iii11lIl,llilIil1);
					}
					if(IiiIl1li>=100){
						clearInterval(timer);
					}
				},100);
			}
		}catch(lii1iilI){
			console.log(lii1iilI);
		}finally{
			if(lIIIilIl){
				iI11lIi['WQ__dy_tk_s_'+iii11lIl]=l1ll111l.localStorage['getItem']('WQ__dy_tk_s_'+iii11lIl);
				iI11lIi['WQ__dy_algo_s_'+iii11lIl]=l1ll111l.localStorage['getItem']('WQ__dy_algo_s_'+iii11lIl);
				iI11lIi['WQ_qe_'+iii11lIl]=l1ll111l.localStorage['getItem']('WQ_qe_'+iii11lIl);
			}
			illIIi1(lIIIilIl);
		}
	});
}
function ilIIIl(){
	class Ili1I1il{
		constructor(){
			this.UVCookie='';
			this.ltr=0;
			this.mr=[1,0];
			this.document={'cookie':'','cookies':'__jdc=123;','domain':'prodev.m.jd.com','referrer':'https://u.jd.com/','location':{'href':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html','hrefs':'https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html'}};
			this.navigator={'userAgent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','userAgents':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'};
			this.window={};
		}
		['getUVCookie'](IlI1I1lI='',l1111Ill='',l11iillI='',ii1111lI=''){
			try{
				this.document['location']['href']=this.document['location']['hrefs']+'';
				this.document['cookie']=this.document['cookies']+'';
				if(l11iillI)this.document['location']['href']=l11iillI;
				if(ii1111lI)this.document['cookie']=ii1111lI;
				this.UVCookie='';
				this.navigator['userAgent']=this.navigator['userAgents']+'';
				this.ltr=1011+Math.round(31*Math.random());
				if(false){
					this.mr[1]++;
					if(this.mr[1]>=314){
						this.mr[1]=Math.round(31*Math.random());
					}
					if(!l1111Ill){
						l1111Ill=$.CryptoJS['SHA1']('')['toString']();
					}
					let l1i11liI=0;
					while(true){
						this.mr[0]=parseInt(l1111Ill.match(/\d/g)[l1i11liI]);
						l1i11liI++;
						if(this.mr[0]>0||l1i11liI>=l1111Ill.match(/\d/g)['length']){
							break;
						}
					}
					this.mr[0]+=Math.round((new Date()['getTime']()-new Date('2022-09-02')['getTime']())/86400000);
				}
				if(IlI1I1lI)this.navigator['userAgent']=IlI1I1lI;
				this.lr={'ckJda':'__jda','ckJdb':'__jdb','ckJdv':'__jdv','ckJdc':'__jdc','refUrl':'https://u.jd.com/'};
				this.q();
				this.s(l1111Ill);
				return this.UVCookie;
			}catch(Iiliill1){
				console.log(Iiliill1);
			}
		}
		['s'](il1Ii1il=''){
			var lIIIIII,i1lIl1I1,i11i1liI,II1li1,il1l1l=(this.getCookie(this.lr['ckJda'])||'')['split']('.'),illIli1i=(this.getCookie(this.lr['ckJdb'])||'')['split']('.'),lIli11i=(this.getCookie(this.lr['ckJdv'])||'')['split']('|'),I111iII1=this.getCookie(this.lr['ckJdc'])||'',Ilil1lii=parseInt((new Date()['getTime']()-this.ltr)/1000),iIiliiI=0,l1iIlliI=1,li1I111i='direct',IlIlIl1l='-',l1ilIII1='none',i1IIiI11='-';
			if(il1l1l.length>3)for(var lllIIll1=2;lllIIll1<5&&lllIIll1<il1l1l.length;lllIIll1++){
				var li1ii1i1=il1l1l[lllIIll1];
				li1ii1i1.length>10&&(il1l1l[lllIIll1]=li1ii1i1.substr(0,10));
			}
			il1l1l.length>5?(i11i1liI=il1l1l[0],II1li1=il1l1l[1],lIIIIII=parseInt(il1l1l[2],10),i1lIl1I1=parseInt(il1l1l[3],10),Ilil1lii=parseInt(il1l1l[4],10),l1iIlliI=parseInt(il1l1l[5],10)||l1iIlliI):(II1li1=this.genUuid(),lIIIIII=Ilil1lii,i1lIl1I1=Ilil1lii),this.lr['uuid']=II1li1,illIli1i.length>3&&(i11i1liI||(i11i1liI=illIli1i[0]),iIiliiI=parseInt(illIli1i[1],10)||0),lIli11i.length>4&&(i11i1liI||(i11i1liI=lIli11i[0]),li1I111i=lIli11i[1],IlIlIl1l=lIli11i[2],l1ilIII1=lIli11i[3],i1IIiI11=lIli11i[4]),I111iII1&&''!==I111iII1&&(i11i1liI||(i11i1liI=I111iII1));
			var Ii1IIil,ll11IiI=[],IIIlIlll=illIli1i.length<4,llI1Iii=this.getParameter('utm_source'),IIlilIi=!1;
			if(llI1Iii){
				var i1i1I1i=this.getParameter('utm_campaign'),IIliIlii=this.getParameter('utm_medium'),i1l1Ilil=this.getParameter('utm_term');
				ll11IiI.push(llI1Iii||li1I111i),ll11IiI.push(i1i1I1i||IlIlIl1l),ll11IiI.push(IIliIlii||l1ilIII1),ll11IiI.push(i1l1Ilil||i1IIiI11),i1IIiI11=ll11IiI[3],IIlilIi=!0;
			}else{
				var iiiI1lI1,IilIlili=this.lr['refUrl']&&this.lr['refUrl']['split']('/')[2],Ii1I1l11=!1;
				if(IilIlili&&IilIlili.indexOf(this.lr['ckDomain'])<0){
					for(iiiI1lI1=this.lr['seo'],lllIIll1=0;lllIIll1<iiiI1lI1.length;lllIIll1++){
						var li11IIil=iiiI1lI1[lllIIll1]['split'](':');
						if(IilIlili.indexOf(li11IIil[0]['toLowerCase']())>-1&&this.lr['refUrl']['indexOf']((li11IIil[1]+'=')['toLowerCase']())>-1){
							var Ii111ilI=this.getParameter(li11IIil[1],this.lr['refUrl']);
							/[^\x00-\xff]/['test'](Ii111ilI)&&(Ii111ilI=encodeURIComponent(Ii111ilI)),ll11IiI.push(li11IIil[0]),ll11IiI.push('-'),ll11IiI.push('organic'),ll11IiI.push(Ii111ilI||'not set'),i1IIiI11=ll11IiI[3],Ii1I1l11=!0;
							break;
						}
					}
					Ii1I1l11||(IilIlili.indexOf('zol.com.cn')>-1?(ll11IiI.push('zol.com.cn'),ll11IiI.push('-'),ll11IiI.push('cpc'),ll11IiI.push('not set')):(ll11IiI.push(IilIlili),ll11IiI.push('-'),ll11IiI.push('referral'),ll11IiI.push('-')));
				}
			}
			Ii1IIil=ll11IiI.length>0&&(ll11IiI[0]!==li1I111i||ll11IiI[1]!==IlIlIl1l||ll11IiI[2]!==l1ilIII1)&&'referral'!==ll11IiI[2],IIIlIlll||!IIIlIlll&&Ii1IIil?(li1I111i=ll11IiI[0]||li1I111i,IlIlIl1l=ll11IiI[1]||IlIlIl1l,l1ilIII1=ll11IiI[2]||l1ilIII1,i1IIiI11=ll11IiI[3]||i1IIiI11,il1l1l.length>5?(lIIIIII=parseInt(il1l1l[2],10),i1lIl1I1=parseInt(il1l1l[4],10),Ilil1lii=parseInt((new Date()['getTime']()-this.ltr)/1000),l1iIlliI++,iIiliiI=1):(l1iIlliI=1,iIiliiI=1)):iIiliiI++;
			var i1i1IIl1=this.getPageParamFromSdk();
			if(i1i1IIl1&&i1i1IIl1.vts){
				var IIl111I1=1*i1i1IIl1.vts,IiliIill=1*i1i1IIl1.seq;
				(IIl111I1>l1iIlliI||IIl111I1===l1iIlliI&&IiliIill>=iIiliiI)&&(l1iIlliI=IIl111I1,iIiliiI=IiliIill+1);
			}
			if(i11i1liI||(i11i1liI=this.genHash(this.lr['ckDomain'])),this.setCookie(this.lr['ckJda'],[i11i1liI,II1li1,lIIIIII,i1lIl1I1,Ilil1lii,l1iIlliI||1]['join']('.'),this.lr['ckDomain'],this.lr['ckJdaExp']),this.setCookie(this.lr['ckJdb'],[i11i1liI,iIiliiI,II1li1+'|'+l1iIlliI,Ilil1lii]['join']('.'),this.lr['ckDomain'],this.lr['ckJdbExp']),IIlilIi||Ii1IIil||lIli11i.length<5){
				var il111iiI=[i11i1liI,li1I111i||'direct',IlIlIl1l||'-',l1ilIII1||'none',i1IIiI11||'-',new Date()['getTime']()-this.ltr]['join']('|');
				this.setJdv(il111iiI=encodeURIComponent(il111iiI),i11i1liI);
			}
			this.setCookie(this.lr['ckJdc'],i11i1liI,this.lr['ckDomain']);
			if(false){
				this.setCookie('mba_sid',this.mr['join']('.'),this.lr['ckDomain']);
				this.setCookie('mba_muid',[II1li1,this.mr[0],new Date()['getTime']()]['join']('.'),this.lr['ckDomain']);
				var iIiliiI=0;
				var iIIillli='';
				if(il1Ii1il){
					while(true){
						iIIillli+=il1Ii1il.match(/\d/g)[iIiliiI];
						iIiliiI++;
						if(iIIillli.split('')['length']>=2||iIiliiI>=il1Ii1il.match(/\d/g)['length']){
							break;
						}
					}
				}
			}
		}
		['q'](){
			this.lr['rpDomain']=this.lr['rpDomain']||'uranus.jd.com',this.lr['logUrl']='//'+this.lr['rpDomain']+'/log/m',this.lr['logType']={'pv':'1','pf':'2','cl':'3','od':'4','pd':'5','hm':'6','magic':'000001'},this.lr['useTmpCookie']?(this.lr['ckJda']='__tra',this.lr['ckJdb']='__trb',this.lr['ckJdc']='__trc',this.lr['ckJdu']='__tru'):(this.lr['ckJda']='__jda',this.lr['ckJdb']='__jdb',this.lr['ckJdc']='__jdc',this.lr['ckJdu']='__jdu'),this.lr['ckJdv']='__jdv',this.lr['ckWxAppCk']='__jdwxapp',this.lr['ckRefCls']='__jd_ref_cls',this.lr['ckJdaExp']=15552000000,this.lr['ckJdbExp']=1800000,this.lr['ckJduExp']=15552000000,this.lr['ckJdvExp']=1296000000,this.lr['ckJdvEmbeddedExp']=86400000,this.lr['ckWxAppCkExp']=15552000000,this.lr['mtSubsiteExp']=31536000000,this.lr['ckDomain']=(this.document['domain']['match'](/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/)||[''])[0]||this.document['domain']['replace'](/.*?([^.]+\.[^.]+)$/,'$1'),this.lr['title']=this.document['title'],this.lr['refUrl']=this.document['referrer'],this.lr['seo']=['i.easou.com:q','m.baidu.com:word','m.sm.cn:q','m.so.com:q','wap.sogou.com:keyword','m.sogou.com:keyword','wap.sogo.com:keyword','m.sogo.com:keyword','page.roboo.com:q','ask.com:q','baidu:word','baidu:wd','bing:q','easou:q','google:q','roboo:word','roboo:q','sm.cn:q','so.com:q','sogou:keyword','sogou:query','sogo.com:keyword','sogo.com:query','yahoo:p','yandex:text','yicha:key'];
		}
		['setCookie'](i1IIlIi1,illli11,l1Il111,IIi111ll){
			if(i1IIlIi1){
				var I1lll1i1='';
				if(IIi111ll){
					var I1I1ii11=new Date();
					I1I1ii11.setTime(I1I1ii11.getTime()-this.ltr+IIi111ll),I1lll1i1=';expires='+I1I1ii11.toGMTString();
				}
				this.UVCookie+=i1IIlIi1+'='+illli11+'; ';
			}
		}
		['setJdv'](lIlIIIiI,IIliiI1,lI11l1II){
			var lI1l1ii1='';
			lI1l1ii1=this.isPrey(10)&&(!lIlIIIiI||lIlIIIiI.length>400)?IIliiI1+'|direct|-|none|-|'+(new Date()['getTime']()-this.ltr):lIlIIIiI;
			var ii1I1li=lI11l1II||this.isEmbedded()?this.lr['ckJdvEmbeddedExp']:this.lr['ckJdvExp'];
			this.setCookie(this.lr['ckJdv']||'__jdv',lI1l1ii1,this.lr['ckDomain'],ii1I1li);
		}
		['getCookie'](ii11iIli,Ill1lili){
			var I1IiiiIi=this.document['cookie']['match'](new RegExp('(^| )'+ii11iIli+'=([^;]*)(;|$)'));
			return null!==I1IiiiIi?Ill1lili?I1IiiiIi[2]:this.urlDecode(I1IiiiIi[2]):'';
		}
		['genUuid'](){
			return new Date()['getTime']()-this.ltr+''+parseInt(2147483647*Math.random());
		}
		['getParameter'](IiiIi11l,iill11i){
			var ili1iIiI=iill11i||this.document['location']['href'],i1liiiii=new RegExp('(?:^|&|[?]|[/])'+IiiIi11l+'=([^&]*)')['exec'](ili1iIiI);
			return i1liiiii?this.urlDecode(i1liiiii[1]):null;
		}
		['urlDecode'](i11II1I){
			try{
				return decodeURIComponent(i11II1I);
			}catch(ilI1I1i){
				return i11II1I;
			}
		}
		['genHash'](iiI1l1l){
			var IlI11il1,il1I1lli=1,IllII1li=0;
			if(iiI1l1l)for(il1I1lli=0,IlI11il1=iiI1l1l.length-1;IlI11il1>=0;IlI11il1--){
				il1I1lli=0!==(IllII1li=0xfe00000&(il1I1lli=(il1I1lli<<0x6&0xfffffff)+(IllII1li=iiI1l1l.charCodeAt(IlI11il1))+(IllII1li<<0xe)))?il1I1lli^IllII1li>>0x15:il1I1lli;
			}
			return il1I1lli;
		}
		['isPrey'](I1li1IIi){
			if(I1li1IIi>=100)return!0;
			var illill=this.lr['uuid'],IIIilIl=illill.substr(illill.length-2);
			return!!IIIilIl&&1*IIIilIl<I1li1IIi;
		}
		['isEmbedded'](){
			var ll1iiI1I=this.navigator['userAgent']||'';
			return/^(jdapp|jdltapp|jdpingou);/['test'](ll1iiI1I)||this.isJdLog();
		}
		['isJdLog'](){
			return (this.navigator['userAgent']||'')['indexOf'](';jdlog;')>-1;
		}
		['getPageParamFromSdk'](){
			var l11lIiI,Ii1IiIl;
			try{
				this.window['JDMAUnifyBridge']&&this.window['JDMAUnifyBridge']['JDMAGetMPageParam']?Ii1IiIl=JDMAUnifyBridge.JDMAGetMPageParam():this.window['JDMAGetMPageParam']?Ii1IiIl=JDMAGetMPageParam():this.window['webkit']&&this.window['webkit']['messageHandlers']&&this.window['webkit']['messageHandlers']['JDMASetMPageParam']&&(Ii1IiIl=this.window['prompt']('JDMAGetMPageParam','')),Ii1IiIl&&(l11lIiI=JSON.parse(Ii1IiIl));
			}catch(i1ili1iI){}
			return l11lIiI;
		}
		['time'](lillllli,li1I1li1=null){
			const lillII1I=li1I1li1?new Date(li1I1li1):new Date();
			let ilIii11i={'M+':lillII1I.getMonth()+1,'d+':lillII1I.getDate(),'H+':lillII1I.getHours(),'m+':lillII1I.getMinutes(),'s+':lillII1I.getSeconds(),'q+':Math.floor((lillII1I.getMonth()+3)/3),'S':lillII1I.getMilliseconds()};
			/(y+)/['test'](lillllli)&&(lillllli=lillllli.replace(RegExp.$1,(lillII1I.getFullYear()+'')['substr'](4-RegExp.$1['length'])));
			for(let li1I1li1 in ilIii11i)new RegExp('('+li1I1li1+')')['test'](lillllli)&&(lillllli=lillllli.replace(RegExp.$1,1==RegExp.$1['length']?ilIii11i[li1I1li1]:('00'+ilIii11i[li1I1li1])['substr']((''+ilIii11i[li1I1li1])['length'])));
			return lillllli;
		}
	}
	IIliiI1i=new Ili1I1il();
};
function randomString(e){
	e=e||32;
	let t="abcdef0123456789",a=t.length,n="";
	for(i=0;i<e;i++)n+=t.charAt(Math.floor(Math.random()*a));
	return n
}
const navigator={userAgent:`jdapp;iPhone;10.1.4;14.3;${$.CryptoJS.SHA1(randomString(40)).toString()};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,plugins:{length:0},language:"zh-CN",};
const screen={availHeight:812,availWidth:375,colorDepth:24,height:812,width:375,pixelDepth:24,};
const window={};
const document={location:{ancestorOrigins:{},href:"https://prodev.m.jd.com/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",origin:"https://prodev.m.jd.com",protocol:"https:",host:"prodev.m.jd.com",hostname:"prodev.m.jd.com",port:"",pathname:"/mall/active/CZVwK75uo38y7YdC2v8dJ6TH9SS/index.html",search:"",hash:"",},};
var start_time=new Date().getTime(),_jdfp_canvas_md5="",_jdfp_webgl_md5="",_fingerprint_step=1,_JdEid="",_eidFlag=!1,risk_jd_local_fingerprint="",_jd_e_joint_;
function generateUuid(){
	var t=Math
for(var g="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""),m=0,a=g.length;m<a;m++)switch(g[m]){
		case "x":
			g[m]=t.floor(16*t.random()).toString(16);
			break;
		case "y":
			g[m]=(t.floor(4*t.random())+8).toString(16);
	}return g.join("");
}
function t(a){
	if(null==a||void 0==a||""==a)return "NA";
	if(null==a||void 0==a||""==a)var b="";else{
		b=[];
		for(var c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<c%32;
	}
	a=8*a.length;
	b[a>>5]|=128<<a%32;
	b[(((a+64)>>>9)<<4)+14]=a;
	a=1732584193;
	c=-271733879;
	for(var l=-1732584194,h=271733878,q=0;q<b.length;q+=16){
		var z=a,C=c,D=l,B=h;
		a=v(a,c,l,h,b[q+0],7,-680876936);
		h=v(h,a,c,l,b[q+1],12,-389564586);
		l=v(l,h,a,c,b[q+2],17,606105819);
		c=v(c,l,h,a,b[q+3],22,-1044525330);
		a=v(a,c,l,h,b[q+4],7,-176418897);
		h=v(h,a,c,l,b[q+5],12,1200080426);
		l=v(l,h,a,c,b[q+6],17,-1473231341);
		c=v(c,l,h,a,b[q+7],22,-45705983);
		a=v(a,c,l,h,b[q+8],7,1770035416);
		h=v(h,a,c,l,b[q+9],12,-1958414417);
		l=v(l,h,a,c,b[q+10],17,-42063);
		c=v(c,l,h,a,b[q+11],22,-1990404162);
		a=v(a,c,l,h,b[q+12],7,1804603682);
		h=v(h,a,c,l,b[q+13],12,-40341101);
		l=v(l,h,a,c,b[q+14],17,-1502002290);
		c=v(c,l,h,a,b[q+15],22,1236535329);
		a=x(a,c,l,h,b[q+1],5,-165796510);
		h=x(h,a,c,l,b[q+6],9,-1069501632);
		l=x(l,h,a,c,b[q+11],14,643717713);
		c=x(c,l,h,a,b[q+0],20,-373897302);
		a=x(a,c,l,h,b[q+5],5,-701558691);
		h=x(h,a,c,l,b[q+10],9,38016083);
		l=x(l,h,a,c,b[q+15],14,-660478335);
		c=x(c,l,h,a,b[q+4],20,-405537848);
		a=x(a,c,l,h,b[q+9],5,568446438);
		h=x(h,a,c,l,b[q+14],9,-1019803690);
		l=x(l,h,a,c,b[q+3],14,-187363961);
		c=x(c,l,h,a,b[q+8],20,1163531501);
		a=x(a,c,l,h,b[q+13],5,-1444681467);
		h=x(h,a,c,l,b[q+2],9,-51403784);
		l=x(l,h,a,c,b[q+7],14,1735328473);
		c=x(c,l,h,a,b[q+12],20,-1926607734);
		a=u(c^l^h,a,c,b[q+5],4,-378558);
		h=u(a^c^l,h,a,b[q+8],11,-2022574463);
		l=u(h^a^c,l,h,b[q+11],16,1839030562);
		c=u(l^h^a,c,l,b[q+14],23,-35309556);
		a=u(c^l^h,a,c,b[q+1],4,-1530992060);
		h=u(a^c^l,h,a,b[q+4],11,1272893353);
		l=u(h^a^c,l,h,b[q+7],16,-155497632);
		c=u(l^h^a,c,l,b[q+10],23,-1094730640);
		a=u(c^l^h,a,c,b[q+13],4,681279174);
		h=u(a^c^l,h,a,b[q+0],11,-358537222);
		l=u(h^a^c,l,h,b[q+3],16,-722521979);
		c=u(l^h^a,c,l,b[q+6],23,76029189);
		a=u(c^l^h,a,c,b[q+9],4,-640364487);
		h=u(a^c^l,h,a,b[q+12],11,-421815835);
		l=u(h^a^c,l,h,b[q+15],16,530742520);
		c=u(l^h^a,c,l,b[q+2],23,-995338651);
		a=w(a,c,l,h,b[q+0],6,-198630844);
		h=w(h,a,c,l,b[q+7],10,1126891415);
		l=w(l,h,a,c,b[q+14],15,-1416354905);
		c=w(c,l,h,a,b[q+5],21,-57434055);
		a=w(a,c,l,h,b[q+12],6,1700485571);
		h=w(h,a,c,l,b[q+3],10,-1894986606);
		l=w(l,h,a,c,b[q+10],15,-1051523);
		c=w(c,l,h,a,b[q+1],21,-2054922799);
		a=w(a,c,l,h,b[q+8],6,1873313359);
		h=w(h,a,c,l,b[q+15],10,-30611744);
		l=w(l,h,a,c,b[q+6],15,-1560198380);
		c=w(c,l,h,a,b[q+13],21,1309151649);
		a=w(a,c,l,h,b[q+4],6,-145523070);
		h=w(h,a,c,l,b[q+11],10,-1120210379);
		l=w(l,h,a,c,b[q+2],15,718787259);
		c=w(c,l,h,a,b[q+9],21,-343485551);
		a=A(a,z);
		c=A(c,C);
		l=A(l,D);
		h=A(h,B);
	}
	b=[a,c,l,h];
	a="";
	for(c=0;c<4*b.length;c++)a+="0123456789abcdef".charAt((b[c>>2]>>((c%4)*8+4))&15)+"0123456789abcdef".charAt((b[c>>2]>>((c%4)*8))&15);
	return a;
}
function u(a,b,c,l,h,q){
	a=A(A(b,a),A(l,q));
	return A((a<<h)|(a>>>(32-h)),c);
}
function v(a,b,c,l,h,q,z){
	return u((b&c)|(~b&l),a,b,h,q,z);
}
function x(a,b,c,l,h,q,z){
	return u((b&l)|(c&~l),a,b,h,q,z);
}
function w(a,b,c,l,h,q,z){
	return u(c^(b|~l),a,b,h,q,z);
}
function A(a,b){
	var c=(a&65535)+(b&65535);
	return(((a>>16)+(b>>16)+(c>>16))<<16)|(c&65535);
}
_fingerprint_step=2;
var y="",n=navigator.userAgent.toLowerCase();
n.indexOf("jdapp")&&(n=n.substring(0,90));
var e=navigator.language,f=n;
-1!=f.indexOf("ipad")||-1!=f.indexOf("iphone os")||-1!=f.indexOf("midp")||-1!=f.indexOf("rv:1.2.3.4")||-1!=f.indexOf("ucweb")||-1!=f.indexOf("android")||-1!=f.indexOf("windows ce")||f.indexOf("windows mobile");
var r="NA",k="NA";
try{
	-1!=f.indexOf("win")&&-1!=f.indexOf("95")&&((r="windows"),(k="95")),-1!=f.indexOf("win")&&-1!=f.indexOf("98")&&((r="windows"),(k="98")),-1!=f.indexOf("win 9x")&&-1!=f.indexOf("4.90")&&((r="windows"),(k="me")),-1!=f.indexOf("win")&&-1!=f.indexOf("nt 5.0")&&((r="windows"),(k="2000")),-1!=f.indexOf("win")&&-1!=f.indexOf("nt")&&((r="windows"),(k="NT")),-1!=f.indexOf("win")&&-1!=f.indexOf("nt 5.1")&&((r="windows"),(k="xp")),-1!=f.indexOf("win")&&-1!=f.indexOf("32")&&((r="windows"),(k="32")),-1!=f.indexOf("win")&&-1!=f.indexOf("nt 5.1")&&((r="windows"),(k="7")),-1!=f.indexOf("win")&&-1!=f.indexOf("6.0")&&((r="windows"),(k="8")),-1==f.indexOf("win")||(-1==f.indexOf("nt 6.0")&&-1==f.indexOf("nt 6.1"))||((r="windows"),(k="9")),-1!=f.indexOf("win")&&-1!=f.indexOf("nt 6.2")&&((r="windows"),(k="10")),-1!=f.indexOf("linux")&&(r="linux"),-1!=f.indexOf("unix")&&(r="unix"),-1!=f.indexOf("sun")&&-1!=f.indexOf("os")&&(r="sun os"),-1!=f.indexOf("ibm")&&-1!=f.indexOf("os")&&(r="ibm os/2"),-1!=f.indexOf("mac")&&-1!=f.indexOf("pc")&&(r="mac"),-1!=f.indexOf("aix")&&(r="aix"),-1!=f.indexOf("powerpc")&&(r="powerPC"),-1!=f.indexOf("hpux")&&(r="hpux"),-1!=f.indexOf("netbsd")&&(r="NetBSD"),-1!=f.indexOf("bsd")&&(r="BSD"),-1!=f.indexOf("osf1")&&(r="OSF1"),-1!=f.indexOf("irix")&&((r="IRIX"),(k="")),-1!=f.indexOf("freebsd")&&(r="FreeBSD"),-1!=f.indexOf("symbianos")&&((r="SymbianOS"),(k=f.substring(f.indexOf("SymbianOS/")+10,3)));
}catch(a){}
_fingerprint_step=3;
var g="NA",m="NA";
try{
	-1!=f.indexOf("msie")&&((g="ie"),(m=f.substring(f.indexOf("msie ")+5)),m.indexOf(";")&&(m=m.substring(0,m.indexOf(";"))));
	-1!=f.indexOf("firefox")&&((g="Firefox"),(m=f.substring(f.indexOf("firefox/")+8)));
	-1!=f.indexOf("opera")&&((g="Opera"),(m=f.substring(f.indexOf("opera/")+6,4)));
	-1!=f.indexOf("safari")&&((g="safari"),(m=f.substring(f.indexOf("safari/")+7)));
	-1!=f.indexOf("chrome")&&((g="chrome"),(m=f.substring(f.indexOf("chrome/")+7)),m.indexOf(" ")&&(m=m.substring(0,m.indexOf(" "))));
	-1!=f.indexOf("navigator")&&((g="navigator"),(m=f.substring(f.indexOf("navigator/")+10)));
	-1!=f.indexOf("applewebkit")&&((g="applewebkit_chrome"),(m=f.substring(f.indexOf("applewebkit/")+12)),m.indexOf(" ")&&(m=m.substring(0,m.indexOf(" "))));
	-1!=f.indexOf("sogoumobilebrowser")&&(g="\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
	if(-1!=f.indexOf("ucbrowser")||-1!=f.indexOf("ucweb"))g="UC\u6d4f\u89c8\u5668";
	if(-1!=f.indexOf("qqbrowser")||-1!=f.indexOf("tencenttraveler"))g="QQ\u6d4f\u89c8\u5668";
	-1!=f.indexOf("metasr")&&(g="\u641c\u72d7\u6d4f\u89c8\u5668");
	-1!=f.indexOf("360se")&&(g="360\u6d4f\u89c8\u5668");
	-1!=f.indexOf("the world")&&(g="\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668");
	-1!=f.indexOf("maxthon")&&(g="\u9068\u6e38\u6d4f\u89c8\u5668");
}catch(a){}
class JdJrTdRiskFinger{
	f={options:function(){
		return{};
	},nativeForEach:Array.prototype.forEach,nativeMap:Array.prototype.map,extend:function(a,b){
		if(null==a)return b;
		for(var c in a)null!=a[c]&&b[c]!==a[c]&&(b[c]=a[c]);
		return b;
	},getData:function(){
		return y;
	},get:function(a){
		var b=1*m,c=[];
		"ie"==g&&7<=b?(c.push(n),c.push(e),(y=y+",'userAgent':'"+t(n)+"','language':'"+e+"'"),this.browserRedirect(n)):((c=this.userAgentKey(c)),(c=this.languageKey(c)));
		c.push(g);
		c.push(m);
		c.push(r);
		c.push(k);
		y=y+",'os':'"+r+"','osVersion':'"+k+"','browser':'"+g+"','browserVersion':'"+m+"'";
		c=this.colorDepthKey(c);
		c=this.screenResolutionKey(c);
		c=this.timezoneOffsetKey(c);
		c=this.sessionStorageKey(c);
		c=this.localStorageKey(c);
		c=this.indexedDbKey(c);
		c=this.addBehaviorKey(c);
		c=this.openDatabaseKey(c);
		c=this.cpuClassKey(c);
		c=this.platformKey(c);
		c=this.hardwareConcurrencyKey(c);
		c=this.doNotTrackKey(c);
		c=this.pluginsKey(c);
		c=this.canvasKey(c);
		c=this.webglKey(c);
		b=this.x64hash128(c.join("~~~"),31);
		return a(b);
	},userAgentKey:function(a){
		a.push(navigator.userAgent),(y=y+",'userAgent':'"+t(navigator.userAgent)+"'"),this.browserRedirect(navigator.userAgent);
		return a;
	},replaceAll:function(a,b,c){
		for(;0<=a.indexOf(b);)a=a.replace(b,c);
		return a;
	},browserRedirect:function(a){
		var b=a.toLowerCase();
		a="ipad"==b.match(/ipad/i);
		var c="iphone os"==b.match(/iphone os/i),l="midp"==b.match(/midp/i),h="rv:1.2.3.4"==b.match(/rv:1.2.3.4/i),q="ucweb"==b.match(/ucweb/i),z="android"==b.match(/android/i),C="windows ce"==b.match(/windows ce/i);
		b="windows mobile"==b.match(/windows mobile/i);
		y=a||c||l||h||q||z||C||b?y+",'origin':'mobile'":y+",'origin':'pc'";
	},languageKey:function(a){
		""||(a.push(navigator.language),(y=y+",'language':'"+this.replaceAll(navigator.language," ","_")+"'"));
		return a;
	},colorDepthKey:function(a){
		""||(a.push(screen.colorDepth),(y=y+",'colorDepth':'"+screen.colorDepth+"'"));
		return a;
	},screenResolutionKey:function(a){
		if(!this.options.excludeScreenResolution){
			var b=this.getScreenResolution();
			"undefined"!==typeof b&&(a.push(b.join("x")),(y=y+",'screenResolution':'"+b.join("x")+"'"));
		}
		return a;
	},getScreenResolution:function(){
		return this.options.detectScreenOrientation?screen.height>screen.width?[screen.height,screen.width]:[screen.width,screen.height]:[screen.height,screen.width];
	},timezoneOffsetKey:function(a){
		this.options.excludeTimezoneOffset||(a.push(new Date().getTimezoneOffset()),(y=y+",'timezoneOffset':'"+new Date().getTimezoneOffset()/60+"'"));
		return a;
	},sessionStorageKey:function(a){
		!this.options.excludeSessionStorage&&this.hasSessionStorage()&&(a.push("sessionStorageKey"),(y+=",'sessionStorage':true"));
		return a;
	},localStorageKey:function(a){
		!this.options.excludeSessionStorage&&this.hasLocalStorage()&&(a.push("localStorageKey"),(y+=",'localStorage':true"));
		return a;
	},indexedDbKey:function(a){
		!this.options.excludeIndexedDB&&this.hasIndexedDB()&&(a.push("indexedDbKey"),(y+=",'indexedDb':true"));
		return a;
	},addBehaviorKey:function(a){
		document.body&&!this.options.excludeAddBehavior&&document.body.addBehavior?(a.push("addBehaviorKey"),(y+=",'addBehavior':true")):(y+=",'addBehavior':false");
		return a;
	},openDatabaseKey:function(a){
		!this.options.excludeOpenDatabase&&window.openDatabase?(a.push("openDatabase"),(y+=",'openDatabase':true")):(y+=",'openDatabase':false");
		return a;
	},cpuClassKey:function(a){
		this.options.excludeCpuClass||(a.push(this.getNavigatorCpuClass()),(y=y+",'cpu':'"+this.getNavigatorCpuClass()+"'"));
		return a;
	},platformKey:function(a){
		this.options.excludePlatform||(a.push(this.getNavigatorPlatform()),(y=y+",'platform':'"+this.getNavigatorPlatform()+"'"));
		return a;
	},hardwareConcurrencyKey:function(a){
		var b=this.getHardwareConcurrency();
		a.push(b);
		y=y+",'ccn':'"+b+"'";
		return a;
	},doNotTrackKey:function(a){
		this.options.excludeDoNotTrack||(a.push(this.getDoNotTrack()),(y=y+",'track':'"+this.getDoNotTrack()+"'"));
		return a;
	},canvasKey:function(a){
		if(!this.options.excludeCanvas&&this.isCanvasSupported()){
			var b=this.getCanvasFp();
			a.push(b);
			_jdfp_canvas_md5=t(b);
			y=y+",'canvas':'"+_jdfp_canvas_md5+"'";
		}
		return a;
	},webglKey:function(a){
		if(!this.options.excludeWebGL&&this.isCanvasSupported()){
			var b=this.getWebglFp();
			_jdfp_webgl_md5=t(b);
			a.push(b);
			y=y+",'webglFp':'"+_jdfp_webgl_md5+"'";
		}
		return a;
	},pluginsKey:function(a){
		this.isIE()?(a.push(this.getIEPluginsString()),(y=y+",'plugins':'"+t(this.getIEPluginsString())+"'")):(a.push(this.getRegularPluginsString()),(y=y+",'plugins':'"+t(this.getRegularPluginsString())+"'"));
		return a;
	},getRegularPluginsString:function(){
		return this.map(navigator.plugins,function(a){
			var b=this.map(a,function(c){
				return[c.type,c.suffixes].join("~");
			}).join(",");
			return[a.name,a.description,b].join("::");
		},this).join(";");
	},getIEPluginsString:function(){
		return window.ActiveXObject?this.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"),function(a){
			try{
				return new ActiveXObject(a),a;
			}catch(b){
				return null;
			}
		}).join(";"):"";
	},hasSessionStorage:function(){
		try{
			return!!window.sessionStorage;
		}catch(a){
			return!0;
		}
	},hasLocalStorage:function(){
		try{
			return!!window.localStorage;
		}catch(a){
			return!0;
		}
	},hasIndexedDB:function(){
		return true;
		return!!window.indexedDB;
	},getNavigatorCpuClass:function(){
		return navigator.cpuClass?navigator.cpuClass:"NA";
	},getNavigatorPlatform:function(){
		return navigator.platform?navigator.platform:"NA";
	},getHardwareConcurrency:function(){
		return navigator.hardwareConcurrency?navigator.hardwareConcurrency:"NA";
	},getDoNotTrack:function(){
		return navigator.doNotTrack?navigator.doNotTrack:"NA";
	},getCanvasFp:function(){
		return "";
		var a=navigator.userAgent.toLowerCase();
		if((0<a.indexOf("jdjr-app")||0<=a.indexOf("jdapp"))&&(0<a.indexOf("iphone")||0<a.indexOf("ipad")))return null;
		a=document.createElement("canvas");
		var b=a.getContext("2d");
		b.fillStyle="red";
		b.fillRect(30,10,200,100);
		b.strokeStyle="#1a3bc1";
		b.lineWidth=6;
		b.lineCap="round";
		b.arc(50,50,20,0,Math.PI,!1);
		b.stroke();
		b.fillStyle="#42e1a2";
		b.font="15.4px 'Arial'";
		b.textBaseline="alphabetic";
		b.fillText("PR flacks quiz gym: TV DJ box when? \u2620",15,60);
		b.shadowOffsetX=1;
		b.shadowOffsetY=2;
		b.shadowColor="white";
		b.fillStyle="rgba(0, 0, 200, 0.5)";
		b.font="60px 'Not a real font'";
		b.fillText("No\u9a97",40,80);
		return a.toDataURL();
	},getWebglFp:function(){
		var a=navigator.userAgent;
		a=a.toLowerCase();
		if((0<a.indexOf("jdjr-app")||0<=a.indexOf("jdapp"))&&(0<a.indexOf("iphone")||0<a.indexOf("ipad")))return null;
		a=function(D){
			b.clearColor(0,0,0,1);
			b.enable(b.DEPTH_TEST);
			b.depthFunc(b.LEQUAL);
			b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT);
			return "["+D[0]+", "+D[1]+"]";
		};
		var b=this.getWebglCanvas();
		if(!b)return null;
		var c=[],l=b.createBuffer();
		b.bindBuffer(b.ARRAY_BUFFER,l);
		var h=new Float32Array([-0.2,-0.9,0,0.4,-0.26,0,0,0.732134444,0,]);
		b.bufferData(b.ARRAY_BUFFER,h,b.STATIC_DRAW);
		l.itemSize=3;
		l.numItems=3;
		h=b.createProgram();
		var q=b.createShader(b.VERTEX_SHADER);
		b.shaderSource(q,"attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
		b.compileShader(q);
		var z=b.createShader(b.FRAGMENT_SHADER);
		b.shaderSource(z,"precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
		b.compileShader(z);
		b.attachShader(h,q);
		b.attachShader(h,z);
		b.linkProgram(h);
		b.useProgram(h);
		h.vertexPosAttrib=b.getAttribLocation(h,"attrVertex");
		h.offsetUniform=b.getUniformLocation(h,"uniformOffset");
		b.enableVertexAttribArray(h.vertexPosArray);
		b.vertexAttribPointer(h.vertexPosAttrib,l.itemSize,b.FLOAT,!1,0,0);
		b.uniform2f(h.offsetUniform,1,1);
		b.drawArrays(b.TRIANGLE_STRIP,0,l.numItems);
		null!=b.canvas&&c.push(b.canvas.toDataURL());
		c.push("extensions:"+b.getSupportedExtensions().join(";"));
		c.push("extensions:"+b.getSupportedExtensions().join(";"));
		c.push("w1"+a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
		c.push("w2"+a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
		c.push("w3"+b.getParameter(b.ALPHA_BITS));
		c.push("w4"+(b.getContextAttributes().antialias?"yes":"no"));
		c.push("w5"+b.getParameter(b.BLUE_BITS));
		c.push("w6"+b.getParameter(b.DEPTH_BITS));
		c.push("w7"+b.getParameter(b.GREEN_BITS));
		c.push("w8"+(function(D){
			var B,F=D.getExtension("EXT_texture_filter_anisotropic")||D.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||D.getExtension("MOZ_EXT_texture_filter_anisotropic");
			return F?((B=D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),0===B&&(B=2),B):null;
		})(b));
		c.push("w9"+b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
		c.push("w10"+b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
		c.push("w11"+b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
		c.push("w12"+b.getParameter(b.MAX_RENDERBUFFER_SIZE));
		c.push("w13"+b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
		c.push("w14"+b.getParameter(b.MAX_TEXTURE_SIZE));
		c.push("w15"+b.getParameter(b.MAX_VARYING_VECTORS));
		c.push("w16"+b.getParameter(b.MAX_VERTEX_ATTRIBS));
		c.push("w17"+b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
		c.push("w18"+b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
		c.push("w19"+a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
		c.push("w20"+b.getParameter(b.RED_BITS));
		c.push("w21"+b.getParameter(b.RENDERER));
		c.push("w22"+b.getParameter(b.SHADING_LANGUAGE_VERSION));
		c.push("w23"+b.getParameter(b.STENCIL_BITS));
		c.push("w24"+b.getParameter(b.VENDOR));
		c.push("w25"+b.getParameter(b.VERSION));
		try{
			var C=b.getExtension("WEBGL_debug_renderer_info");
			C&&(c.push("wuv:"+b.getParameter(C.UNMASKED_VENDOR_WEBGL)),c.push("wur:"+b.getParameter(C.UNMASKED_RENDERER_WEBGL)));
		}catch(D){}
		return c.join("\u00a7");
	},isCanvasSupported:function(){
		return true;
		var a=document.createElement("canvas");
		return!(!a.getContext||!a.getContext("2d"));
	},isIE:function(){
		return "Microsoft Internet Explorer"===navigator.appName||("Netscape"===navigator.appName&&/Trident/.test(navigator.userAgent))?!0:!1;
	},getWebglCanvas:function(){
		return null;
		var a=document.createElement("canvas"),b=null;
		try{
			var c=navigator.userAgent;
			c=c.toLowerCase();
			((0<c.indexOf("jdjr-app")||0<=c.indexOf("jdapp"))&&(0<c.indexOf("iphone")||0<c.indexOf("ipad")))||(b=a.getContext("webgl")||a.getContext("experimental-webgl"));
		}catch(l){}
		b||(b=null);
		return b;
	},each:function(a,b,c){
		if(null!==a)if(this.nativeForEach&&a.forEach===this.nativeForEach)a.forEach(b,c);else if(a.length===+a.length)for(var l=0,h=a.length;l<h&&b.call(c,a[l],l,a)!=={};l++);
		else
for(l in a)if(a.hasOwnProperty(l)&&b.call(c,a[l],l,a)==={})break;
	},map:function(a,b,c){
		var l=[];
		if(null==a)return l;
		if(this.nativeMap&&a.map===this.nativeMap)return a.map(b,c);
		this.each(a,function(h,q,z){
			l[l.length]=b.call(c,h,q,z);
		});
		return l;
	},x64Add:function(a,b){
		a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];
		b=[b[0]>>>16,b[0]&65535,b[1]>>>16,b[1]&65535];
		var c=[0,0,0,0];
		c[3]+=a[3]+b[3];
		c[2]+=c[3]>>>16;
		c[3]&=65535;
		c[2]+=a[2]+b[2];
		c[1]+=c[2]>>>16;
		c[2]&=65535;
		c[1]+=a[1]+b[1];
		c[0]+=c[1]>>>16;
		c[1]&=65535;
		c[0]+=a[0]+b[0];
		c[0]&=65535;
		return[(c[0]<<16)|c[1],(c[2]<<16)|c[3]];
	},x64Multiply:function(a,b){
		a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];
		b=[b[0]>>>16,b[0]&65535,b[1]>>>16,b[1]&65535];
		var c=[0,0,0,0];
		c[3]+=a[3]*b[3];
		c[2]+=c[3]>>>16;
		c[3]&=65535;
		c[2]+=a[2]*b[3];
		c[1]+=c[2]>>>16;
		c[2]&=65535;
		c[2]+=a[3]*b[2];
		c[1]+=c[2]>>>16;
		c[2]&=65535;
		c[1]+=a[1]*b[3];
		c[0]+=c[1]>>>16;
		c[1]&=65535;
		c[1]+=a[2]*b[2];
		c[0]+=c[1]>>>16;
		c[1]&=65535;
		c[1]+=a[3]*b[1];
		c[0]+=c[1]>>>16;
		c[1]&=65535;
		c[0]+=a[0]*b[3]+a[1]*b[2]+a[2]*b[1]+a[3]*b[0];
		c[0]&=65535;
		return[(c[0]<<16)|c[1],(c[2]<<16)|c[3]];
	},x64Rotl:function(a,b){
		b%=64;
		if(32===b)return[a[1],a[0]];
		if(32>b)return[(a[0]<<b)|(a[1]>>>(32-b)),(a[1]<<b)|(a[0]>>>(32-b)),];
		b-=32;
		return[(a[1]<<b)|(a[0]>>>(32-b)),(a[0]<<b)|(a[1]>>>(32-b)),];
	},x64LeftShift:function(a,b){
		b%=64;
		return 0===b?a:32>b?[(a[0]<<b)|(a[1]>>>(32-b)),a[1]<<b]:[a[1]<<(b-32),0];
	},x64Xor:function(a,b){
		return[a[0]^b[0],a[1]^b[1]];
	},x64Fmix:function(a){
		a=this.x64Xor(a,[0,a[0]>>>1]);
		a=this.x64Multiply(a,[4283543511,3981806797]);
		a=this.x64Xor(a,[0,a[0]>>>1]);
		a=this.x64Multiply(a,[3301882366,444984403]);
		return(a=this.x64Xor(a,[0,a[0]>>>1]));
	},x64hash128:function(a,b){
		a=a||"";
		b=b||0;
		var c=a.length%16,l=a.length-c,h=[0,b];
		b=[0,b];
		for(var q,z,C=[2277735313,289559509],D=[1291169091,658871167],B=0;B<l;B+=16)(q=[(a.charCodeAt(B+4)&255)|((a.charCodeAt(B+5)&255)<<8)|((a.charCodeAt(B+6)&255)<<16)|((a.charCodeAt(B+7)&255)<<24),(a.charCodeAt(B)&255)|((a.charCodeAt(B+1)&255)<<8)|((a.charCodeAt(B+2)&255)<<16)|((a.charCodeAt(B+3)&255)<<24),]),(z=[(a.charCodeAt(B+12)&255)|((a.charCodeAt(B+13)&255)<<8)|((a.charCodeAt(B+14)&255)<<16)|((a.charCodeAt(B+15)&255)<<24),(a.charCodeAt(B+8)&255)|((a.charCodeAt(B+9)&255)<<8)|((a.charCodeAt(B+10)&255)<<16)|((a.charCodeAt(B+11)&255)<<24),]),(q=this.x64Multiply(q,C)),(q=this.x64Rotl(q,31)),(q=this.x64Multiply(q,D)),(h=this.x64Xor(h,q)),(h=this.x64Rotl(h,27)),(h=this.x64Add(h,b)),(h=this.x64Add(this.x64Multiply(h,[0,5]),[0,1390208809])),(z=this.x64Multiply(z,D)),(z=this.x64Rotl(z,33)),(z=this.x64Multiply(z,C)),(b=this.x64Xor(b,z)),(b=this.x64Rotl(b,31)),(b=this.x64Add(b,h)),(b=this.x64Add(this.x64Multiply(b,[0,5]),[0,944331445]));
		q=[0,0];
		z=[0,0];
		switch(c){
			case 15:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+14)],48));
			case 14:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+13)],40));
			case 13:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+12)],32));
			case 12:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+11)],24));
			case 11:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+10)],16));
			case 10:
				z=this.x64Xor(z,this.x64LeftShift([0,a.charCodeAt(B+9)],8));
			case 9:
				(z=this.x64Xor(z,[0,a.charCodeAt(B+8)])),(z=this.x64Multiply(z,D)),(z=this.x64Rotl(z,33)),(z=this.x64Multiply(z,C)),(b=this.x64Xor(b,z));
			case 8:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+7)],56));
			case 7:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+6)],48));
			case 6:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+5)],40));
			case 5:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+4)],32));
			case 4:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+3)],24));
			case 3:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+2)],16));
			case 2:
				q=this.x64Xor(q,this.x64LeftShift([0,a.charCodeAt(B+1)],8));
			case 1:
				(q=this.x64Xor(q,[0,a.charCodeAt(B)])),(q=this.x64Multiply(q,C)),(q=this.x64Rotl(q,31)),(q=this.x64Multiply(q,D)),(h=this.x64Xor(h,q));
		}
		h=this.x64Xor(h,[0,a.length]);
		b=this.x64Xor(b,[0,a.length]);
		h=this.x64Add(h,b);
		b=this.x64Add(b,h);
		h=this.x64Fmix(h);
		b=this.x64Fmix(b);
		h=this.x64Add(h,b);
		b=this.x64Add(b,h);
		return(("00000000"+(h[0]>>>0).toString(16)).slice(-8)+("00000000"+(h[1]>>>0).toString(16)).slice(-8)+("00000000"+(b[0]>>>0).toString(16)).slice(-8)+("00000000"+(b[1]>>>0).toString(16)).slice(-8));
	},};
}
class JDDMAC{
	static t(){
		return "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(" ").map(function(v){
			return parseInt(v,16);
		});
	}mac(v){
		for(var x=-1,w=0,A=v.length;w<A;w++)x=(x>>>8)^t[(x^v.charCodeAt(w))&255];
		return(x^-1)>>>0;
	}
}
var _CurrentPageProtocol="https:"==document.location.protocol?"https://":"http://",_JdJrTdRiskDomainName=window.__fp_domain||"gia.jd.com",_url_query_str="",_root_domain="",_CurrentPageUrl=(function(){
	var t=document.location.href.toString();
	try{
		_root_domain=/^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(t)[1];
	}catch(v){}
	var u=t.indexOf("?");
	0<u&&((_url_query_str=t.substring(u+1)),500<_url_query_str.length&&(_url_query_str=_url_query_str.substring(0,499)),(t=t.substring(0,u)));
	return(t=t.substring(_CurrentPageProtocol.length));
})(),jd_shadow__=(function(){
	try{
		var t=$.CryptoJS,u=[];
		u.push(_CurrentPageUrl);
		var v=generateUuid();
		u.push(v);
		var x=new Date().getTime();
		u.push(x);
		var w=t.SHA1(u.join("")).toString().toUpperCase();
		u=[];
		u.push("JD3");
		u.push(w);
		var A=new JDDMAC().mac(u.join(""));
		u.push(A);
		var y=t.enc.Hex.parse("30313233343536373839616263646566"),n=t.enc.Hex.parse("4c5751554935255042304e6458323365"),e=u.join("");
		return t.AES.encrypt(t.enc.Utf8.parse(e),n,{mode:t.mode.CBC,padding:t.pad.Pkcs7,iv:y,}).ciphertext.toString(t.enc.Base32);
	}catch(f){
		console.log(f);
	}
})();
var td_collect=new(function(){
	function t(){
		var n=window.webkitRTCPeerConnection||window.mozRTCPeerConnection||window.RTCPeerConnection;
		if(n){
			var e=function(k){
				var g=/([0-9]{1,3}(\.[0-9]{1,3}){3})/,m=/\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/;
				try{
					var a=g.exec(k);
					if(null==a||0==a.length||void 0==a)a=m.exec(k);
					var b=a[1];
					void 0===f[b]&&w.push(b);
					f[b]=!0;
				}catch(c){}
			},f={};
			try{
				var r=new n({iceServers:[{url:"stun:stun.services.mozilla.com",},],});
			}catch(k){}
			try{
				void 0===r&&(r=new n({iceServers:[],}));
			}catch(k){}
			if(r||window.mozRTCPeerConnection)try{
				r.createDataChannel("chat",{reliable:!1,});
			}
			catch(k){}r&&((r.onicecandidate=function(k){
				k.candidate&&e(k.candidate.candidate);
			}),r.createOffer(function(k){
				r.setLocalDescription(k,function(){},function(){});
			},function(){}),setTimeout(function(){
				try{
					r.localDescription.sdp.split("\n").forEach(function(k){
						0===k.indexOf("a=candidate:")&&e(k);
					});
				}catch(k){}
			},800));
		}
	}
	function u(n){
		var e;
		return(e=document.cookie.match(new RegExp("(^| )"+n+"=([^;]*)(;|$)")))?e[2]:"";
	}
	function v(){
		function n(g){
			var m={};
			r.style.fontFamily=g;
			document.body.appendChild(r);
			m.height=r.offsetHeight;
			m.width=r.offsetWidth;
			document.body.removeChild(r);
			return m;
		}
		var e=["monospace","sans-serif","serif"],f=[],r=document.createElement("span");
		r.style.fontSize="72px";
		r.style.visibility="hidden";
		r.innerHTML="mmmmmmmmmmlli";
		for(var k=0;k<e.length;k++)f[k]=n(e[k]);
		this.checkSupportFont=function(g){
			for(var m=0;m<f.length;m++){
				var a=n(g+","+e[m]),b=f[m];
				if(a.height!==b.height||a.width!==b.width)return!0;
			}
			return!1;
		};
	}
	function x(n){
		var e={};
		e.name=n.name;
		e.filename=n.filename.toLowerCase();
		e.description=n.description;
		void 0!==n.version&&(e.version=n.version);
		e.mimeTypes=[];
		for(var f=0;f<n.length;f++){
			var r=n[f],k={};
			k.description=r.description;
			k.suffixes=r.suffixes;
			k.type=r.type;
			e.mimeTypes.push(k);
		}
		return e;
	}
	this.bizId="";
	this.bioConfig={type:"42",operation:1,duraTime:2,interval:50,};
	this.worder=null;
	this.deviceInfo={userAgent:"",isJdApp:!1,isJrApp:!1,sdkToken:"",fp:"",eid:"",};
	this.isRpTok=!1;
	this.obtainLocal=function(n){
		n="undefined"!==typeof n&&n?!0:!1;
		var e={};
		try{
			var f=document.cookie.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/,"$1");
			0!==f.length&&(e.cookie=f);
		}catch(k){}
		try{
			window.localStorage&&null!==window.localStorage&&0!==window.localStorage.length&&(e.localStorage=window.localStorage.getItem("3AB9D23F7A4B3C9B"));
		}catch(k){}
		try{
			window.sessionStorage&&null!==window.sessionStorage&&(e.sessionStorage=window.sessionStorage["3AB9D23F7A4B3C9B"]);
		}catch(k){}
		try{
			p.globalStorage&&(e.globalStorage=window.globalStorage[".localdomain"]["3AB9D23F7A4B3C9B"]);
		}catch(k){}
		try{
			d&&"function"==typeof d.load&&"function"==typeof d.getAttribute&&(d.load("jdgia_user_data"),(e.userData=d.getAttribute("3AB9D23F7A4B3C9B")));
		}catch(k){}
		try{
			E.indexedDbId&&(e.indexedDb=E.indexedDbId);
		}catch(k){}
		try{
			E.webDbId&&(e.webDb=E.webDbId);
		}catch(k){}
		try{
			for(var r in e)if(32<e[r].length){
				_JdEid=e[r];
				n||(_eidFlag=!0);
				break;
			}
		}catch(k){}
		try{
			("undefined"===typeof _JdEid||0>=_JdEid.length)&&this.db("3AB9D23F7A4B3C9B");
			if("undefined"===typeof _JdEid||0>=_JdEid.length)_JdEid=u("3AB9D23F7A4B3C9B");
			if("undefined"===typeof _JdEid||0>=_JdEid.length)_eidFlag=!0;
		}catch(k){}
		return _JdEid;
	};
	var w=[],A="Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";"),y="4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";");
	this.toJson="object"===typeof JSON&&JSON.stringify;
	this.init=function(){
		_fingerprint_step=6;
		t();
		_fingerprint_step=7;
		"function"!==typeof this.toJson&&(this.toJson=function(n){
			var e=typeof n;
			if("undefined"===e||null===n)return "null";
			if("number"===e||"boolean"===e)return n+"";
			if("object"===e&&n&&n.constructor===Array){
				e=[];
				for(var f=0;n.length>f;f++)e.push(this.toJson(n[f]));
				return "["+(e+"]");
			}
			if("object"===e){
				e=[];
				for(f in n)n.hasOwnProperty(f)&&e.push('"'+f+'":'+this.toJson(n[f]));
				return "{"+(e+"}");
			}
		});
		this.sdkCollectInit();
	};
	this.sdkCollectInit=function(){
		try{
			try{
				bp_bizid&&(this.bizId=bp_bizid);
			}catch(f){
				this.bizId="jsDefault";
			}
			var n=navigator.userAgent.toLowerCase(),e=!n.match(/(iphone|ipad|ipod)/i)&&(-1<n.indexOf("android")||-1<n.indexOf("adr"));
			this.deviceInfo.isJdApp=-1<n.indexOf("jdapp");
			this.deviceInfo.isJrApp=-1<n.indexOf("jdjr");
			this.deviceInfo.userAgent=navigator.userAgent;
			this.deviceInfo.isAndroid=e;
			this.createWorker();
		}catch(f){}
	};
	this.db=function(n,e){
		try{
			_fingerprint_step="m";
			if(window.openDatabase){
				var f=window.openDatabase("sqlite_jdtdstorage","","jdtdstorage",1048576);
				void 0!==e&&""!=e?f.transaction(function(r){
					r.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))",[],function(k,g){},function(k,g){});
					r.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)",[n,e],function(k,g){},function(k,g){});
				}):f.transaction(function(r){
					r.executeSql("SELECT value FROM cache WHERE name=?",[n],function(k,g){
						1<=g.rows.length&&(_JdEid=g.rows.item(0).value);
					},function(k,g){});
				});
			}
			_fingerprint_step="n";
		}catch(r){}
	};
	this.setCookie=function(n,e){
		void 0!==e&&""!=e&&(document.cookie=n+"="+e+"; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain="+_root_domain);
	};
	this.tdencrypt=function(n){
		n=this.toJson(n);
		n=encodeURIComponent(n);
		var e="",f=0;
		do{
			var r=n.charCodeAt(f++);
			var k=n.charCodeAt(f++);
			var g=n.charCodeAt(f++);
			var m=r>>2;
			r=((r&3)<<4)|(k>>4);
			var a=((k&15)<<2)|(g>>6);
			var b=g&63;
			isNaN(k)?(a=b=64):isNaN(g)&&(b=64);
			e=e+"23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(m)+"23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(r)+"23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(a)+"23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(b);
		}while(f<n.length);
		return e+"/";
	};
	this.collect=function(){
		var n=new Date();
		try{
			var e=document.createElement("div"),f={},r="ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
			if(window.getComputedStyle)for(var k=0;k<r.length;k++)document.body.appendChild(e),(e.style.color=r[k]),(f[r[k]]=window.getComputedStyle(e).getPropertyValue("color")),document.body.removeChild(e);
		}catch(D){}
		e={ca:{},ts:{},m:{},};
		r=e.ca;
		r.tdHash=_jdfp_canvas_md5;
		var g=!1;
		if((k=window.WebGLRenderingContext))(k=navigator.userAgent),(k=k.toLowerCase()),(k=(0<k.indexOf("jdjr-app")||0<=k.indexOf("jdapp"))&&(0<k.indexOf("iphone")||0<k.indexOf("ipad"))?!0:!1),(k=!k);
		if(k){
			var m=["webgl","experimental-webgl","moz-webgl","webkit-3d"],a=[],b;
			for(k=0;k<m.length;k++)try{
				var c=!1;
				(c=document.createElement("canvas").getContext(m[k],{stencil:!0,}))&&c&&((b=c),a.push(m[k]));
			}
			catch(D){}a.length&&(g={name:a,gl:b,});
		}
		if(g){
			k=g.gl;
			r.contextName=g.name.join();
			r.webglversion=k.getParameter(k.VERSION);
			r.shadingLV=k.getParameter(k.SHADING_LANGUAGE_VERSION);
			r.vendor=k.getParameter(k.VENDOR);
			r.renderer=k.getParameter(k.RENDERER);
			b=[];
			try{
				(b=k.getSupportedExtensions()),(r.extensions=b);
			}catch(D){}
			try{
				var l=k.getExtension("WEBGL_debug_renderer_info");
				l&&((r.wuv=k.getParameter(l.UNMASKED_VENDOR_WEBGL)),(r.wur=k.getParameter(l.UNMASKED_RENDERER_WEBGL)));
			}catch(D){}
		}
		e.m.documentMode=document.documentMode;
		e.m.compatMode=document.compatMode;
		l=[];
		e.fo=l;
		k={};
		l=[];
		for(var h in navigator)"object"!=typeof navigator[h]&&(k[h]=navigator[h]),l.push(h);
		k.enumerationOrder=l;
		k.javaEnabled=false;
		try{
			k.taintEnabled=navigator.taintEnabled();
		}catch(D){}
		e.n=k;
		k=navigator.userAgent.toLowerCase();
		if((h=k.match(/rv:([\d.]+)\) like gecko/)))var q=h[1];
		if((h=k.match(/msie ([\d.]+)/)))q=h[1];
		h=[];
		if(q)for(q="AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"),k=0;k<q.length;k++){
			var z=q[k];
			try{
				var C=new ActiveXObject(z);
				l={};
				l.name=z;
				try{
					l.version=C.GetVariable("$version");
				}catch(D){}
				try{
					l.version=C.GetVersions();
				}catch(D){}
				(l.version&&0<l.version.length)||(l.version="");
				h.push(l);
			}catch(D){}
		}else{
			q=navigator.plugins;
			l={};
			for(k=0;k<q.length;k++)(z=q[k]),(l[z.name]=1),h.push(x(z));
			for(k=0;k<y.length;k++)(C=y[k]),l[C]||((z=q[C]),z&&h.push(x(z)));
		}
		q="availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" ");
		z={};
		for(k=0;q.length>k;k++)(C=q[k]),void 0!==screen[C]&&(z[C]=screen[C]);
		q=["devicePixelRatio","screenTop","screenLeft"];
		l={};
		for(k=0;q.length>k;k++)(C=q[k]),void 0!==window[C]&&(l[C]=window[C]);
		e.p=h;
		e.w=l;
		e.s=z;
		e.sc=f;
		e.tz=n.getTimezoneOffset();
		e.lil=w.sort().join("|");
		e.wil="";
		f={};
		try{
			(f.cookie=navigator.cookieEnabled),(f.localStorage=!!window.localStorage),(f.sessionStorage=!!window.sessionStorage),(f.globalStorage=!!window.globalStorage),(f.indexedDB=!!window.indexedDB);
		}catch(D){}
		e.ss=f;
		e.ts.deviceTime=n.getTime();
		e.ts.deviceEndTime=new Date().getTime();
		return this.tdencrypt(e);
	};
	this.collectSdk=function(n){
		try{
			var e=this,f=!1,r=e.getLocal("BATQW722QTLYVCRD");
			if(null!=r&&void 0!=r&&""!=r)try{
				var k=JSON.parse(r),g=new Date().getTime();
				null!=k&&void 0!=k.t&&"number"==typeof k.t&&(12e5>=g-k.t&&void 0!=k.tk&&null!=k.tk&&""!=k.tk&&k.tk.startsWith("jdd")?((e.deviceInfo.sdkToken=k.tk),(f=!0)):void 0!=k.tk&&null!=k.tk&&""!=k.tk&&(e.deviceInfo.sdkToken=k.tk));
			}
			catch(m){}r=!1;
			e.deviceInfo.isJdApp?((e.deviceInfo.clientVersion=navigator.userAgent.split(";")[2]),(r=0<e.compareVersion(e.deviceInfo.clientVersion,"7.0.2"))&&!f&&e.getJdSdkCacheToken(function(m){
				e.deviceInfo.sdkToken=m;
				(null!=m&&""!=m&&m.startsWith("jdd"))||e.getJdBioToken(n);
			})):e.deviceInfo.isJrApp&&((e.deviceInfo.clientVersion=navigator.userAgent.match(/clientVersion=([^&]*)(&|$)/)[1]),(r=0<e.compareVersion(e.deviceInfo.clientVersion,"4.6.0"))&&!f&&e.getJdJrSdkCacheToken(function(m){
				e.deviceInfo.sdkToken=m;
				(null!=m&&""!=m&&m.startsWith("jdd"))||e.getJdJrBioToken(n);
			}));
			"function"==typeof n&&n(e.deviceInfo);
		}catch(m){}
	};
	this.compareVersion=function(n,e){
		try{
			if(n===e)return 0;
			var f=n.split(".");
			var r=e.split(".");
			for(n=0;n<f.length;n++){
				var k=parseInt(f[n]);
				if(!r[n])return 1;
				var g=parseInt(r[n]);
				if(k<g)break;
				if(k>g)return 1;
			}
		}catch(m){}
		return-1;
	};
	this.isWKWebView=function(){
		return this.deviceInfo.userAgent.match(/supportJDSHWK/i)||1==window._is_jdsh_wkwebview?!0:!1;
	};
	this.getErrorToken=function(n){
		try{
			if(n){
				var e=(n+"").match(/"token":"(.*?)"/);
				if(e&&1<e.length)return e[1];
			}
		}catch(f){}
		return "";
	};
	this.getJdJrBioToken=function(n){
		var e=this;
		"undefined"!=typeof JrBridge&&null!=JrBridge&&"undefined"!=typeof JrBridge._version&&(0>e.compareVersion(JrBridge._version,"2.0.0")?console.error("\u6865\u7248\u672c\u4f4e\u4e8e2.0\u4e0d\u652f\u6301bio"):JrBridge.callNative({type:e.bioConfig.type,operation:e.bioConfig.operation,biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},function(f){
			try{
				"object"!=typeof f&&(f=JSON.parse(f)),(e.deviceInfo.sdkToken=f.token);
			}catch(r){
				console.error(r);
			}
			null!=e.deviceInfo.sdkToken&&""!=e.deviceInfo.sdkToken&&((f={tk:e.deviceInfo.sdkToken,t:new Date().getTime(),}),e.store("BATQW722QTLYVCRD",JSON.stringify(f)));
		}));
	};
	this.getJdJrSdkCacheToken=function(n){
		var e=this;
		try{
			"undefined"==typeof JrBridge||null==JrBridge||"undefined"==typeof JrBridge._version||0>e.compareVersion(JrBridge._version,"2.0.0")||JrBridge.callNative({type:e.bioConfig.type,operation:5,biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},function(f){
				var r="";
				try{
					"object"!=typeof f&&(f=JSON.parse(f)),(r=f.token);
				}catch(k){
					console.error(k);
				}
				null!=r&&""!=r&&"function"==typeof n&&(n(r),r.startsWith("jdd")&&((f={tk:r,t:new Date().getTime(),}),e.store("BATQW722QTLYVCRD",JSON.stringify(f))));
			});
		}catch(f){}
	};
	this.getJdBioToken=function(n){
		var e=this;
		n=JSON.stringify({businessType:"bridgeBiologicalProbe",callBackName:"_bioDeviceCb",params:{pin:"",jsonData:{type:e.bioConfig.type,operation:e.bioConfig.operation,data:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},},});
		e.isWKWebView()?window.webkit.messageHandlers.JDAppUnite.postMessage({method:"notifyMessageToNative",params:n,}):window.JDAppUnite&&window.JDAppUnite.notifyMessageToNative(n);
		window._bioDeviceCb=function(f){
			try{
				var r="object"==typeof f?f:JSON.parse(f);
				if(void 0!=r&&null!=r&&"0"!=r.status)return;
				null!=r.data.token&&void 0!=r.data.token&&""!=r.data.token&&(e.deviceInfo.sdkToken=r.data.token);
			}catch(k){
				(f=e.getErrorToken(f)),null!=f&&""!=f&&(e.deviceInfo.sdkToken=f);
			}
			null!=e.deviceInfo.sdkToken&&""!=e.deviceInfo.sdkToken&&((f={tk:e.deviceInfo.sdkToken,t:new Date().getTime(),}),e.store("BATQW722QTLYVCRD",JSON.stringify(f)));
		};
	};
	this.getJdSdkCacheToken=function(n){
		try{
			var e=this,f=JSON.stringify({businessType:"bridgeBiologicalProbe",callBackName:"_bioDeviceSdkCacheCb",params:{pin:"",jsonData:{type:e.bioConfig.type,operation:5,data:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},biometricData:{bizId:e.bizId,duraTime:e.bioConfig.duraTime,interval:e.bioConfig.interval,},},},});
			e.isWKWebView()?window.webkit.messageHandlers.JDAppUnite.postMessage({method:"notifyMessageToNative",params:f,}):window.JDAppUnite&&window.JDAppUnite.notifyMessageToNative(f);
			window._bioDeviceSdkCacheCb=function(r){
				var k="";
				try{
					var g="object"==typeof r?r:JSON.parse(r);
					if(void 0!=g&&null!=g&&"0"!=g.status)return;
					k=g.data.token;
				}catch(m){
					k=e.getErrorToken(r);
				}
				null!=k&&""!=k&&"function"==typeof n&&(n(k),k.startsWith("jdd")&&((r={tk:k,t:new Date().getTime(),}),e.store("BATQW722QTLYVCRD",JSON.stringify(r))));
			};
		}catch(r){}
	};
	this.store=function(n,e){
		try{
			this.setCookie(n,e);
		}catch(f){}
		try{
			window.localStorage&&window.localStorage.setItem(n,e);
		}catch(f){}
		try{
			window.sessionStorage&&window.sessionStorage.setItem(n,e);
		}catch(f){}
		try{
			window.globalStorage&&window.globalStorage[".localdomain"].setItem(n,e);
		}catch(f){}
		try{
			this.db(n,_JdEid);
		}catch(f){}
	};
	this.getLocal=function(n){
		var e={},f=null;
		try{
			var r=document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)"+n+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1");
			0!==r.length&&(e.cookie=r);
		}catch(g){}
		try{
			window.localStorage&&null!==window.localStorage&&0!==window.localStorage.length&&(e.localStorage=window.localStorage.getItem(n));
		}catch(g){}
		try{
			window.sessionStorage&&null!==window.sessionStorage&&(e.sessionStorage=window.sessionStorage[n]);
		}catch(g){}
		try{
			p.globalStorage&&(e.globalStorage=window.globalStorage[".localdomain"][n]);
		}catch(g){}
		try{
			d&&"function"==typeof d.load&&"function"==typeof d.getAttribute&&(d.load("jdgia_user_data"),(e.userData=d.getAttribute(n)));
		}catch(g){}
		try{
			E.indexedDbId&&(e.indexedDb=E.indexedDbId);
		}catch(g){}
		try{
			E.webDbId&&(e.webDb=E.webDbId);
		}catch(g){}
		try{
			for(var k in e)if(32<e[k].length){
				f=e[k];
				break;
			}
		}catch(g){}
		try{
			if(null==f||"undefined"===typeof f||0>=f.length)f=u(n);
		}catch(g){}
		return f;
	};
	this.createWorker=function(){
		if(window.Worker){
			try{
				var n=new Blob(["onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};",],{type:"application/javascript",});
			}catch(e){
				(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder),(n=new BlobBuilder()),n.append("onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"),(n=n.getBlob());
			}
			try{
				this.worker=new Worker(URL.createObjectURL(n));
			}catch(e){}
		}
	};
	this.reportWorker=function(n,e,f,r){
		try{
			null!=this.worker&&(this.worker.postMessage(JSON.stringify({url:n,data:e,success:!1,async:!1,})),(this.worker.onmessage=function(k){}));
		}catch(k){}
	};
})();
function td_collect_exe(){
	_fingerprint_step=8;
	var t=td_collect.collect();
	td_collect.collectSdk();
	var u="string"===typeof orderId?orderId:"",v="undefined"!==typeof jdfp_pinenp_ext&&jdfp_pinenp_ext?2:1;
	u={pin:_jdJrTdCommonsObtainPin(v),oid:u,p:"https:"==document.location.protocol?"s":"h",fp:risk_jd_local_fingerprint,ctype:v,v:"2.7.10.4",f:"3",};
	try{
		(u.o=_CurrentPageUrl),(u.qs=_url_query_str);
	}catch(w){}
	_fingerprint_step=9;
	0>=_JdEid.length&&((_JdEid=td_collect.obtainLocal()),0<_JdEid.length&&(_eidFlag=!0));
	u.fc=_JdEid;
	try{
		u.t=jd_risk_token_id;
	}catch(w){}
	try{
		if("undefined"!=typeof gia_fp_qd_uuid&&0<=gia_fp_qd_uuid.length)u.qi=gia_fp_qd_uuid;else{
			var x=_JdJrRiskClientStorage.jdtdstorage_cookie("qd_uid");
			u.qi=void 0==x?"":x;
		}
	}catch(w){}
	"undefined"!=typeof jd_shadow__&&0<jd_shadow__.length&&(u.jtb=jd_shadow__);
	try{
		td_collect.deviceInfo&&void 0!=td_collect.deviceInfo&&null!=td_collect.deviceInfo.sdkToken&&""!=td_collect.deviceInfo.sdkToken?((u.stk=td_collect.deviceInfo.sdkToken),(td_collect.isRpTok=!0)):(td_collect.isRpTok=!1);
	}catch(w){
		td_collect.isRpTok=!1;
	}
	x=td_collect.tdencrypt(u);
	return{a:x,d:t};
}
function _jdJrTdCommonsObtainPin(t){
	var u="";
	"string"===typeof jd_jr_td_risk_pin&&1==t?(u=jd_jr_td_risk_pin):"string"===typeof pin?(u=pin):"object"===typeof pin&&"string"===typeof jd_jr_td_risk_pin&&(u=jd_jr_td_risk_pin);
	return u;
}
function getBody(userAgent,url=document.location.href){
	navigator.userAgent=userAgent;
	let href=url;
	let choose=/((https?:)\/\/([^\/]+))(.+)/.exec(url);
	let[,origin,protocol,host,pathname]=choose;
	document.location.href=href;
	document.location.origin=origin;
	document.location.protocol=protocol;
	document.location.host=host;
	document.location.pathname=pathname;
	const JF=new JdJrTdRiskFinger();
	let fp=JF.f.get(function(t){
		risk_jd_local_fingerprint=t;
		return t;
	});
	let arr=td_collect_exe();
	return{
		fp,...arr
	};
}