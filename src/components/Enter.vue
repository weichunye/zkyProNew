<template>
	<div class="enter">
		<heade></heade>

		<div class="content" style="height: 350px; width: 1200px;">
			<!--menu-left-->
			<div class="menu-left">
				<router-link to="allClassify">
					<p class="menu-top">
						全部分类
						<span></span>
					</p>
				</router-link>
				<div v-for="item in menuList" class="menu-li">
					<p>{{item.ctyName}}</p>
					<em></em>
					<div class="menu-left-box">
						<router-link v-for="itemNew in item.sonList" :to="{path:'/list',query:{categoryId:itemNew.id,categoryName:itemNew.ctyName,ParentName:'首页'}}">
							<span>{{itemNew.ctyName}}</span>
						</router-link>
					</div>
				</div>
			</div>

			<!--menu-left-->
			<!--recommend-->
			<div class="recommend">
				<h3>本站推荐
				<router-link :to="{path:'/typeList',query:{typeId:'isRecommend', categoryName:'推荐',ParentName:'首页'}}"><span>更多</span></router-link>
			</h3>
				<div class="con">
					<router-link v-for="item in recommendedList" :to="{path:'/details',query:{id:item.id,ParentName:'首页'}}">
						<dl>
							<dt><p>{{item.softName}}</p>
   	   					<em v-if="item.isHot==1" class="hot-bg">热</em>
   	   					<em v-if="item.isRecommend==1" class="jian-bg">荐</em>
   	   					<em v-if="item.isChina==1" class="guo-bg">国</em>
   	   						<em v-if="item.isEvaluate==1" class="xin-bg">已评估</em>
   	   							
   	   				</dt>
							<dd>
								<p>{{item.softIntroduce}} ...</p>
							</dd>
						</dl>
					</router-link>

				</div>

			</div>
			<!--//recommend-->
			<!--hotbox-->
			<div class="hotbox">
				<h3>热门软件
				<router-link :to="{path:'/typeList',query:{typeId:'isHot',categoryName:'热门软件',ParentName:'首页'}}"><span>更多</span></router-link>
				</h3>
				<div class="con">
					<router-link v-for="item in hotList" :to="{path:'/details',query:{id:item.id,ParentName:'首页'}}">
						<dl>
							<dt><p><span>{{item.softName}}</span></p> </dt>
							<dd>
								<p>收藏：{{item.collectionNum}}</p>
								<p>下载：{{item.downloadNum}}</p>
								<p>运行：{{item.runNum}}</p>
							</dd>
						</dl>
					</router-link>

				</div>

			</div>
			<!--hotbox-->
		</div>
		<div class="game-banner">
			<router-link target="_blank" :to="'activityGame?id='+activityIngId">
				<button>立即参加</button>
				<!--<h4>
   			2019年5月1日正式开始
   		</h4>-->
			</router-link>

		</div>
		<!--分类应用领域-->
		<div v-for="item in indexSoftList" class="content contype ">
			<h4 class="classfiy">
   			<span></span>
   			{{item.ctyName}}
   			
   		</h4>
			<el-tabs>
				<el-tab-pane v-for="secondItem in item.sonList" :label="secondItem.ctyName">
					<router-link :to="{path:'/list',query:{categoryId:secondItem.id,categoryName:secondItem.ctyName,ParentName:'首页'}}"><span class="more">更多</span></router-link>
					<div class="el-tab-software">
						<router-link v-if="secondItem.softList.length>0" v-for="thitdItem in secondItem.softList" :to="{path:'/details',query:{id:thitdItem.id,ParentName:'首页'}}">
							<dl class="software-box">
								<dt>
		<h3>{{thitdItem.softName}} 	<span v-if="thitdItem.isHot==1" class="hot-bg">热</span>
   	   					<span v-if="thitdItem.isRecommend==1" class="jian-bg">荐</span>
   	   					<span v-if="thitdItem.isChina==1" class="guo-bg">国</span>
   	   						<span v-if="thitdItem.isEvaluate==1" class="xin-bg">信</span></h3>
		<!--<p class="p">
			<span class="lable">很好</span>
				<span class="lable">可以用</span>
		</p>-->
			<p class="p">版本：{{thitdItem.softVersion}}</p>
			<p class="p">License：{{thitdItem.softLicense}}</p>
			<span  v-if="thitdItem.isEvaluate==1" class="pg-ico">已评估</span>
	</dt>
								<dd>{{thitdItem.softIntroduce}}...</dd>
							</dl>
						</router-link>
						<div v-if="secondItem.softList.length==0" class="empty-tit"></div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--分类应用领域-->
		<!--竞赛天地-->
		<div class="content">
			<h4 class="classfiy">
   			竞赛天地
   		</h4>
			<el-tabs>
				<el-tab-pane label="进行中">
					<router-link :to="{path:'/activityList',query:{type:'ing'}}"><span class="more">更多</span></router-link>
					<div class="el-tab-activity">
						<router-link target="_blank" v-for="item in activeListIng" :to="{path:'/activityGame',query:{id:item.id}}">
							<dl class="activity-box">
								<dt>
					<h3>{{item.activityName}}<span v-if="item.status==2" class="gamestar">【正在报名】</span><span v-if="item.status==1" class="gamestar">【敬请期待】</span></h3>
					<p>主办方:  {{item.sponsor}}</p>
					<p class="marT-10">报名时问: {{item.joinStartDate}} 一{{item.joinEndDate}}</p>
					<p>比赛时问: {{item.matchStartDate}} 一{{item.matchEndDate}}</p>
				</dt>
								<dd>
									<button v-if="item.status==2" class="btn-game btn-apply">
							立即报名
						</button>
									<button v-if="item.status==1" class="btn-game btn-end">
							敬请期待
						</button>
									<p v-if="item.status==2">距离报名截止时间还有<span> {{item.surplusDays}}</span> 天</p>
									<em>
							竞赛详情>
						</em>
								</dd>
							</dl>
						</router-link>

					</div>
				</el-tab-pane>
				<el-tab-pane label="已结束">
					<router-link :to="{path:'/activityList',query:{type:'end'}}"><span class="more">更多</span></router-link>
					<div class="el-tab-activity">
						<router-link target="_blank" v-for="item in activeEnd" :to="{path:'/activityGame',query:{id:item.id}}">
							<dl class="activity-box">
								<dt>
					<h3>{{item.activityName}}<span class="gameend">【报名结束】</span></h3>
					<p>主办方:  {{item.sponsor}}</p>
					<p class="marT-10">报名时问: {{item.joinStartDate}} 一{{item.joinEndDate}}</p>
					<p>比赛时问: {{item.matchStartDate}} 一{{item.matchEndDate}}</p>
				</dt>
								<dd>
									<button class="btn-game btn-end">
							立即报名
						</button>
									<em>
							竞赛详情>
						</em>
								</dd>
							</dl>
						</router-link>
					</div>
				</el-tab-pane>

			</el-tabs>

		</div>
		<!--竞赛天地-->

		<foot></foot>
	</div>
