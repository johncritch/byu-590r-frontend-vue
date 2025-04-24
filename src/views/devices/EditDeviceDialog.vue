<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title class="text-center mt-5">
				<span class="text-h5">
					{{ device.id ? "Edit Device" : "Add Device" }}
				</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-form ref="form">
						<v-row>
							<v-col cols="12">
								<v-text-field
									label="Model Name"
									v-model="editedDevice.model_name"
									:rules="[rules.required]"
									required
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									label="Description"
									v-model="editedDevice.description"
									:rules="[rules.required]"
									required
								/>
							</v-col>
							<v-col cols="12">
								<v-select
									v-model="editedDevice.category_id"
									:items="categories"
									item-title="name"
									item-value="id"
									label="Category"
								/>
							</v-col>

							<v-col cols="12">
								<v-text-field
									label="Specifications"
									v-model="editedDevice.specifications"
								/>
							</v-col>
							<v-col cols="12">
								<v-menu
									ref="menu"
									v-model="menu"
									:close-on-content-click="false"
									:return-value.sync="
										editedDevice.release_date
									"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="editedDevice.release_date"
											label="Release Date"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
											@click="menu = true"
											:rules="[rules.required]"
											required
										/>
									</template>
									<v-date-picker
										v-model="editedDevice.release_date"
										no-title
										scrollable
									>
										<v-spacer />
										<v-btn
											text
											color="primary"
											@click="menu = false"
										>
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="
												$refs.menu.save(
													editedDevice.release_date
												)
											"
										>
											OK
										</v-btn>
									</v-date-picker>
								</v-menu>
							</v-col>
							<v-col cols="12">
								<v-text-field
									label="Release Price"
									v-model="editedDevice.release_price"
									type="number"
									prefix="$"
									:rules="[rules.required]"
									required
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									label="Units Sold"
									v-model="editedDevice.units_sold"
									type="number"
									:rules="[rules.required]"
									required
								/>
							</v-col>
						</v-row>
					</v-form>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn text @click="close">Cancel</v-btn>
				<v-btn color="primary" text @click="save">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script src="./EditDeviceDialog.ts" type="ts"></script>
<style src="./DevicesView.scss" scoped></style>
