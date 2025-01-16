<div class="absolute left-0 top-0 -z-10 flex w-screen justify-center overflow-hidden">
	<div id="spotlight"></div>
</div>

<style>
	#spotlight {
		height: 130vh;
		width: 130vw;
		background: radial-gradient(
			circle at center -40%,
			theme('colors.blue.400') 0%,
			rgb(from theme('colors.blue.300') r g b / 20%) 60%,
			transparent 75%
		);
		opacity: 0.75;
	}
</style>
