<script lang="ts" module>
	const GRADIENTS = {
		main: (g: CanvasGradient) => {
			g.addColorStop(0, 'rgba(135, 135, 135, 0)');
			g.addColorStop(0.5, 'rgba(135, 135, 135, 0.4)');
			g.addColorStop(1, 'rgba(135, 135, 135, 0)');
			return g;
		}
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	// Component properties
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	// Configuration
	const numberOfLines: number = 100;
	const lineWidth: number = 1;

	function setupCanvas(): void {
		if (!canvas) return;
		// Set canvas size to viewport dimensions
		const dpr: number = window.devicePixelRatio || 1;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;

		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		if (!ctx) return;
		ctx.lineWidth = lineWidth;
		const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = GRADIENTS.main(gradient);
	}

	function drawLines(): void {
		if (!ctx || !canvas) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Calculate spacing between lines
		const spacing: number = canvas.height / (numberOfLines + 1);
		// Draw horizontal lines
		for (let i: number = 1; i <= numberOfLines; i++) {
			const y: number = spacing * i;

			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}
	}

	function handleResize(): void {
		setupCanvas();
		drawLines();
	}

	onMount(() => {
		setupCanvas();
		drawLines();

		// Add resize listener
		window.addEventListener('resize', handleResize);

		return () => {
			// Cleanup
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -5;
		opacity: 0.5;
		mask-image: radial-gradient(circle at center -40%, white 50%, transparent 80%);
		-webkit-mask-image: radial-gradient(circle at center -40%, white 50%, transparent 80%);
	}
</style>
