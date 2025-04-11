import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class DeviceService {
	getAllDevices() {
		return axios.get(API_URL + "devices", { headers: authHeader() })
	}

	createDevice(deviceData) {
		return axios.post(API_URL + "devices", deviceData, {
			headers: authHeader()
		})
	}

	updateDevice(id, deviceData) {
		return axios.put(API_URL + `devices/${id}`, deviceData, {
			headers: authHeader()
		})
	}

	deleteDevice(id) {
		return axios.delete(API_URL + `devices/${id}`, {
			headers: authHeader()
		})
	}

	uploadDevicePicture(id, formData) {
		return axios
			.post(`${API_URL}device/${id}/upload_picture`, formData, {
				headers: authHeader("multipart")
			})
			.then((response) => response.data.results)
	}

	getUserCollection() {
		return axios
			.get(API_URL + "user/collection", { headers: authHeader() })
			.then((response) => response.data.results)
	}

	getCategories() {
		return axios
			.get(API_URL + "categories", { headers: authHeader() })
			.then((response) => response.data.results)
	}
}

export default new DeviceService()
