import Header from '@/components/view/AirPortHeader.vue'
import dataList from '@/datas/lineList.json'
import airCompanyEng from '@/datas/airCompanyEng.js'
import airCompanyCh from '@/datas/airCompanyCh.js'

export default
{
	components:{
		Header
	},
	data(){
		return {
			lineList: dataList,
			textPageItem: {
				textActive1: 240,
				textActive2: 490,
				textActive3: 600,
				textActive4: 740,
				textActive5: 920,
				textActive6: 1000
			},
			windowScrollY: null
		}
	},
	mounted(){
		const navbtn = document.querySelector(".navBtn");

		navbtn.addEventListener("click", (e) => {
			const navUl = document.querySelector(".navUl");
			e.target.tagName === "H1" ? navUl.classList.toggle("showNav") : "";
		});

		// this.getAirPort();
		this.getWindowHeight();
	},
	methods: {
		getWindowHeight(){
			window.addEventListener("scroll", () => {
				this.windowScrollY = window.scrollY;
			});
		},
		getTextShow(item){
			return this.windowScrollY >= item
		},
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