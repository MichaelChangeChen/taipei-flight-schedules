<template>
	<AirPortHeader />
	<section>
		<div class="black">
			<div class="videoBlock">
				<div class="topBlobk"></div>
				<div class="bottomBlock"></div>
				<video
					class="flightVideo"
					src="@/../public/video_15mb.mp4"
					autoplay
					loop
					muted>
				</video>
			</div>
			<div class="head">
				<div class="wind1"></div>
				<div class="wind2"></div>
				<div class="wind3"></div>
				<h2>Leave Covid-19 Along</h2>
				<h1>And Start Your Trip!</h1>
			</div>
		</div>
		<div class="textPage">
			<h1 class="lazyload " :class="{ 'textShow1': isLoadList[0] }">
				First
			</h1>
			<h4 class="lazyload" :class="{ 'textShow2': isLoadList[1] }">
				We Just Have To Know
			</h4>
			<h3 class="lazyload" :class="{ 'textShow3': isLoadList[2] }">
				Taiwan International Airport (TPE)
			</h3>
			<h2 class="lazyload" :class="{ 'textShow4': isLoadList[3] }">
				Airport Flight's
			</h2>
			<h5 class="lazyload" :class="{ 'textShow5': isLoadList[4] }">
				Situations
			</h5>
		</div>
		<div class="mainTitle">
			<h1 class="lazyload" :class="{ 'textShow6': isLoadList[5] }">
				TPE Flight's
				<div class="bottomLine"></div>
			</h1>
		</div>
		<div id="apiTest">
			<template v-for="air in infiniteList" :key="air.FlightNumber">
				<div class="cards">
					<div class="cardsTop">
						<div class="cardsLeft">
							<div class="airlines">
								<h1>
									<p>航空公司</p>
									Airlines: {{ airRename(air.AirlineID) }}
								</h1>
							</div>
							<div class="flight">
								<h1>
									<p>班次</p>
									Flight No.: {{ air.AirlineID + " - " + air.FlightNumber }}
								</h1>
							</div>
							<div class="timeCardBox">
								<div class="timeCard">
									<div class="std">
										<span>STD.:</span>
										<p>{{ moment(air.ScheduleDepartureTime).format('YYYY-MM-DD HH:mm') }}</p>
									</div>
									<div class="etd">
										<span>ETD.:</span>
										<p>{{ moment(air.EstimatedDepartureTime).format('YYYY-MM-DD HH:mm') }}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="cardsRight">
							<p>FROM: {{ air.DepartureAirportID }}</p>
							<p>TO: {{ air.ArrivalAirportID }}</p>
							<p>Term.: {{ air.Terminal }}</p>
							<p>Gate: {{ air.Gate }}</p>
						</div>
					</div>
					<span class="status">Remarks:
						<p :class="remarkStyle(air.DepartureRemark)">{{ air.DepartureRemark }}</p>
					</span>
					<div class="updateDT">Update: {{ moment(air.UpdateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
				</div>
			</template>
			<div class="hold-observe"></div>
		</div>
	</section>
	<AirPortLoader />
</template>

<script src="@/js/airPort.js"></script>

<style lang="scss" scoped>
	@import '@/css/air-port.scss';
</style>