<template>
	<div class="typeList">
		<searchTop></searchTop>
		<!--面包屑-->
		<div class="crumbs">
			<router-link :to="{path:'/'}"><span>首页</span></router-link>
			<span>&nbsp;&nbsp;>&nbsp;</span>
			<span @click="back">{{parentNamenew}}</span><span v-if="parentNamenew">&nbsp;&nbsp;>&nbsp;</span>
			<span>{{categoryName}} </span>

		</div>
		<!--//面包屑-->

		<!--content-->
		<div class="content" style="margin-top: 20px;">
			<h2>{{categoryName}}</h2>
			<div class="el-tab-software">
				<router-link v-if="softData.length>0" v-for="thitdItem in softData" :to="{path:'/details',query:{id:thitdItem.id,ParentName:categoryName}}">
					<dl class="software-box">
						<dt>
			<h3>{{thitdItem.softName}} 	<span v-if="thitdItem.isHot==1" class="hot-bg">热</span>
		   					<span v-if="thitdItem.isRecommend==1" class="jian-bg">荐</span>
		   					<span v-if="thitdItem.isChina==1" class="guo-bg">国</span>
		   						<!--<span v-if="thitdItem.isEvaluate==1" class="xin-bg">已评估</span>--></h3>
<!--			<p class="p">
				<span class="lable">很好</span>
					<span class="lable">可以用</span>
			</p>-->
				<p class="p">版本：{{thitdItem.softVersion}}</p>
				<p class="p">License：{{thitdItem.softLicense}}</p>
				<span  v-if="thitdItem.isEvaluate==1" class="pg-ico">已评估</span>
		</dt>
						<dd>{{thitdItem.softIntroduce}}</dd>
						<dd class="dd">
							<span class="span spanbg">{{thitdItem.programmingLanguage}}</span> <span class="span">{{thitdItem.softVersion}}</span>
							<!--<span class="span">{{thitdItem.userInterface}}</span>--><span class="span"> {{thitdItem.opensourceType}}</span><span class="span" v-if="thitdItem.operatingSystem"> {{thitdItem.operatingSystem}}</span><span class="spantime">{{thitdItem.createTime.substring(0, 10)}}</span><span class="num">{{thitdItem.browseNum}}人浏览</span>
						</dd>
					</dl>
				</router-link>
				<div v-if="softData.length==0" class="empty-tit"></div>
			</div>

			<el-pagination layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="totalPage" :current-page.sync="pageNum" :page-size="limit">
			</el-pagination>

		</div>
		<!--//content-->

		<foot></foot>
	</div>
</template>

<script>
	import searchTop from './searchTop.vue';
	import foot from './footer.vue';
	import baseUrl from '../../config/index.js'

	export default {
		name: 'typeList',
		components: {
			foot,
			searchTop

		},
		data() {
			return {
				softData: [],
				totalPage: 0,
				limit: 4,
				pageNum: 1,
				categoryName: '',
				parentNamenew: '',
				ParentName: ''

			}
		},
		mounted() {
			var _this = this;
			_this.getList();
			_this.categoryName = _this.$route.query.categoryName;
			_this.parentNamenew = _this.$route.query.ParentName == "首页" ? '' : _this.$route.query.ParentName;

		},
		methods: {
			//获取信息
			getList: function() {
				var _this = this;
				var typeId = _this.$route.query.typeId
				var isHot = 0;
				var isRecommend = 0;
				var params = new URLSearchParams();
				var newType;
				if(typeId == 'isHot') {
				/*	params.append("isHot", 1);*/
					newType=1;
				}
				if(typeId == 'isRecommend') {
					/*params.append("isRecommend", 1);*/
					newType=2;
				}
				params.append("type", newType);
				params.append("page", _this.pageNum);
				params.append("limit", _this.limit);
				_this.axios.post(baseUrl.baseUrl + '/web/soft/querySoftListByConditionForBrowseNum', params)
					.then(function(response) {
						_this.softData = response.data.page.records;
						_this.totalPage = response.data.page.total;
						_this.$nextTick(function() {
							var curJ = $('.software-box')
							$(curJ).eq(curJ.length - 1).css('border', '0px solid #fff')
						})
					})
			},
			back: function() {
				this.$router.go(-1); //返回上一层
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getList();
			},

		}
	}
</script>

<style>
	.typeList {
		background: #f8f8f8;
	}
	
	.typeList .content {
		background: #fff;
	}
	
	.typeList .content h2 {
		padding-top: 10px;
		width: 100%;
		font-size: 16px;
		color: #666;
		line-height: 40px;
		text-indent: 10px;
		font-weight: normal;
	}
	
	.typeList .min-height {
		padding: 5px 0 15px;
		min-height: 500px;
	}
	
	.typeList .content .left-box {
		float: left;
		padding: 7px 0;
		width: 960px;
		background: #fff;
	}
	
	.typeList .content .left-box li {
		padding: 5px 10px 10px;
		width: 940px;
		border-bottom: 1px solid #dedede;
	}
	
	.typeList .content .left-box li h4 {
		width: 100%;
		font-size: 16px;
		color: #666;
		line-height: 46px;
		font-weight: normal;
	}
	
	.typeList .content .left-box li p {
		overflow: hidden;
		width: 100%;
	}
	
	.typeList .content .left-box li p span {
		display: inline-block;
		float: left;
		margin-right: 20px;
		color: #999;
		font-size: 14px;
		line-height: 26px;
		cursor: pointer;
	}
	
	.typeList .content .left-box li p span:hover {
		color: #b81027;
	}
	
	.typeList .content .right-box {
		float: right;
		width: 230px;
	}
	
	.typeList .content .right-box .num-list {
		padding: 10px 0;
		width: 100%;
		background: #fff;
	}
	
	.typeList .content .right-box .num-list h3 {
		width: 100%;
		line-height: 36px;
		font-size: 16px;
		font-weight: normal;
		color: #666;
		text-indent: 10px;
		border-bottom: 1px solid #dedede;
	}
	
	.typeList .content .right-box .num-list ul {
		margin: 5px;
	}
	
	.typeList .content .right-box .num-list ul li {
		overflow: hidden;
		line-height: 30px;
	}
	
	.typeList .content .right-box .num-list ul li span {
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
	
	.typeList .content .right-box .num-list ul li .span1 {
		background: #e76112;
	}
	
	.typeList .content .right-box .num-list ul li p {
		float: left;
		margin-left: 10px;
		color: #666;
	}
	
	.typeList .content .right-box .game-banner {
		margin-top: 10px;
		width: 230px;
		height: 218px;
		background: url(../assets/banner/game_banner.jpg) no-repeat;
	}
</style>