</template>

<script>
	/*	window.addEventListener('message',function(event) {    
			console.log("event.origin",event.origin)
			console.log('received response:',event.data);  
			
	    if(event.origin !== 'http://192.168.1.21:8090') return; //这个判断一下是不是我这个域名跳转过来的    
	    console.log('received response:',event.data);    
	},false); 

	*/

	import heade from './header.vue';
	import foot from './footer.vue';
	import baseUrl from '../../config/index.js'
	export default {
		name: 'Enter',
		components: {
			heade,
			foot

		},
		data() {
			return {
				menuList: [],
				hotList: [], //热门推荐
				recommendedList: [], //推荐列表
				indexSoftList: [],
				activeListIng: [],
				activeEnd: [],
				activityIngId: '', //正在进行的竞赛

			}
		},
		mounted() {
			//获取菜单
			var _this = this;
			console.log("newtoken", this.token)

			//获取菜单列表
			_this.getListData('/web/soft/softCtyAllList', 'menuList', _this.mentList)
			_this.activityIng()
			//获取热门软件
			var params = new URLSearchParams();
			params.append("page", 1);
			params.append("limit", 5);
			_this.axios.post(baseUrl.baseUrl + '/web/soft/queryHotSoftListByCondition', params)
				.then(function(response) {
					_this.hotList = response.data.page.list;
					console.log("_this.hotList", response)
				})
			//获取推荐列表
			var paramscom = new URLSearchParams();
			paramscom.append("page", 1);
			paramscom.append("limit", 6);
			paramscom.append("isRecommend", 1);
			_this.axios.post(baseUrl.baseUrl + '/web/soft/querySoftListByCondition ', paramscom)
				.then(function(response) {
					_this.recommendedList = response.data.page.list;
					console.log("_this.recommendedList", _this.recommendedList)
				})

			//首页所有类别展示
			var params1 = new URLSearchParams();
			params1.append("sonCtyNum", 5);
			params1.append("countNum", 4);
			console.log("params", params1);

			_this.axios.post(baseUrl.baseUrl + '/web/soft/queryIndexCtySoftList', params1)
				.then(function(response) {
					_this.indexSoftList = response.data.list;
					console.log("indexSoftList", _this.indexSoftList)
					_this.$nextTick(function() {
						//背景
						$('.contype').each(function(index, item) {
							var newClass = 'contentbg' + (index + 1);
							console.log("newClass00000", newClass)
							$(item).addClass(newClass)
						})
					})

				})

			//活动列表
			//活动正在报名展示
			_this.activeDataList('activeListIng', '/web/activity/queryJoinActivityListByCondition', '1,2')
			//活动已结束展示
			_this.activeDataList('activeEnd', '/web/activity/queryActivityListByCondition ', '3')

		},
		methods: {
			//获取信息列表
			getListData: function(url, ele, fun) {
				var _this = this;
				_this.axios.post(baseUrl.baseUrl + url)
					.then(function(response) {
						_this[ele] = response.data.list;
						if(fun) {
							fun()
						}

					})
			},
			mentList: function() {
				var _this = this;
				_this.$nextTick(function() {
					$('.menu-li').each(function(index, item) {
						$(item).hover(function() {
							$('.menu-left-box').eq(index).show()
							$('.menu-li div').find('menu-left-box').show()
						}, function() {
							$('.menu-left-box').hide()
						});
					})
				})
			},
			//获取当前正在进行中活动
			activityIng: function() {
				var _this = this;
				_this.axios.get(baseUrl.baseUrl + '/web/activity/config/2')
					.then(function(response) {
						if(response.data.config) {
							_this.activityIngId = response.data.config.paramValue;
							console.log("	_this.activityIngId", _this.activityIngId)
						}

					})
					.catch(function(error) {
						console.log(error);
					})
			},
			activeDataList: function(ele, url, satus) {
				console.log("ele", ele)
				var _this = this;
				var params = new URLSearchParams();
				params.append("page", 1);
				params.append("limit", 4);
				params.append("status", satus);
				_this.axios.post(baseUrl.baseUrl + url, params)
					.then(function(response) {
						_this[ele] = response.data.page.list;
						console.log("参赛列表", _this[ele])

					})

			}

		}
	}
