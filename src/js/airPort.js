import Header from '@/components/view/AirPortHeader.vue'
import dataList from '@/datas/lineList.json'
import airCompanyEng from '@/datas/airCompanyEng.js'
import airCompanyCh from '@/datas/airCompanyCh.js'
import moment from 'moment'

export default
{
	components:{
		Header
	},
	data(){
		return {
			moment,
			lineList: dataList,
			isLazyLoad: []
		}
	},
	mounted(){
		// ues IntersectionObserver
		let lazy = document.querySelectorAll('.lazyload');
		const option = {
			root: null,
			rootMargin: '-50px 0px -50px 0px',
			threshold: 0.1
		};
		const callback = entries => {
			entries.forEach(entry => {
				lazy.forEach((el,index) => {
					if(entry.target === el){
						if(!entry.isIntersecting){
							return this.isLazyLoad[index] = false;
						}
						this.isLazyLoad[index] = true;
					}
				})
			})
		};
		let observer = new IntersectionObserver(callback, option);

		lazy.forEach(el =>{
			observer.observe(el);
		});

		//  Navbar here
		const navbtn = document.querySelector(".navBtn");
		navbtn.addEventListener("click", (e) => {
			const navUl = document.querySelector(".navUl");
			e.target.tagName === "H1" ? navUl.classList.toggle("showNav") : "";
		});

		// get api
		this.getAirPort();
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
		}
	}
}