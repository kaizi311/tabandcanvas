(function(){

		//rem是根据html的font-size来计算,1rem=1倍 html的font-size
		//em是根据标签的父标签来算
		function jsize(){
			var window_w = 0; //获取屏幕宽度,兼容各大浏览器的写法
			if(window.innerWidth){ //如果存在对象,
				window_w = window.innerWidth;
			}else if(  document.body&&document.body.clientWidth      ){
				window_w = document.body.clientWidth;
			}
			//var window_w = window.innerWidth || document.body&&document.body.clientWidth?document.body.clientWidth:0; //另外一种写法

			var base_width = 750;//设计稿基础尺寸 / 2
			//图标要求在750下,是70px , width:7rem;
			var base_rempx = 100; //在750px的情况下,1rem要求=100px(为了好计算)
			//不能设置10的原因是某些浏览器只能识别最小12px

			var scaleSize = base_rempx * (window_w/base_width);
			//屏幕宽度除以 基础宽度 得出应该要缩放的倍数
			//再乘以期望1rem的像素值,得出最终要设置的font-size

			var html = document.querySelector('html'); //设置html标签的font-size
			html.style.fontSize = scaleSize+'px';

			document.querySelector('body').style.fontSize = '16px';
			//恢复body的文本尺寸

			//document.getElementById('debug').innerHTML = window_w;
			
		}
		//jsize(); //立即执行
		window.addEventListener('resize',function(){//重设屏幕宽度时执行
			jsize(); //重设时执行
		});
		window.addEventListener('load',function(){//当window加载完毕后执行
			jsize(); 
		});


})();


