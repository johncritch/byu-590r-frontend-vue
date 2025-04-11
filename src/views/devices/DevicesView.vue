<template>
	<div>
		<v-row class="mr-5">
			<h1 class="ml-8 mt-5">Apple Device List</h1>
			<v-spacer></v-spacer>
			<v-col cols="2" class="mt-3">
				<v-select
					v-model="selectedCategoryId"
					:items="categories"
					item-title="name"
					item-value="id"
					label="Category"
					clearable
					density="compact"
					variant="solo"
					hide-details
				></v-select>
			</v-col>

			<v-col cols="4">
				<v-toolbar flat color="transparent">
					<v-text-field
						v-model="search"
						label="Search"
						append-inner-icon="mdi-magnify"
						density="compact"
						single-line
						variant="solo"
						hide-details
					></v-text-field>
				</v-toolbar>
			</v-col>
			<v-btn
				class="mt-6"
				append-icon="mdi-plus"
				height="40"
				@click="openAddNewDialog()"
			>
				Add Device
			</v-btn>
		</v-row>
		<v-container>
			<v-row>
				<v-col
					cols="14"
					sm="8"
					md="4"
					lg="3"
					xl="2"
					style="min-width: 380px; max-width: 380px"
					class="d-flex"
					v-for="device in filteredDevices"
					:key="device.id"
				>
					<v-card class="pa-3" elevation="2" style="width: 100%">
						<div class="text-h5 text-center pa-3">
							{{ device.details?.model_name || "Unnamed" }}
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
						<v-btn
							:color="
								isInCollection(device.id) ? 'green' : 'primary'
							"
							:disabled="isInCollection(device.id)"
							block
							class="my-3"
							@click="addToCollection(device.id)"
						>
							<v-icon start v-if="isInCollection(device.id)"
								>mdi-check</v-icon
							>
							{{
								isInCollection(device.id)
									? "In Collection"
									: "Add to Collection"
							}}
						</v-btn>
						<!-- <v-card-actions class=""> -->
						<v-row class="pa-3">
							<v-btn icon @click="openEditDialog(device)">
								<v-icon>mdi-pencil</v-icon>
							</v-btn>

							<v-btn icon @click="openPictureDialog(device.id)">
								<v-icon>mdi-camera</v-icon>
							</v-btn>

							<v-btn icon @click="deleteDevice(device.id)">
								<v-icon>mdi-delete</v-icon>
							</v-btn>
							<v-spacer />
							<v-btn icon @click="openInfoDialog(device)">
								<v-icon>mdi-information</v-icon>
							</v-btn>

							<!-- hidden input for image upload -->
							<!-- hidden input for image upload -->
							<input
								type="file"
								:ref="'fileInput_' + device.id"
								style="display: none"
								accept="image/*"
								@change="onPictureChange($event, device.id)"
							/>
						</v-row>
						<!-- </v-card-actions> -->
					</v-card>
				</v-col>
			</v-row>
			<edit-device-dialog
				:device="editedDevice"
				v-model:modelValue="editDialog"
				@save="saveDevice"
			/>
		</v-container>
		<v-dialog v-model="confirmDeleteDialog" max-width="500">
			<v-card>
				<v-card-title class="text-h6">Are you sure?</v-card-title>
				<v-card-text
					>This will permanently delete the device.</v-card-text
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="confirmDeleteDialog = false"
						>Cancel</v-btn
					>
					<v-btn color="red" text @click="confirmDelete"
						>Delete</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="pictureDialog" max-width="500">
			<v-card>
				<v-card-title>Edit Device Picture</v-card-title>
				<v-card-text>
					<v-img
						v-if="devicePreviewPicture"
						:src="devicePreviewPicture"
						cover
						height="300"
					></v-img>
					<v-file-input
						accept="image/*"
						:loading="devicePictureUploading"
						:disabled="devicePictureUploading"
						@change="onDevicePictureSelect"
						label="Select new picture"
					></v-file-input>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="pictureDialog = false">Cancel</v-btn>
					<v-btn
						color="primary"
						text
						:disabled="!devicePreviewPicture"
						@click="submitDevicePicture"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
	</div>
</template>

<script src="./DevicesView.ts" type="ts"></script>
<style src="./DevicesView.scss" scoped></style>
