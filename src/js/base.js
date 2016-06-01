$(function(){
    var mySwiper = new Swiper('.banner',{
      loop: true,
      autoplay : 3000,
      speed:300});
    

    $('.container').dropload({
    scrollArea : window,
    loadDownFn : function(me){
        $.ajax({
            // type: 'GET',
            url: 'http://cq.cuohela.com/001/more.php',
            dataType: 'jsonp',
            jsonp: "successCallback",
            success: function(data){            	
for (var i = data.length;i >= 0; i--) {
                	$(".container").append('<div class="listitem"><a href="#"><img src="'+data[i].src+'" alt="" class="propic"><h4 class="name">'+data[i].name+'</h4><p class="abstract">'+data[i].abstract+'</p><p class="price">'+data[i].price+'</p><span class="buycar"><img src="'+data[i].src2+'"></span></a></div>');
                me.resetload();
                }                // 每次数据加载完，必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                // 即使加载出错，也得重置
                
               
            }
        });
    }
	});

	$(".mask").remove();

	});
  		

