<template>
  <div class="allClassify">
  	<searchTop></searchTop>
  	<!--面包屑-->
  		<div class="crumbs">
  		<span @click="back">首頁 </span><span>&nbsp;&nbsp;>&nbsp;</span>
  		 <span>全部分类 </span>
  		</div>
  			<!--//面包屑-->
  	<!--content-->
  	<div class="content">
  		<!--left-box-->
  	<div class="left-box">
  		<ul>
  			<li  v-for="item in mentListL">
  			<h4>{{item.label}}</h4>
  			<div>
        <p v-for="secItem in item.children" :style="{'width':secItem.children.length>0?'100%':'auto','float':secItem.children.length>0?'none':'left'}">
          <router-link   :to="{path:'/list',query:{categoryId:secItem.value,categoryName:secItem.label,ParentName:'全部分类'}}">
            <span  class="spanname">{{secItem.label}} <em v-if="secItem.children.length">|</em> </span>
          </router-link>
				<router-link  v-for="thirdItem in secItem.children" :to="{path:'/list',query:{categoryId:thirdItem.value,categoryName:thirdItem.label,ParentName:'全部分类'}}">
				<span >{{thirdItem.label}}</span>
				</router-link>
        </p>


  			</div>
  			</li>

  		</ul>

  	</div>
  	    <!--//left-box-->
  	    <!--right-box-->
  	   <div class="right-box">
  	   	<div class="num-list">
  	   		<h3>推荐软件：	<router-link :to="{path:'/typeList',query:{typeId:'isHot',categoryName:'推荐软件',ParentName:'全部分类'}}"><span>更多</span></router-link></h3>
  	   		<router-link v-for="item in hotList" :to="{path:'/details',query:{id:item.id}}">
  	   			<dl >
					<dt><span>{{item.softName}}</span> </dt>
					<dd>收藏: <span>{{item.collectionNum}} </span> 下载: <span> {{item.downloadNum}}</span>运行： <span>{{item.runNum}}</span></dd>
				</dl>
				</router-link>
  	<!--   		<ul>
  	   			<li>
  	   				<span class="span1">1</span>
  	   				<p>软件111</p>
  	   			</li>

  	   		</ul>-->

  	   	</div>
  	   	<router-link target="_blank" :to="'activityGame?id='+activityIngId">
  	   	<div class="game-banner">

  	   	</div>
  	   	</router-link>


  	   </div>
  	     <!--//right-box-->
  	</div>


   <foot></foot>
  </div>
</template>

<script>
	import searchTop from './searchTop.vue';
		import foot from './footer.vue';
		import baseUrl from '../../config/index.js'
export default {
  name: 'allClassify',
  components: {
			foot,
			searchTop

		},
  data () {
    return {
		mentListL:[],
		hotList: [],
		activityIngId:'',



    }
  },
  mounted(){
	  var _this=this;
	  _this.getListData()
	  _this.activityIng()



    //获取推荐列表
    var paramscom = new URLSearchParams();
    paramscom.append("page", 1);
    paramscom.append("limit", 8);
    paramscom.append("isRecommend", 1);
    _this.axios.post(baseUrl.baseUrl + '/web/soft/querySoftListByCondition ', paramscom)
      .then(function(response) {
        _this.hotList = response.data.page.list;
     console.log("recommendedList",_this.recommendedList)
      })
			//获取热门软件

  },
   methods: {
   	   	//获取信息列表
   	getListData:function(){
	var _this=this;
   	_this.axios.post(baseUrl.baseUrl+'/web/soft/softCtyAllList')
   	.then(function(response){
   		_this.mentListL=response.data.list;
		console.log("1111",_this.mentListL)


   	})
   	},
   		//获取当前正在进行中活动
   		activityIng: function() {
				var _this = this;
				_this.axios.get(baseUrl.baseUrl + '/web/activity/config/2')
					.then(function(response) {
					_this.activityIngId=response.data.config.paramValue;
					console.log("	_this.activityIngId",	_this.activityIngId)

					})
					.catch(function(error) {
						console.log(error);
					})
			},
   	back:function(){
   		this.$router.go(-1);//返回上一层
   	},
   }
}
</script>

<style>
	.allClassify{
	background: #f8f8f8;
	}

	.allClassify .content{

	}
	.allClassify .min-height{
		padding: 5px 0 15px;
		min-height: 500px;
	}
	.allClassify .content .left-box{
		float: left;
		padding: 7px 0;
		width: 960px;
		background: #fff;
	}
	.allClassify .content .left-box li{
		padding: 5px 10px 10px;
		width: 940px;
	}
	.allClassify .content .left-box li h4{
		width: 100%;
		font-size: 18px;
		color: #666;
		line-height: 46px;
		font-weight: normal;
	}
	.allClassify .content .left-box li div{
		overflow: hidden;
		width: 100%;
	}
  .allClassify .content .left-box li div p{
    margin: 5px 10px 5px 0;
    padding: 5px 10px;
    overflow: hidden;
    border: 1px #dedede dashed;
    box-sizing: content-box;
    box-sizing: border-box;
  }
	.allClassify .content .left-box li p span{
		display: inline-block;
    margin: 0 10px;
		float: left;
		color: #999;
		font-size: 14px;
		line-height: 20px;
		cursor: pointer;
	}
  .allClassify .content .left-box li p em{
    margin-left: 5px;
    font-style: normal;
  }
  .allClassify .content .left-box li p .spanname{
    color: #666;
  }
	.allClassify .content .left-box li p span:hover{
		color: #ba7a73;
	}
	.allClassify .content .right-box{
		float: right;
		width: 230px;
	}
	.allClassify .content .right-box .num-list{
		padding: 10px 0;
		width: 100%;
		background: #fff;
	}
	.allClassify .content .right-box .num-list h3{
		display: block;
		overflow: hidden;
		width: 100%;
		line-height: 36px;
		font-size: 16px;
		font-weight: normal;
		color: #666;
		text-indent: 10px;
		border-bottom: 1px solid #dedede;
	}
	.allClassify .content .right-box .num-list h3 span{
		margin-right: 10px;
    float: right;
    font-size: 14px;
    color: #d2525b;
	}
	.allClassify .content .right-box .num-list h3 a{
		float: right;
		display: inline-block;
	}
	.allClassify .content .right-box .num-list ul{
		margin: 5px;
	}
	.allClassify .content .right-box .num-list ul li{
		overflow: hidden;
		line-height: 30px;

	}
	.allClassify .content .right-box .num-list ul li span{
		float: left;
		margin: 7px 0 0 10px;
		width: 26px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		color: #fff;
		background: #7c7c7c;
	}
	.allClassify .content .right-box .num-list ul li .span1{
		background: #e76112;
	}

	.allClassify .content .right-box .num-list ul li p{
		float: left;
		margin-left: 10px;
		color: #666;
	}
	.allClassify .content .right-box .game-banner{
		margin-top: 10px;
		width: 230px;
		height: 218px;
		background: url(../assets/banner/game_banner.jpg) no-repeat;
	}
	.allClassify dl {
		margin: 8px;
		color: #333;
		cursor: pointer;
	}

	.allClassify dl:hover span,
	.allClassify dl:hover dd {
		color: #ba7a73;
	}

	.allClassify dl dt {
		font-size: 14px;
		line-height: 26px;
	}

	.allClassify dl dt span {
		display: block;
		width: 220px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}

	.allClassify dl dd {
		font-size: 12px;
		color: #b3b5b3;
	}

	.allClassify dl dd span {
		margin: 0 10px 0 5px;
		color: #c0c1c5;
	}

</style>
