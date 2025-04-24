export default {
	name: "CollectionView",
	data() {
		return {
			infoDialog: false,
			selectedDevice: null,
			userCollection: []
		}
	},
	created() {
		this.fetchCollection()
	},
	methods: {
		fetchCollection() {
			this.$store
				.dispatch("devices/getUserCollection")
				.then((devices) => {
					this.userCollection = devices
				})
		},
		openInfoDialog(device) {
			this.selectedDevice = device
			this.infoDialog = true
		},
		removeFromCollection(deviceId) {
			this.$store
				.dispatch("user/removeDeviceFromCollection", deviceId)
				.then(() => {
					this.fetchCollection()
					// alert("Removed from collection.")
				})
				.catch((err) => {
					console.error("Failed to remove device:", err)
					alert("Failed to remove device from collection.")
				})
		}
	}
}
