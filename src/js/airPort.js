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
		// ues IntersectionObserver
		//set callback
		// const observerCallback = (entries) => {
			// entries.forEach(item => {
				/*
				* item.time当可视状态变化时，状态发送改变的时间戳,ms
				* item.rootBounds：根元素矩形区域的信息，即为getBoundingClientRect方法返回的值
				* item.boundingClientRect：目标元素的矩形区域的信息。
				* item.intersectionRect：目标元素与视口（或根元素）的交叉区域的信息.
				* item.isIntersecting：目标元素与根元素是否相交
				* item.intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例。
				* item.target：目标元素。
				*/	
			// })
		// }

		// set options 
		// const options = {
			//
			// root: null,
			// 
			// rootMargin: '0px 0px 0px 0px',
			//（0~1）
			// threshold: 1
		// };

		//取得待觀察元素
		let lazy = this.$refs.lazyload;
		console.log(lazy);

		const option = {
			threshold: 1
		};
		const callback = (entries, observe) => {
			console.log('entries---',entries);
			console.log('observe---',observe);
		};
		const observer = new IntersectionObserver(callback, option);
		observer.observe(lazy);





		const navbtn = document.querySelector(".navBtn");

		navbtn.addEventListener("click", (e) => {
			const navUl = document.querySelector(".navUl");
			e.target.tagName === "H1" ? navUl.classList.toggle("showNav") : "";
		});

		this.getAirPort();
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