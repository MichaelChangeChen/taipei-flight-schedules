import AirPortHeader from '@/components/view/AirPortHeader.vue'
import AirPortLoader from '@/components/view/AirPortLoader.vue'
import dataList from '@/../public/datas/lineList.json'
import airCompanyEng from '@/../public/datas/airCompanyEng.js'
import airCompanyCh from '@/../public/datas/airCompanyCh.js'
import moment from 'moment'

export default
{
	components:{
		AirPortHeader,
		AirPortLoader
	},
	data(){
		return {
			moment,
			lineList: dataList,
			isLoadList: [],
			infiniteList: []
		}
	},
	mounted(){
		this.getAirPort();
		this.textIntersectionObserver();
		this.infiniteIntersectionObserver();
		this.holdNavbar();
	},
	methods: {
		getAirPort(){
			this.$http.get('https://ptx.transportdata.tw/MOTC/v2/Air/FIDS/Airport/Departure/TPE?%24top=200&%24format=JSON')
			.then((response) => {
				this.lineList = response.data;
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		textIntersectionObserver(){
			let texts = document.querySelectorAll('.lazyload');
			const textObserverOption = {
				root: null,
				rootMargin: '-50px 0px -50px 0px',
				threshold: 0.1
			};
			const holdTextLazyLoad = entries => {
				entries.forEach(entry => {
					texts.forEach((el,index) => {
						if(entry.target === el){
							if(!entry.isIntersecting){
								return this.isLoadList[index] = false;
							}
							this.isLoadList[index] = true;
						}
					})
				})
			};
			let textObserver = new IntersectionObserver(holdTextLazyLoad, textObserverOption);
			texts.forEach(el => textObserver.observe(el));
		},
		infiniteIntersectionObserver(){
			let infiniteObserver = document.querySelector('.hold-observe');
			let loader = document.querySelector('.page-loading');
			let count = 20;
			let isOverList;
			const cardsObserverOption = {
				root: null,
				rootMargin: '0px 0px -100px 0px',
				threshold: 0.1
			};
			const holdCardsScroll = (entries) => {
				if(!entries[0].isIntersecting){
					return loader.style.display = 'none';
				}
				loader.style.display = 'block';
				setTimeout(()=>{
					this.infiniteList = this.lineList.filter((el,index) => {
						return isOverList = index < count
					})
					if(isOverList){
						loader.style.display = 'none';
						cardsObserver.unobserve(infiniteObserver);
					}
					count += 20;
				},500);
			};
			let cardsObserver = new IntersectionObserver(holdCardsScroll, cardsObserverOption);
			cardsObserver.observe(infiniteObserver);	
		},
		remarkStyle(departure) {
			if(departure.includes("出發")){
				return 'remark'
			}
			if(departure.includes("取消")){
				return 'cancelStyle'
			}
			if(departure.includes("準時")){
				return 'intimeStyle'
			}
			if(departure.includes("客機載貨")){
				return 'goodsAir'
			}
			if(departure.includes("時間更改")){
				return 'changeTime'
			}
		},
		airRename(name){
			let companyName;
			airCompanyEng.forEach((en) => {
			if (name === en) {
				let num = airCompanyEng.indexOf(en);
				airCompanyCh.forEach((ci) => {
				num === airCompanyCh.indexOf(ci) ? (companyName = ci) : 'undefined';
				});
			}
			});
			return companyName
		},
		holdNavbar(){
			const navbtn = document.querySelector(".navBtn");
			navbtn.addEventListener("click", (e) => {
				const navUl = document.querySelector(".navUl");
				e.target.tagName === "H1" ? navUl.classList.toggle("showNav") : "";
			});
		}
	}
}