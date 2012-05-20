tool('Monster');

tools.Monster.settings = function() {

	tools.Assister.runtimeUpdate();
	tools.Settings.heading(language.monsterSetName);
	tools.Settings.text('');
	tools.Settings.onoff(language.monsterSetCloseInstant, tools.Monster.runtime.closeInstant, 'cageMonsterCloseInstant', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetTransparent, tools.Monster.runtime.transparent, 'cageMonsterTransparent', tools.Monster.runtimeUpdate);
	tools.Settings.text(language.monsterSetDescMonster);
	tools.Settings.onoff(language.monsterSetMonster, tools.Monster.runtime.toCheck.monster, 'cageMonsterMonster', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival1, tools.Monster.runtime.toCheck.festival1, 'cageMonsterFestival1', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival2, tools.Monster.runtime.toCheck.festival2, 'cageMonsterFestival2', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetRaid, tools.Monster.runtime.toCheck.raid, 'cageMonsterRaid', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetConquest, tools.Monster.runtime.toCheck.conquest, 'cageMonsterConquest', tools.Monster.runtimeUpdate);
};
tools.Monster.runtimeUpdate = function() {

	tools.Monster.runtime = {
		listFilled : tools.Monster.runtime ? tools.Monster.runtime.listFilled : false,
		closeInstant : item.get('cageMonsterCloseInstant', false),
		transparent : item.get('cageMonsterTransparent', false),
		toCheck : {
			festival1 : item.get('cageMonsterFestival1', true),
			festival2 : item.get('cageMonsterFestival2', true),
			monster : item.get('cageMonsterMonster', true),
			raid : item.get('cageMonsterRaid', true),
			conquest : item.get('cageMonsterConquest', true)
		},
		conquestLands : item.get('cageMonsterConquestLands', {})
	};
	$('#cageMonsterContainer').css('opacity', tools.Monster.runtime.transparent ? 0.7 : 1);
};
tools.Monster.init = function() {
	$('#cageContainer').append('<div id="cageMonsterContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Sidebar.button.add('cageMonsterStart', language.monsterButton, function() {
		tools.Sidebar.button.disable('cageMonsterStart');
		tools.Monster.start();
	});
	tools.Monster.runtimeUpdate();
};
tools.Monster.start = function() {
	if (!tools.Monster.runtime.listFilled) {
		tools.Monster.runtime.listFilled = true;
		$('#cageMonsterContainer').empty().append('<span id="cageMonsterReload">Loading...</span>').append($('<img id="cageMonsterClose" src="http://image4.castleagegame.com/graphics/popup_close_button.png">').click(tools.Monster.done));
		tools.Monster.runtime.checkFor = [];
		$.each(tools.Monster.runtime.toCheck, function(_i, _e) {
			if (_e === true) {
				tools.Monster.runtime.checkFor.push(_i);
			}
		});
		tools.Monster.checkFor();
	}
	$('#cageMonsterContainer').show().animate({
		'top' : 80
	}, 'slow');

};
tools.Monster.checkFor = function() {
	if (tools.Monster.runtime.checkFor !== undefined && tools.Monster.runtime.checkFor.length > 0) {
		setTimeout(tools.Monster[tools.Monster.runtime.checkFor.shift()], 100);
	} else {
		$('#cageMonsterReload').text('Reload').click(function() {
			tools.Monster.runtime.listFilled = false;
			tools.Monster.start();
		});
	}
};
tools.Monster.monster = function() {
	signedGet('player_monster_list.php', function(_monster) {
		_monster = $(noSrc(_monster));
		$('table.layout:first div[style="padding:0 0 15px 0;"] > div', _monster).each(function(_i, _e) {
			_e = $(_e);
			var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('nosrc') + ')'), _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if (_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(1) > div:first > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) form')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/monster_button_yourmonster_on.jpg">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival1 = function() {
	signedGet('festival_tower.php?tab=monster', function(_festMonster) {
		_festMonster = $(noSrc(_festMonster));
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			_e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap(), _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if (_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag_tower.gif">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival2 = function() {
	signedGet('festival_tower2.php?tab=monster', function(_festMonster) {
		_festMonster = $(noSrc(_festMonster));
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			_e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap(), _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if (_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag2_tower.gif">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.raid = function() {
	signedGet('raid.php', function(_raids) {
		_raids = $(noSrc(_raids));
		$('table.layout span', _raids).parent().parent().parent().each(function(_i, _e) {
			_e = $(_e);
			if (_e.text().trim() !== '[START THIS CAMPAIGN]') {
				console.log(_e.find('> div:eq(1) > div:first').css('backgroundImage'));
				var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', _e.find('> div:eq(1) > div:first').css('backgroundImage'));
				_img.append('<div class="cageMonsterName">' + $(_e).find('span').text().split(' ')[0] + '</div>');
				_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
				$('#cageMonsterContainer').append(noNoSrc(_img));
				$('div.cageMonsterListItem:last').show();
			}
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.conquest = function() {
	$.each(tools.Monster.runtime.conquestLands, function(_i, _e) {
		if (_e == true) {
			signedGet(_i, function(_monster) {
				_monster = $(noSrc(_monster));
				$('#guildv2_monster_list_body div[style="padding:10px 0 0 20px;"] > div', _monster).each(function(_i, _e) {
					_e = $(_e);
					var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('nosrc') + ')');
					_img.append('<div class="cageMonsterName">' + $('div[id="guildv2_monster_list_top"]:first', _monster).text() + '</div>');
					_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) a')));
					_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/war_battle_guildbtllands_on.jpg">');
					$('#cageMonsterContainer').append(noNoSrc(_img));
					$('div.cageMonsterListItem:last').show();
				});
			});
		}
	});
	tools.Monster.checkFor();
};
tools.Monster.closeInstant = function() {
	if (tools.Monster.runtime.closeInstant) {
		tools.Monster.done();
	}
};
tools.Monster.done = function() {
	console.log('done:', $('#cageMonsterContainer').height());
	$('#cageMonsterContainer').animate({
		'top' : -119 - $('#cageMonsterContainer').height() + 10,
	}, 'slow', function() {
		$(this).hide();
	});
	tools.Sidebar.button.enable('cageMonsterStart');

};

tools.Monster.battleAdditons = function(_monsterpage) {
	var monsterBars = tools.Monster.monsterBars(), defense = tools.Monster.defense(), stunBar = tools.Monster.stunBar();
	tools.Monster.battleStats();
	tools.Monster.battleResult(monsterBars, defense, stunBar);
	tools.Monster.battleCTA(_monsterpage);
};
function gel(id){
	return document.getElementById(id);
}
tools.Monster.attackKeys = function(){
	//var g = gel('app_body');
	//g=g.innerHTML;
	//var	i=[1,5,10,20,50,100,200];
	//mid='';
	//twr='1';
	//if(gel('availableAttacks') !== null) {
		//var a;
		//var b;
		//var c;
		//var d;
		//var e;
		//var f = parseInt(gel('availableAttacks').value, 10);

		//if (g.indexOf('p_skaar_b') !== -1 || g.indexOf(mh+'skaar') !== -1 || g.indexOf(mh+'defend') !== -1 || g.indexOf(mh+'ragnarok') !== -1 || g.indexOf('p_water_e') !== -1 || g.indexOf(mh+'genesis') !== -1 || g.indexOf('p_earth_e') !== -1) {

			//z=gel('monster_attack_section_1');
			//if(page!=='guildv2_battle_monster' && page!=='battle_expansion_monster'){
				//u=z.children[1].casuser.value;
				//m=z.children[1].mpool.value;
			//} else {
				//gcid=z.children[1].guild_creator_id.value;
				//gcat=z.children[1].guild_created_at.value;
				//lslot=z.children[1].slot.value;
				//mslot=z.children[1].monster_slot.value;
			//}
			//imgloc=4;
			//if(z.children[1].mid !==undefined){
				//mid=z.children[1].mid.value;
				//if(z.children[1].tower !==undefined) twr=z.children[1].tower.value;
				//imgloc=6;	
			//}
			//if(page=='guildv2_battle_monster'||page=='battle_expansion_monster'){imgloc=6};
			//b1t=z.nextSibling.nextSibling.children[1].children[imgloc].children[0].src;
			//b2t=z.nextSibling.children[1].children[imgloc].children[0].src;
			//bvals=[[1,10],[5,10],[10,20],[20,40],[50,100]];
			//z=z.parentNode;
			//if(z.children[0].getAttribute('id')==null){
				//y=document.createElement('div');
				//y.setAttribute('style','float:left;padding:30px 0 0 60px;');
				//y.innerHTML=z.children[0].innerHTML;
				//z.parentNode.insertBefore(y,z);
				//y=document.createElement('div');
				//y.setAttribute('style','float:left;padding:30px 0 0 12px;');
				//y.innerHTML=z.lastElementChild.innerHTML;
				//z.parentNode.appendChild(y);
				//z.setAttribute('style','height:90px; float: left;');
			//}
			//z.innerHTML='';
			//for(x=1;x<6;x++){
				//if(x===1){b1t=b1t.replace('_power','');}
				//for(y=1;y<3;y++){
					//switch (y) {
						//case 1: bimg=b1t;ct='stamina';break;
						//case 2: bimg=b2t;ct='energy';break;
					//}
					//d = document.createElement('div');
					//d.setAttribute('id', 'monster_attack_section_'+((x*2)-(2-y)));
					//d.setAttribute('class', 'action');
					//if(x<5){
						//d.setAttribute('style', 'padding: 19px 0pt 0pt 17px;float: left;display:none');
					//} else {
						//d.setAttribute('style', 'padding: 19px 0pt 0pt 17px;float: left;display:block');
					//}
					//c='<div><img src="./ploader.php_files/'+ilnk+'button_cost_'+ct+'_'+bvals[x-1][y-1]+'.gif"></div><a onclick="als(glob, \'';

					//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
						//if(mid!==''){c+='festival_';}
						//c+='battle_monster.php?action=attackDragonSpecific&casuser='+u+'&mpool='+m+'&attack_key='+((x*2)-(2-y));
						//if(mid!==''){c+='&mid='+mid+'&tower='+twr;}
					//} else {
						//c+='battle_expansion_monster.php?action=attackDragonSpecific&guild_creator_id='+gcid+'&guild_created_at='+gcat+'&slot='+lslot+'&monster_slot='+mslot+'&attack_key='+((x*2)-(2-y));
					//}
					//c+='\')"><img class="imgButton" src="./ploader.php_files/'+bimg+'"></a>';
					//d.innerHTML=c;
					//z.appendChild(d);
				//}
			//}
			//gel('availableAttacks').value = 10;
			//gel('scrollRightArrow').setAttribute('style', 'display:none');
			//gel('scrollLeftArrow').setAttribute('style', 'display:block');
			//gel('currentOffset').value = 9;
		//}

		//if (g.indexOf(mh+'kromash') !== -1 ||g.indexOf(mh+'shardros') !== -1 ||g.indexOf('p_frost_') !== -1 ||g.indexOf(mh+'glacius') !== -1 ||g.indexOf(mh+'magmos') !== -1  ||g.indexOf('p_lava') !== -1 || g.indexOf('p_aurora') !== -1 || g.indexOf(mh+'aurora') !== -1 || g.indexOf(mh+'warredplains') !== -1 || g.indexOf(mh+'azriel') !== -1 || g.indexOf('s_azriel.') !== -1 || g.indexOf(mh+'alphabahamut') !== -1 || g.indexOf('p_volcanic_n') !==-1 || g.indexOf(mh+'alphameph') !== -1 || g.indexOf('p_alpha_v') !== -1 || g.indexOf('p_alpha_m') !== -1 || g.indexOf(mh+'corvintheus') !== -1 || g.indexOf(mh+'gehenna') !== -1 || g.indexOf('s_fire_b') !== -1 || g.indexOf('p_fire_e') !== -1 || g.indexOf('r_ambrosia') !== -1 || g.indexOf(mh+'bahamut') !== -1 || g.indexOf(mh+'lionrebellion') !== -1 || g.indexOf('p_chimera') !== -1 || g.indexOf(mh+'chimera') !== -1 || g.indexOf(mh+'jahanna') !== -1 || g.indexOf('r_valhalla_t') !== -1 || g.indexOf('top_air') !== -1 || g.indexOf('r_thanatos2_h') !== -1 || g.indexOf('r_kraken_h') !== -1 || g.indexOf('r_vermilion_h') !== -1 || g.indexOf('s_azeron_h') !== -1 || g.indexOf('s_fenix_h') !== -1 || g.indexOf('r_alpha_kraken_h') !== -1 || g.indexOf(mh+'kessaran') !== -1 || g.indexOf('r_malekus') !== -1|| g.indexOf(mh+'urmek') !== -1) {

			//z=gel('monster_attack_section_1');
			//imgloc=4;
			//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
				//if(z.children[1].mid!==undefined){
					//mid=z.children[1].mid.value;
					//if(z.children[1].tower !==undefined) twr=z.children[1].tower.value;
					//imgloc=6;
				//}
				//if(z.nextSibling.children[1].mid!==undefined){
					//mid=z.nextSibling.children[1].mid.value;
					//if(z.nextSibling.children[1].tower !==undefined) twr=z.nextSibling.children[1].tower.value;
					//imgloc=6;
				//}
			//} else {
				//gcid=z.children[1].guild_creator_id.value;
				//gcat=z.children[1].guild_created_at.value;
				//lslot=z.children[1].slot.value;
				//mslot=z.children[1].monster_slot.value;
				//imgloc=6;
			//}

			//if(g.indexOf(mh+'kessaran')!=-1||g.indexOf('s_fenix_h')!==-1||g.indexOf(mh+'urmek')!==-1){
				//imgloc=5;
				//tkey=z.children[1].target_key.value;
			//}

			//a=gel('scrollLeftArrow').getAttribute('onclick');
			//buts=parseInt(a.substring(a.indexOf('left')+7, a.indexOf(')',a.indexOf('left')+7)));

			//if(z.children[1].tagName==='IMG'){
				//b1t=z.children[1].src;
				//b1a=0;
				//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
					//u=z.nextSibling.children[1].casuser.value;
					//m=z.nextSibling.children[1].mpool.value;
				//}
			//} else {
				//b1t=z.children[1].children[imgloc].children[0].src;
				//b1a=z.children[1].action.value;
				//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
					//u=z.children[1].casuser.value;
					//m=z.children[1].mpool.value;
				//}
			//}

			//if(z.nextSibling.children[1].tagName==='IMG'){
				//b2t=z.nextSibling.children[1].src;
				//b2a=0;
			//} else {
				//if(z.nextSibling.children[1].children[imgloc].children[0]){
					//b2t=z.nextSibling.children[1].children[imgloc].children[0].src;
				//} else {
					//b2t=z.nextSibling.children[1].children[imgloc-1].children[0].src;
				//}
				//b2a=z.nextSibling.children[1].action.value;
			//}

			//if(z.nextSibling.nextSibling){
				//if(z.nextSibling.nextSibling.children.length>1){
					//if(z.nextSibling.nextSibling.children[1].children.length===0){
						//b3t=z.nextSibling.nextSibling.children[1].src;
						//b3a=0;
					//} else {
					//if(z.nextSibling.nextSibling.children[1].children[imgloc].children[0]){
						//b3t=z.nextSibling.nextSibling.children[1].children[imgloc].children[0].src;
					//} else {
						//b3t=z.nextSibling.nextSibling.children[1].children[imgloc-1].children[0].src;
					//}
						//b3a=z.nextSibling.nextSibling.children[1].action.value;
					//}
				//}
			//}

			//if(g.indexOf(mh+'warredplains') != -1 || g.indexOf(mh+'lionrebellion') !== -1){
				//bvals=[[5,5,10],[10,10,20],[20,20,40],[50,50,100]];
				//btyp=0;
			//} else {
				//bvals=[[5,10,10],[10,20,20],[20,40,40],[50,100,100]];
				//btyp=1;
			//}
			//if(g.indexOf(mh+'jahanna') !== -1 || g.indexOf('r_valhalla_t') !== -1 || g.indexOf('top_air') !== -1 || g.indexOf('r_thanatos2_h') !== -1 || g.indexOf(mh+'glacius') !== -1 || g.indexOf('s_azeron_h') !== -1||g.indexOf(mh+'magmos') !== -1 || g.indexOf('r_valhalla_t') !== -1 || g.indexOf(mh+'kessaran') !== -1|| g.indexOf('s_fenix_h') !== -1||g.indexOf(mh+'shardros') !== -1|| g.indexOf('r_malekus') !== -1|| g.indexOf(mh+'urmek') !== -1|| g.indexOf('r_vermilion_h') !== -1|| g.indexOf(mh+'chimera') !== -1){
				//bvals=[[10,20,20],[20,40,40],[50,100,100],[100,200,200],[200,200,200]];
				//nvals=5
			//} else {
				//nvals=4
			//}
			//z=z.parentNode;
			//if(z.children[0].getAttribute('id')==null){
				//y=document.createElement('div');
				//if(buts==2){
					//y.setAttribute('style','float:left;padding:30px 0 0 60px;');
				//} else {
					//y.setAttribute('style','float:left;padding:30px 0 0 1px;');
				//}
				//y.innerHTML=z.children[0].innerHTML;
				//z.parentNode.insertBefore(y,z);
				//y=document.createElement('div');
				//y.setAttribute('style','float:left;padding:30px 0 0 12px;');
				//y.innerHTML=z.lastElementChild.innerHTML;
				//z.parentNode.appendChild(y);
				//z.setAttribute('style','height:90px; float: left;');
			//}
			//z.innerHTML='';
			////for(x=1;x<nvals+1;x++){ for(y="1;y<buts+1;y++){" if(y="==1){" bimg="b1t;" bac="b1a;" ct="stamina" ;="" }="" if(btyp="==0){" else="" {="" d="document.createElement('div');" d.setattribute('id',="" 'monster_attack_section_'+((x*buts)-(buts-y)));="" d.setattribute('class',="" 'action');="" if(x<nvals){="" d.setattribute('style',="" 'padding:19px="" 0pt="" 15px;float:left;display:none');="" 15px;float:left;display:block');="" c="<div><img src=&quot;" +ilnk+'button_cost_'+ct+'_'+bvals[x-1][y-1]+'.gif"="">';

				//if((page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster')&&bac!==0){
						//c+='<a onclick="als(glob, \'';
						//if(mid!==''){c+='festival_';}
						//c+='battle_monster.php?action='+bac+'&casuser='+u+'&mpool='+m+'&attack_key='+((x*buts)-(buts-y));
						//if(g.indexOf(mh+'kessaran')!=-1||g.indexOf('s_fenix_h')!==-1||g.indexOf(mh+'urmek') !== -1){
							//c+='&target_key=\'+this.children[0].value+\'';
						//}
						//if(mid!==''){c+='&mid='+mid+'&tower='+twr;}
						//c+='\')">';
						//if(g.indexOf(mh+'kessaran')!=-1||g.indexOf('s_fenix_h')!==-1||g.indexOf(mh+'urmek') !== -1){
							//c+='<input class="selected_target_keys" type="hidden" value="'+tkey+'" name="tkey">';
						//}

					//} else {
						//if(bac!==0){
							//c+='</a><a onclick="als(glob, \'battle_expansion_monster.php?action='+bac+'&guild_creator_id='+gcid+'&guild_created_at='+gcat+'&slot='+lslot+'&monster_slot='+mslot+'&attack_key='+((x*buts)-(buts-y))+'\')">';
						//}
					//}

					//c+='<img class="imgButton" src="./ploader.php_files/'+bimg+'">';
					//if(bac!==0){	
						//c+='</a>';
					//}
					//d.innerHTML=c;
					//z.appendChild(d);
				//}
			//}
			//gel('availableAttacks').value = nvals*buts;
			//gel('scrollRightArrow').setAttribute('style', 'display:none');
			//gel('scrollLeftArrow').setAttribute('style', 'display:block');
			//gel('currentOffset').value=(nvals*buts-(buts-1));
		//}


		//if (g.indexOf(mh+'cronus') !== -1 || g.indexOf('top_hydra') !== -1) {
			//b=gel('monster_attack_section_1');				

			//if(b.children[1].casuser) u=b.children[1].casuser.value;

			//twr=0;
			//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
				//if(b.children[1].mid !==undefined){
					//mid=b.children[1].mid.value;
					//if(b.children[1].tower !==undefined) twr=b.children[1].tower.value;
				//}
			//} else {
				//gcid=b.children[1].guild_creator_id.value;
				//gcat=b.children[1].guild_created_at.value;
				//lslot=b.children[1].slot.value;
				//mslot=b.children[1].monster_slot.value;
			//}

			//b=b.parentNode;
			//if(twr!=0){
				//x=document.createElement('div');
				//insertAfter(b.children[0],x);			
				//b=b.children[1];
			//}
			//for(x=1;x<f+1;x++){ remdom('monster_attack_section_'+x);="" }="" for(x="1;x<7;x++){" d="document.createElement('div');" d.setattribute('id',="" 'monster_attack_section_'+(x-1));="" d.setattribute('class',="" 'action');="" if(x<6){="" d.setattribute('style',="" 'padding:="" 19px="" 0pt="" 17px;float:="" left;display:none');="" else="" {="" left;display:block');="" c="<div><img src=&quot;" +ilnk+'button_cost_stamina_'+i[x]+'.gif"="">';
				//c+='<a onclick="als(glob, \'';

				//if(page!=='guildv2_battle_monster'&&page!=='battle_expansion_monster'){
					//if(mid!==''){c+='festival_';}
					//c+='battle_monster.php?action=attackDragonSpecific&casuser='+u+'&mpool=3&attack_key='+x;
					//if(mid!==''){c+='&mid='+mid+'&tower='+twr;}
				//} else {
					//c+='battle_expansion_monster.php?action=attackDragonSpecific&guild_creator_id='+gcid+'&guild_created_at='+gcat+'&slot='+lslot+'&monster_slot='+mslot+'&attack_key='+x;
				//}
				//c+='\')"><img class="imgButton" src="./ploader.php_files/'+ilnk+'button_nm_p_power_attack.gif"></a>';
				//d.innerHTML=c;
				//b.appendChild(d);
			//}
			//gel('availableAttacks').value = 5;
			//gel('scrollRightArrow').setAttribute('style', 'display:none');
			//gel('scrollLeftArrow').setAttribute('style', 'display:block');
			//gel('currentOffset').value=5;
		//}
	//}
	//if (g.indexOf('seamonster_title') !== -1 || g.indexOf('top_seamonster') !== -1|| g.indexOf(mh+'ancientserpent') !== -1|| g.indexOf(mh+'emeraldserpent') !== -1|| g.indexOf(mh+'amyserpent') !== -1){

		//if(gel('monsterTicker')==null) return;
		//a=gel('monsterTicker').parentNode.parentNode;
		//if(a.children[1].id=='monsterTicker'){
			//a.removeChild(a.children[1]);
			//a.removeChild(a.children[1]);
		//}
		//a=gelc('positive',1);
		//if(g.indexOf('VICTORY!<') !==-1) return;
		//if(a.nodeName==='SPAN'){a=gelc('positive',2);}
		//b=a.parentNode;
		//if(b.innerHTML.indexOf('reward_button')!==-1){return;}
		//b.removeChild(b.children[1]);
		//u=b.children[2].children[0].children[0].casuser.value;
			//if(b.children[2].children[0].children[0].mid !==undefined){
				//mid=b.children[2].children[0].children[0].mid.value;
				//if(b.children[2].children[0].children[0].tower !==undefined) twr=b.children[2].children[0].children[0].tower.value;
			//}
		//bqh=b.children[2].children[0].children[0].bqh.value;
		//b.children[2].removeChild(b.children[2].children[0]);
		//b.children[2].removeChild(b.children[2].children[0]);
		//for(x=3;x>0;x--){
			//d = document.createElement('div');
			//c='<a onclick="als(glob, \'';
			//if(mid!==''){c+='festival_';}
			//c+='battle_monster.php?action=attackDragon'+i[x];
			//c+='&casuser='+u+'&mpool=2';
			//if(mid!==''){c+='&mid='+mid+'&tower='+twr;}
			//c+='\')"><img class="imgButton" src="./ploader.php_files/'+ilnk+'serpent_'+i[x]+'stam_attack.gif"></a>';
			//d.innerHTML=c.replace('serpent_5stam_attack','seamonster_power');
			//b.children[2].insertBefore(d,b.children[2].children[0]);
		//}
	//}

	//if(g.indexOf(mh+'frostdrag') !== -1 || g.indexOf('top_dragon') !== -1 || g.indexOf(mh+'emeralddrag') !== -1 || g.indexOf(mh+'golddrag') !== -1|| g.indexOf(mh+'ancientreddrag') !== -1){
		//if(g.indexOf('>VICTORY!<') !==-1) return;
		//a=gelc('positive',1);
		//if(a.nodeName==='SPAN'){a=gelc('positive',2);}
		//b=a.parentNode;
		//if(b.innerHTML.indexOf('reward_button')!==-1){return;}
		//while(b.children[1].id.indexOf('monsterTicker')!=-1){
			//b.removeChild(b.children[1]);
		//}
		//b.removeChild(b.children[1]);
		//u=b.children[2].children[0].children[0].casuser.value;
			//if(b.children[2].children[0].children[0].mid !==undefined){
				//mid=b.children[2].children[0].children[0].mid.value;
				//if(b.children[2].children[0].children[0].tower !==undefined) twr=b.children[2].children[0].children[0].tower.value;
			//}
		//bqh=b.children[2].children[0].children[0].bqh.value;
		//b.children[2].removeChild(b.children[2].children[0]);
		//b.children[2].removeChild(b.children[2].children[0]);
		//for(x=3;x>0;x--){
			//d = document.createElement('div');
			//c='<a onclick="als(glob, \'';
			//if(mid!==''){c+='festival_';}
			//c+='battle_monster.php?action=attackDragon';
			//if(x===2){c+='5';}
			//if(x===3){c+='10';}
			//c+='&casuser='+u+'&mpool=2';
			//if(mid!==''){c+='&mid='+mid+'&tower='+twr;}
			//c+='\')"><img class="imgButton" src="./ploader.php_files/'+ilnk;if(x===1){c+='seamonster_attack.jpg';}if(x===2){c+='seamonster_power.gif';}if(x===3){c+='serpent_10stam_attack.gif'"></a>';
			//d.innerHTML=c;
			//b.children[2].insertBefore(d,b.children[2].children[0]);
		//}
	//}
//}

}
tools.Monster.monsterBars = function() {
	var _monstername = null, _ret = [];
	// add percentage to top bars
	if ($('#app_body div[style*="nm_bars.jpg"], #app_body div[style*="nm_bars_cross.jpg"]').length > 0) {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"], [src*="nm_orange.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if (_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text().trim() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
				_ret.push(_monstername.text());
			}
		});
	} else {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().parent().parent().find('div:contains("\'s Life"):last, div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if (_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text().trim() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
				_ret.push(_monstername.text());
			}
		});
	}
	return _ret;
};
tools.Monster.defense = function() {
	// add percentage to defense/forcefield/..
	var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]').parent()[0], _defRegs = [
			'^Castle Defense$', '^Ragnarok\'s Glacial Armor$', '^Your Ship\'s Defense$', '^Illvasa, Plateau City\'s Defense$', '^Skaar\'s Mana Forcefield$', '^Party Health\\/Strength$'
	], _defText = $('#app_body div:containsRegex(/' + _defRegs.join('|') + '/):first');
	if (_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
		var _percentage = _defense.style.width.substr(0, 5);
		var _maxHealth = false;
		if (/^Party Health\/Strength$/.test(_defText.text())) {
			_maxHealth = _defText.parent().prev().find('div:first')[0].style.width.substr(0, 5);
			_defText.css('left', 51).text('Party Health ' + _percentage + (_percentage.indexOf('%') > -1 ? '' : '%') + ' / Strength ' + _maxHealth + (_maxHealth.indexOf('%') > -1 ? '' : '%'));
		} else {
			_defText.css('left', 51).text(_defText.text() + '(' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
		}
		return _defText.text();
	}
	return '';
};
tools.Monster.stunBar = function() {
	// add percentage to Cripple...
	var _stun = $('#app_body div > img[src$="nm_stun_bar.gif"]:first');
	if (_stun.length > 0) {
		var _text = _stun.parent().next().children('div:first'), _ret;
		_stun = _stun[0].style.width.substr(0, 5);
		_ret = _text.text() + ': ' + _stun + (_stun.indexOf('%') > -1 ? '' : '%').replace('Need ', '').replace('Fill to ', '').toLowerCase();
		_text.text(_text.text() + ' ' + _stun + (_stun.indexOf('%') > -1 ? '' : '%'));
		return _ret;
	}
	return '';
};
tools.Monster.battleStats = function() {
	// monster stats
	var _bossReg = new RegExp([
			'monster_\\w+_large.jpg',
			'boss_\\w+_large.jpg',
			'boss_\\w+_big.jpg',
			'nm_\\w+_large.jpg',
			'nm_\\w+_large2.jpg',
			'monster_\\w+_large_ca.jpg',
			'seamonster_(?!ship_health)\\w*.jpg',
			'seamonster_dead.jpg', 'dragon_monster_\\w+.jpg',
			'boss_\\w+.jpg',
			'\\w+_large.jpg',
			'\\/monster_(?!health|ca_icon|hod_icon)\\w+.jpg',
			'\\w+_dead.jpg'
	].join('|'));
	$('#app_body table.layout td > div:gt(2) div:not([id][alt][title]) > img:only-child').each(function() {
		if (_bossReg.exec($(this).attr('src')) !== null) {
			$(this).parent('div:first').css('position', 'relative').append('<div id="cageMonsterStats">');
			return false;
		}
	});
	var $this, _attackers = 0, _temp = '', _max = '', _levels, _hod, $stats = $('#cageMonsterStats'), _ownDamage = null, _dmgType = null, _allDamage = {
		Activity : 0,
		dmg : 0,
		def : null
	};
	if (_dmgType === null) {
		var _type = $('td.dragonContainer table tr td:eq(1) table tr:last').find('td:last').text().trim();
		console.log('_type', _type);
		if (_type.indexOf('dmg') !== -1) {
			_dmgType = 'dmg';
			if (_type.indexOf('def') !== -1) {
				_allDamage.def = 0;
			}
		} else {
			_dmgType = 'Activity';
		}
	}
	$('td.dragonContainer table tr td:eq(1) table tr').each(function() {
		$this = $(this);
		if ($this.text() !== '') {
			var _line = $this.find('td:last').text().trim();
			if (isNaN(parseInt(_line.replace(/\D/g, ''))) === false) {
				if ($this.html().indexOf(CastleAge.userId) > -1) {
					_ownDamage = _line;
				}
				if (_dmgType === 'dmg') {
					_line = _line.split('/');
					_allDamage.dmg += parseInt(_line[0].replace(/\D/g, ''));
					if (_allDamage.def !== null) {
						_allDamage.def += parseInt(_line[1].replace(/\D/g, ''));
					}
				} else {
					_allDamage[_dmgType] += parseInt(_line.replace(/\D/g, ''));
				}
			}
			if (/Levels|Heart of Darkness/.test($this.text()) === true) {
				if (_temp !== '') {
					$stats.append(_temp + _attackers + '</span>' + _max + '</div>');
					_attackers = 0;
					_temp = '';
					_max = '';
				}
				_attackers = 0;
				_hod = 'Levels ';
				if (/Levels/.test($this.text()) === true) {
					_max = /\[(\d+)\s+max\]/.exec($this.text());
					_max = _max !== null ? '/' + _max[1] : '';
					_levels = $this.text().match(/\d+-\d+|\d+\+|\d+/);
				} else {
					_hod = 'Heart of Darkness ';
					_levels = '';
					_max = '';
				}
				_temp = '<div><span style="display:inline-block;font-weight:bold;width:125px;">' + _hod + _levels + '</span><span style="display:inline-block;width:25px;text-align:right;">';
			} else {
				_attackers += 1;
			}
		}
	});
	if (_temp !== '') {
		$stats.append(_temp + _attackers + '</span>' + _max + '</div>');
	} else {
		$stats.append('<div><span style="display:inline-block;font-weight:bold;width:125px;">Attackers: </span><span style="display:inline-block;width:25px;text-align:right;">' + _attackers + '</span></div>');
	}
	tools.Monster.statPos('Activity', _allDamage[_dmgType].toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + (_dmgType === 'dmg' ? ' dmg' + (_allDamage.def !== null ? ' / ' + _allDamage.def.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + ' def' : '') : ''));
	if (_ownDamage !== null) {
		tools.Monster.statPos('My activity', _ownDamage, 2);
	}

	if ($('span.target_monster_info').length > 0) {
		var _div = $('span.target_monster_info:first').parent();
		_div.css({
			'top' : -2,
			'zIndex' : 1
		}).parent().parent().prepend(_div);
	}

};
tools.Monster.battleResult = function(_monsterhealth, _defText, _stun) {
	// rearrange attack result
	if ($('div.result').length > 0) {
		// resize Elite Guard boxes
		$('div.result div:textEquals("Elite Guard")').parent().find('div[style*="height:84px"]').css('height', 68);
		$('img[alt="Call to Elite Guard"]').parent().css({
			'height' : 68,
			'overflow' : 'hidden'
		});
		// add monster damage/health/... to result
		$('div.result:has(img[src*="graphics/button_monster_attack_again.gif"]) span.result_body div:last, div.result:contains(" Again!")').append('<div id="MonsterResultDamage"><div>' + _monsterhealth.join('</div><div>') + '</div><div>' + _defText + '</div><div>Your Damage/Activity: ' + $('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').text().trim() + '<div style="text-transform: capitalize;">' + _stun + '</div></div></div>');
		if ($('div.result:contains(" Again!")').length > 0) {
			$('#MonsterResultDamage').css('float', 'none');
		}
	}
};
tools.Monster.battleCTA = function(_monsterpage) {
	var $form = $('form').find('input[alt="Ask for help"]').parents('form:first'), _cta = '', _sieges = [], _dmg = 0;
	// sieges info
	_monsterpage = _monsterpage.replace('guildv2_battle_monster', 'battle_expansion_monster');
	$('img[src*="_siege_small"]').each(function() {
		_sieges.push($(this).parent().parent().text().trim().replace(/\s/g, '').replace(/,/g, '').replace(/dmg/g, '').split('-'));
		_dmg += parseInt(_sieges[_sieges.length - 1][1], 10);
	});
	// answer CTA
	if ($('img[title^="Construct "]').size() === 1 && $form.length === 1) {
		$form = $form.clone();
		var $children = $form.children().not('input[name="bqh"]');
		$form.empty().append($children);
		tools.Monster.statPos('<a id="cageSummonCTA" href="//apps.facebook.com/castle_age/' + _monsterpage + '.php?' + $form.serialize() + '&action=doObjective">Weapons</a> ' + _sieges.length, _dmg.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + ' dmg');
		$('#cageSummonCTA').unbind('click').click(function() {
			tools.Page.loadPage(_monsterpage + '.php?' + $('form:has(div.imgButton > input[alt="Ask for help"]):first').serialize() + '&action=doObjective');
			return false;
		}).hover(function() {
			$(this).text('Assist!');
		}, function() {
			$(this).text('Weapons');
		});
		_cta = '//apps.facebook.com/castle_age/' + _monsterpage + '.php?' + $form.serialize() + '&action=doObjective';
	}
	return _cta;
};
tools.Monster.statPos = function(_text, _html) {
	var _bottom = $('#cageMonsterStats').outerHeight() + 2;
	$('.cageMonsterActivity').each(function() {
		_bottom += $(this).outerHeight() + 2;
	});
	$('#cageMonsterStats').after('<div class="cageMonsterActivity" style="bottom:' + _bottom + 'px"><span style="display:inline-block;font-weight:bold;width:80px;">' + _text + '</span><span style="display:inline-block;float:right;text-align:right;">' + _html + '</span></div>');
};