</script>

<style>
	.enter{background: #fff;}
	.enter .content {
		overflow: visible;
		margin: 10px auto 10px;
		padding: 10px;
		width: 1180px;
		border-radius: 2px;
	}
	
	.enter .content .menu-left {
		float: left;
		width: 190px;
		height: 350px;
		border-radius: 5px;
		background: #4794e4;
	}
	
	.enter .contentbg1 {
		padding-bottom: 15px;
		/*background: #faf7f7;*/
	}
	
	.enter .contentbg2 {
		padding-bottom: 15px;
		/*background: #f8f8f2;*/
	}
	
	.enter .contentbg3 {
		padding-bottom: 15px;
		/*	background: #f4f9f3;*/
	}
	
	.enter .contentbg4 {
		padding-bottom: 15px;
		/*background: #f5f6f9;*/
	}
	
	.enter .contentbg5 {
		padding-bottom: 15px;
		/*background: #fbf8fb;*/
	}
	
	.enter .content .menu-left .menu-top {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		background: #4081b1;
		border-radius: 5px 5px 0 0;
	}
	
	.enter .content .el-tabs--border-card {
		border: none;
		box-shadow: none;
		background: none;
	}
	
	.enter .content .menu-left .menu-li {
		position: relative;
		display: block;
		padding: 6px 15px 6px 25px;
		font-size: 14px;
		height: 36px;
		line-height: 36px;
		color: #fff;
	}
	
	.enter .content .menu-left .menu-li:hover {
		background: #de482f;
	}
	
	.enter .content .menu-left .menu-li p {
		float: left;
		font-size: 14px;
		line-height: 36px;
		color: #fff;
	}
	
	.enter .content .menu-left .menu-li em {
		display: block;
		float: right;
		margin-top: 10px;
		width: 6px;
		height: 12px;
		background: url(../assets/icon/arrow.png) no-repeat;
	}
	
	.menu-left-box {
		display: none;
		position: absolute;
		left: 190px;
		top: 0;
		padding: 20px 10px;
		width: 600px;
		background: #eef5f9;
		z-index: 2;
	}
	
	.menu-left-box span {
		float: left;
		margin: 0px 10px;
		padding: 3px;
		font-size: 13px;
		color: #666;
		line-height: 18px;
	}
	
	.menu-left-box span:hover {
		background: #e26556;
		color: #fff;
	}
	
	.enter .content .recommend {
		margin: 0 10px;
		float: left;
		width: 700px;
	}
	
	.enter .content .recommend h3,
	.enter .content .hotbox h3 {
		display: block;
		width: 100%;
		height: 50px;
		font-size: 16px;
		color: #666666;
		line-height: 50px;
	}
	
	.enter .content .recommend h3 span,
	.enter .content .hotbox h3 span {
		margin-right: 10px;
		float: right;
		font-size: 14px;
		color: #d2525b
	}
	
	.enter .content .recommend .con {
		overflow: hidden;
		width: 700px;
		height: 296px;
		/*background: #f4f4f4;*/
		border-radius: 2px;
		border-right: 1px dashed #dedede;
	}
	
	.enter .content .recommend .con dl {
		float: left;
		padding: 10px 15px 5px 10px;
		width: 319px;
		/*border-right: 1px  dashed #dedede;*/
	}
	
	.enter .content .recommend .con dl:hover p,
	.enter .content .recommend .con dl:hover span {
		color: #ba7a73;
	}
	
	.enter .content .recommend .con dl dt {
		overflow: hidden;
		width: 100%;
	}
	
	.enter .content .recommend .con dl dt p {
		float: left;
		width: 100%;
		overflow: hidden;
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		color: #4598be;
	}
	
	.enter .content .recommend .con dl dt em {
		float: left;
		margin-right: 10px;
		padding: 0 4px;
		height: 18px;
		font-size: 12px;
		font-style: normal;
		text-align: center;
		line-height: 18px;
		border-radius: 3px;
	}
	
	.enter .content .recommend .con dl dd p {
		overflow: hidden;
		display: block;
		width: 100%;
		height: 40px;
		font-size: 13px;
		color: #666;
		line-height: 20px;
		text-indent: 12px;
	}
	
	.enter .content .hotbox {
		float: left;
		width: 290px;
	}
	
	.enter .content .hotbox .con {
		padding-top: 15px;
		width: 100%;
		height: 333px;
		/*background: #f4f4f4;*/
		border-radius: 2px;
	}
	
	.enter .content .hotbox .con dl {
		margin: 0 10px;
		padding: 5px 10px;
		border-bottom: 1px dashed #dedede;
	}
	
	.enter .content .hotbox .con dl:hover p,
	.enter .content .hotbox .con dl:hover span {
		color: #ba7a73;
	}
	
	.enter .content .hotbox .con dl dt p {
		color: #999;
		font-size: 14px;
		line-height: 24px;
	}
	
	.enter .content .hotbox .con dl dt p span {
		font-weight: bold;
		color: #666;
	}
	
	.enter .content .hotbox .con dl dd {
		overflow: hidden;
	}
	
	.enter .content .hotbox .con dl dd p {
		float: left;
		margin-right: 10px;
		font-size: 12px;
		line-height: 20px;
		color: #b1b0b0;
	}
	
	.enter .game-banner {
		position: relative;
		margin: 10px auto;
		width: 1200px;
		height: 158px;
		background: url(../assets/bg/index_game_banner.jpg) no-repeat;
		cursor: pointer;
	}
	
	.enter .game-banner button {
		position: absolute;
		left: 539px;
		top: 104px;
		width: 174px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border-radius: 30px;
		font-size: 16px;
		color: #d6050b;
		letter-spacing: 2px;
		background: #f9f709;
		cursor: pointer;
	}
	
	.enter .game-banner h4 {
		position: absolute;
		right: 20px;
		top: 100px;
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 1px;
		color: #fff;
	}
	
	.enter .classfiy {
		position: relative;
		margin-top: 10px;
		padding-top: 5px;
		width: 100%;
		line-height: 40px;
		font-size: 18px;
		font-weight: normal;
		color: #666;
	}
	
	.enter .classfiy span {
		display: inline-block;
		margin: 10px 5px 0 0;
		height: 14px;
		width: 4px;
		background: #e26556;
	}
	
	.enter .el-tab-pane .more {
		position: absolute;
		right: 10px;
		top: -35px;
		font-size: 14px;
		line-height: 14px;
		color: #e26556;
		z-index: 200;
	}
	
	.enter .el-tabs__content {
		position: relative;
		overflow: visible;
	}
	
	.enter .el-tab-software {
		min-height: auto;
	}
	
	.enter .activity-box {
		width: 1180px;
	}
	
	.enter .activity-box dt {
		width: 780px;
	}
</style>