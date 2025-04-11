import EditDeviceDialog from "./EditDeviceDialog.vue"

export default {
	name: "DevicesView",
	components: {
		EditDeviceDialog
	},
	data: function () {
		return {
			editDialog: false,
			editedDevice: null,
			search: "",
			selectedCategoryId: null,
			categories: [],
			confirmDeleteDialog: false,
			deviceIdToDelete: null,
			deviceIdToUpload: null,
			pictureDialog: false,
			devicePreviewPicture: "",
			devicePictureUploading: false,
			infoDialog: false,
			selectedDevice: null,
			userCollection: []
		}
	},
	computed: {
		allDevices() {
			return this.$store.getters["devices/getDevices"]
		},
		filteredDevices() {
			const query = this.search.toLowerCase()
			return this.allDevices.filter((device) => {
				const matchesSearch =
					!this.search ||
					device.details?.model_name?.toLowerCase().includes(query) ||
					device.details?.description
						?.toLowerCase()
						.includes(query) ||
					device.details?.specifications
						?.toLowerCase()
						.includes(query) ||
					device.details?.release_date?.toLowerCase().includes(query)

				const matchesCategory =
					!this.selectedCategoryId ||
					device.category_id === this.selectedCategoryId

				return matchesSearch && matchesCategory
			})
		}
	},
	created() {
		this.fetchDevices()
		this.fetchCollection()
		this.$store.dispatch("devices/getCategories").then((categories) => {
			this.categories = categories
		})
	},
	methods: {
		fetchDevices() {
			this.$store.dispatch("devices/getAllDevices")
		},
		openEditDialog(device) {
			this.editedDevice = {
				id: device.id, // ✅ needed to route update correctly
				category_id: device.category_id,
				model_name: device.details.model_name,
				description: device.details.description,
				specifications: device.details.specifications,
				release_date: device.details.release_date,
				release_price: device.details.release_price,
				units_sold: device.details.units_sold
			}
			this.editDialog = true
		},

		addToCollection(deviceId) {
			this.$store
				.dispatch("user/addDeviceToCollection", deviceId)
				.then(() => {
					// Find the full device from the global list
					const device = this.allDevices.find(
						(d) => d.id === deviceId
					)
					if (device && !this.isInCollection(deviceId)) {
						this.userCollection.push(device)
					}
					alert("Added to collection!")
				})
				.catch((err) => {
					console.error("Failed to add to collection:", err)
					alert("Failed to add to collection")
				})
		},

		openAddNewDialog() {
			this.editedDevice = {
				model_name: "",
				description: "",
				category_id: null,
				specifications: "",
				release_date: null,
				release_price: null,
				units_sold: null
			}
			this.editDialog = true
		},

		saveDevice(editedDevice) {
			const action = editedDevice.id
				? "devices/updateDevice"
				: "devices/createDevice"

			const payload = editedDevice.id
				? {
						id: editedDevice.id,
						device: {
							model_name: editedDevice.model_name,
							description: editedDevice.description,
							category_id: editedDevice.category_id,
							specifications: editedDevice.specifications,
							release_date: editedDevice.release_date,
							release_price: editedDevice.release_price,
							units_sold: editedDevice.units_sold
						}
				  }
				: editedDevice

			this.$store.dispatch(action, payload).then(() => {
				this.editDialog = false
				this.search = "" // ✅ Clear the search so filteredDevices resets
				this.fetchDevices()
			})
		},

		deleteDevice(id) {
			this.deviceIdToDelete = id
			this.confirmDeleteDialog = true
		},
		confirmDelete() {
			if (!this.deviceIdToDelete) return

			this.$store
				.dispatch("devices/deleteDevice", this.deviceIdToDelete)
				.then(() => {
					this.fetchDevices()
					this.confirmDeleteDialog = false
					this.deviceIdToDelete = null
				})
		},
		triggerFileInput(deviceId) {
			const ref = this.$refs[`fileInput_${deviceId}`]
			if (Array.isArray(ref)) {
				ref[0].click()
			} else if (ref) {
				ref.click()
			}
		},

		onPictureChange(e, deviceId) {
			const file = e.target.files?.[0]
			if (!file) return

			const formData = new FormData()
			formData.append("image", file)

			this.$store
				.dispatch("devices/uploadDevicePicture", {
					id: deviceId,
					formData
				})
				.then(() => {
					this.fetchDevices()
				})
				.catch((err) => {
					console.error("Image upload failed", err)
					alert("Failed to upload picture")
				})
		},

		openPictureDialog(deviceId: number) {
			this.deviceIdToUpload = deviceId
			this.devicePreviewPicture = ""
			this.devicePictureFile = null
			this.pictureDialog = true
		},

		onDevicePictureSelect(e: Event) {
			const file = (e.target as HTMLInputElement)?.files?.[0]
			if (!file) return

			this.devicePictureFile = file
			this.devicePreviewPicture = URL.createObjectURL(file)
		},

		submitDevicePicture() {
			if (!this.deviceIdToUpload || !this.devicePictureFile) return

			this.devicePictureUploading = true
			const formData = new FormData()
			formData.append("image", this.devicePictureFile)

			this.$store
				.dispatch("devices/uploadDevicePicture", {
					id: this.deviceIdToUpload,
					formData
				})
				.then(() => {
					this.devicePictureUploading = false
					this.pictureDialog = false
					this.devicePreviewPicture = ""
					this.devicePictureFile = null
					this.fetchDevices()
				})
				.catch((err) => {
					console.error("Image upload failed", err)
					alert("Failed to upload picture")
					this.devicePictureUploading = false
				})
		},
		openInfoDialog(device) {
			this.selectedDevice = device
			this.infoDialog = true
		},
		fetchCollection() {
			this.$store
				.dispatch("devices/getUserCollection")
				.then((devices) => {
					this.userCollection = devices
					console.log(this.userCollection)
				})
		},
		isInCollection(deviceId: number): boolean {
			return this.userCollection.some((device) => device.id === deviceId)
		}
	}
}
