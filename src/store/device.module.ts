import deviceService from "../services/device.service"

const initialState = {
	devices: []
}

export const devices = {
	namespaced: true,
	state: initialState,
	actions: {
		getAllDevices({ commit }) {
			deviceService.getAllDevices().then(
				(response) => {
					console.log("API Response:", response.data)
					commit("setDevices", response.data.results || [])
					return Promise.resolve(response.data)
				},
				(error) => {
					console.error("API Error:", error)
					return Promise.reject(error)
				}
			)
		},
		createDevice({ commit }, device) {
			return deviceService.createDevice(device).then(
				(response) => {
					commit("addDevice", response.data)
					return Promise.resolve(response.data)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		updateDevice({ commit }, payload) {
			return deviceService.updateDevice(payload.id, payload.device).then(
				(response) => {
					commit("updateDeviceInState", response.data)
					return Promise.resolve(response.data)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		deleteDevice({ commit }, id) {
			return deviceService.deleteDevice(id).then(
				(response) => {
					commit("removeDeviceFromState", id)
					return Promise.resolve(response)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		uploadDevicePicture({ commit }, { id, formData }) {
			return deviceService.uploadDevicePicture(id, formData)
		},
		getUserCollection({ commit }) {
			return deviceService.getUserCollection().then((devices) => {
				return Promise.resolve(devices)
			})
		},
		getCategories() {
			return deviceService.getCategories().then((categories) => {
				return categories
			})
		}
	},
	mutations: {
		setDevices(state, devices) {
			state.devices = devices
		},
		addDevice(state, device) {
			state.devices.push(device)
		},
		updateDeviceInState(state, updatedDevice) {
			console.log("Updating device in state", updatedDevice)
			const index = state.devices.findIndex(
				(device) => device.id === updatedDevice.id
			)
			if (index !== -1) {
				state.devices.splice(index, 1, updatedDevice)
			} else {
				console.warn("Device not found in state, adding instead")
				state.devices.push(updatedDevice)
			}
		},

		removeDeviceFromState(state, id) {
			state.devices = state.devices.filter((device) => device.id !== id)
		}
	},
	getters: {
		getDevices: (state) => {
			return state.devices
		}
	}
}
