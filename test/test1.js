/* 创业天使-1.0.0 2016-06-01 */
/* description : 你消费，你创业，你成功，你快乐 */
/* author : MrChen2015 */
/* license : MIT */
$(function(){new Swiper(".banner",{loop:!0,autoplay:3e3,speed:300})}),$(function(){new Swiper(".banner",{loop:!0,autoplay:3e3,speed:300});$(".container").dropload({scrollArea:window,loadDownFn:function(a){$.ajax({url:"http://cq.cuohela.com/001/more.php",dataType:"jsonp",jsonp:"successCallback",success:function(b){for(var c=b.length;c>=0;c--)$(".container").append('<div class="listitem"><a href="#"><img src="'+b[c].src+'" alt="" class="propic"><h4 class="name">'+b[c].name+'</h4><p class="abstract">'+b[c]["abstract"]+'</p><p class="price">'+b[c].price+'</p><span class="buycar"><img src="'+b[c].src2+'"></span></a></div>'),a.resetload();a.resetload()},error:function(a,b){alert("Ajax error!")}})}}),$(".mask").remove()});