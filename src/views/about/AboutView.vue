<template>
	<v-container class="mt-10">
		<v-row justify="center">
			<v-col cols="12" md="8" class="text-center">
				<h1 class="text-h3 font-weight-bold mb-4">
					About The Apple Basket
				</h1>
				<v-img :src="logo" max-width="300" class="mx-auto mb-6" />

				<p class="text-body-1 mb-4">
					The Apple Basket is a curated collection of Apple’s most
					iconic and nostalgic hardware. From the bubbly iMac G3s to
					the revolutionary first-gen iPods, we’re here to preserve
					the innovation that shaped the tech world.
				</p>
				<p class="text-body-1 mb-4">
					Whether you're a die-hard Mac collector, a vintage tech
					enthusiast, or just curious about the roots of modern
					computing, The Apple Basket is your place to browse,
					organize, and admire the golden era of Apple design.
				</p>
				<p class="text-body-1 mb-4">
					Built by a fellow collector, John Critchlow, this site is
					powered by Vue.js and fueled by passion. We’re constantly
					adding more classics, so check back often—and don’t forget
					to build your own digital collection!
				</p>
				<v-divider class="my-6" />
				<p class="text-body-2 text-grey">
					🍎 "Here’s to the crazy ones..." — Apple Inc.
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script src="./AboutView.ts" type="ts"></script>
<style src="./AboutView.scss" scoped></style>
