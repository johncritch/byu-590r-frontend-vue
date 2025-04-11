<template>
	<h1 class="ml-5">My Collection</h1>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="4"
				v-for="device in userCollection"
				:key="device.id"
			>
				<v-card class="pa-3" elevation="2">
					<div class="text-h5 text-center pa-3">
						{{ device.details.model_name }}
					</div>
					<div class="text-subtitle-1">
						{{ device.category_name }}
					</div>
					<v-img
						v-if="device.details?.picture"
						:src="device.details.picture"
						aspect-ratio="1"
						height="300"
						cover
					></v-img>
					<v-card-actions>
						<v-btn
							color="red"
							@click="removeFromCollection(device.id)"
							icon="mdi-close"
						>
						</v-btn>
						<v-spacer />
						<v-btn icon @click="openInfoDialog(device)">
							<v-icon>mdi-information</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-dialog v-model="infoDialog" max-width="600">
			<v-card>
				<v-card-title class="text-center mt-5"
					>Device Details</v-card-title
				>
				<v-card-text>
					<v-list dense>
						<v-list-item>
							<v-list-item-content>
								<strong>Name:</strong>
								<p>{{ selectedDevice?.details.model_name }}</p>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<strong>Description:</strong>
								<p>{{ selectedDevice?.details.description }}</p>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<strong>Specifications:</strong>
								<p>
									{{ selectedDevice?.details.specifications }}
								</p>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<strong>Release Date:</strong>
								<p>
									{{ selectedDevice?.details.release_date }}
								</p>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<strong>Release Price:</strong>
								<p>
									${{ selectedDevice?.details.release_price }}
								</p>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<strong>Units Sold:</strong>
								<p>{{ selectedDevice?.details.units_sold }}</p>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="infoDialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script src="./CollectionView.ts" type="ts"></script>
<style src="./CollectionView.scss" scoped></style>
