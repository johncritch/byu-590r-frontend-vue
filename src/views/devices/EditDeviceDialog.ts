export default {
	props: {
		modelValue: Boolean,
		device: {
			type: Object,
			default: () => ({
				model_name: "",
				description: "",
				specifications: "",
				release_date: null,
				release_price: null,
				units_sold: null
			})
		}
	},
	data() {
		return {
			dialog: this.modelValue,
			editedDevice: {},
			menu: false,
			categories: [],
			rules: {
				required: (value) => !!value || "Required."
			}
		}
	},
	created() {
		this.$store.dispatch("devices/getCategories").then((cats) => {
			this.categories = cats
		})
	},

	watch: {
		modelValue(value) {
			this.dialog = value
		},
		dialog(value) {
			this.$emit("update:modelValue", value)
		},
		device: {
			handler(newVal) {
				if (!newVal) return

				this.editedDevice = {
					id: newVal.id ?? null,
					model_name: newVal.model_name || "",
					description: newVal.description || "",
					category_id: newVal.category_id ?? null,
					specifications: newVal.specifications || "",
					release_date: newVal.release_date
						? new Date(newVal.release_date)
						: null,
					release_price: newVal.release_price ?? null,
					units_sold: newVal.units_sold ?? null
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		close() {
			this.dialog = false
		},
		async save() {
			const validation = await this.$refs.form?.validate()

			if (!validation.valid) {
				// Keep dialog open, show validation errors
				return
			}

			const deviceToSave = {
				...this.editedDevice,
				release_date: this.editedDevice.release_date
					? new Date(this.editedDevice.release_date)
							.toISOString()
							.split("T")[0]
					: null
			}

			this.$emit("save", deviceToSave)
			this.close()
		}
	}
}
