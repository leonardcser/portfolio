<script lang="ts">
	import AutoplayVideo from '$lib/components/AutoplayVideo.svelte';
	import Award from '$lib/components/Award.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import PaperIcon from '$lib/components/icons/PaperIcon.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
</script>

<h2>Works</h2>
<div class="space-y-8 max-sm:space-y-6">
	<ProjectItem
		class="grid-cols-2 items-center gap-4 sm:grid"
		title="Greenland Supraglacial Lakes Detection"
		tags={['MLOps', 'PyTorch', 'DVC']}
		linkTags={[
			{ tag: 'GitHub', href: '', Icon: GithubIcon },
			{ tag: 'Read Paper', href: '', Icon: PaperIcon }
		]}
	>
		{#snippet demo()}
			<img
				src="/images/lakes.png"
				alt="lake segmentation"
				class="m-0 aspect-video object-cover sm:aspect-square"
			/>
		{/snippet}
		{#snippet awards()}
			<Award yOffset={-8}>
				2023 ACM
				<br />
				SIGSPATIAL
				<br />
				1st Place
			</Award>
			<Award yOffset={-8}>
				2023 ACM
				<br />
				SIGSPATIAL
				<br />
				3st Place
			</Award>
		{/snippet}
		This project was part of a ACM SIGSPATIAL competition. The goal was to segment supraglacial lakes
		in Greenland using satellite images. We worked in a team of 5 at{' '}
		<strong class="text-red-600">HEIG-VD</strong> and submitted two solutions, ranked 1st and 3rd.
	</ProjectItem>

	<ProjectItem
		class="grid-cols-2 items-center gap-4 sm:grid"
		title="Swiss License Plate Detection"
		tags={['MLOps', 'PyTorch', 'Kubernetes', 'DVC']}
		linkTags={[{ tag: 'GitHub', href: '', Icon: GithubIcon }]}
	>
		{#snippet demo()}
			<img src="/images/license_plate.png" alt="chess game" class="m-0" />
		{/snippet}
		This project was part of research into Machine Learning Operations (MLOps) at
		<strong class="text-red-600">HEIG-VD</strong>. It is comprised of two models: one for detecting
		the license plate and another for recognizing the characters. The key feature is a custom
		license plate generator in order to train on synthetic data.
	</ProjectItem>

	<ProjectItem
		title="Scrapeout"
		tags={['Typescript', 'SCSS', 'Django', 'Terraform', 'Docker', 'AWS', 'PostgreSQL', 'Neo4j']}
	>
		{#snippet demo()}
			<AutoplayVideo src="/videos/scrapeout.mp4" />
		{/snippet}
		{#snippet awards()}
			<Award>
				Hackaton
				<br />
				1st Place
			</Award>
			<Award>
				AWS
				<br />
				Certified
			</Award>
		{/snippet}
		Scrapeout is my most ambitious project to date. It has now become a full web tool that helps companies
		identify conflict of interest in their data in order to take more informed decisions.
	</ProjectItem>

	<div class="grid-cols-2 max-sm:space-y-6 sm:grid sm:gap-6">
		<ProjectItem title="Captcha Solver" tags={['Tensorflow', 'GCP', 'OpenCV']}>
			{#snippet demo()}
				<img src="/images/amazoncaptcha.jpg" alt="amazon captcha" class="m-0" />
			{/snippet}
			The goal of this project was to create a neural network that could solve 6 character captchas from
			Amazon. I achieved an average accuracy of 93%.
		</ProjectItem>
		<ProjectItem
			title="Chess"
			tags={['OOP', 'Java', 'HEIG-VD']}
			linkTags={[{ tag: 'GitHub', href: '', Icon: GithubIcon }]}
		>
			{#snippet demo()}
				<img src="/images/chess.png" alt="chess game" class="m-0" />
			{/snippet}
			A simple chess engine based on OOP principles
		</ProjectItem>
	</div>

	<div class="grid-cols-2 max-sm:space-y-6 sm:grid sm:gap-6">
		<ProjectItem title="SlitherIO RL" tags={['Tensorflow', 'Selenium', 'OpenCV']}>
			{#snippet demo()}
				<AutoplayVideo src="/videos/SlitherIORL.mp4" />
			{/snippet}
			The project was to create a neural network that could play the game SlitherIO. The agent was trained
			using A2C (actor to critic) reinforcement learning. The agent was able to collect food and avoid
			other snakes.
		</ProjectItem>
		<ProjectItem
			title="Pac-Man"
			tags={['OOP', 'Java', 'EPFL']}
			linkTags={[{ tag: 'GitHub', href: '', Icon: GithubIcon }]}
		>
			{#snippet demo()}
				<AutoplayVideo src="/videos/pacman.mp4" />
			{/snippet}
			{#snippet awards()}
				<Award>
					1st Place EPFL
					<br />
					Award
				</Award>
			{/snippet}
			Remake of the classic Pacman game. This project was done in a team of 2 for the Introduction to
			Programming (CS-107) course at{' '}
			<strong class="text-red-600">EPFL</strong>.
			<br />
			It includes all ghosts and their AI, a map editor, a leaderboard system, custom menu and more.
		</ProjectItem>
	</div>
</div>
