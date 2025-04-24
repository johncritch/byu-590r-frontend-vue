<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import { mapState } from "vuex"
import { ref } from "vue"
import background from "@/assets/images/background.png"
import { useDisplay } from "vuetify"

export default {
	setup() {
		const theme = ref("dark")
		const drawer = ref(false)
		const { smAndDown } = useDisplay()

		function changeTheme() {
			theme.value = theme.value === "light" ? "dark" : "light"
		}

		return { theme, changeTheme, drawer, smAndDown }
	},

	name: "App",
	components: {
		LoginView,
		RouterLink,
		RouterView
	},

	data: function () {
		return {
			profileDialog: false,
			profileIsUploading: false,
			verificationEmailLoading: false,
			showEmailNotVerifiedDialog: false,
			showChangeEmailTextField: false,
			changeEmail: false,
			successVerificationMessage: "",
			changeEmailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			profile: {
				avatar: "",
				name: "",
				title: "",
				icon: "mdi-account-circle",
				color: "black"
			},
			profilePictureImage: "",
			emailOfVerification: ""
		}
	},
	computed: {
		...mapState({
			user() {
				return this.$store.state.user.user
			},
			auth() {
				return this.$store.state.auth
			},
			authUser() {
				return this.auth.user
			},
			isAuthenticated() {
				return (
					this.auth.status.loggedIn &&
					this.authUser.token !== undefined
				)
			},
			title() {
				return "Welcome " + this.authUser.name + "!"
			},
			avatarURL() {
				return this.auth.user.avatar
			},
			profilePictureChangeLabel() {
				return "Profile picture"
			}
		}),
		backgroundStyle() {
			return {
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${background}')`,
				backgroundRepeat: "repeat",
				backgroundSize: "500px",
				backgroundPosition: "top left",
				minHeight: "100vh"
			}
		}
	},
	updated() {
		if (this.isAuthenticated) {
			this.$router.push({ name: "home" })
		}
	},
	created() {
		if (this.authUser) {
			this.getCurrentUser()
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout")
		},
		getCurrentUser() {
			this.profile.name = this.authUser.name

			this.profile.title = this.title
			this.$store
				.dispatch("user/getUser")
				.then((response) => {
					if (response.avatar) {
						this.$store.commit(
							"auth/uploadAvatarSuccess",
							response.avatar
						)
					}
					if (!response.email_verified_at) {
						this.showEmailNotVerifiedDialog = true
					}
				})
				.catch((error) => {
					this.logout()
				})
		},
		removeAvatar() {
			this.profileIsUploading = true
			this.$store
				.dispatch("user/removeAvatar")
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		onAvatarChange(e) {
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return
			this.profileIsUploading = true
			this.$store
				.dispatch("user/uploadAvatar", image[0], { root: true })
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		checkAuth(auth) {
			console.log("Authenticated!", auth)
		}
	}
}
</script>
<template>
	<v-app :theme="theme" :style="backgroundStyle">
		<v-app-bar v-if="isAuthenticated">
			<v-btn to="/" default>The Apple Basket</v-btn>
			<v-spacer></v-spacer>
			<template v-if="!smAndDown">
				<v-btn to="/" default>Home</v-btn>
				<v-btn to="/about">About</v-btn>
				<v-btn class="mr-1" to="/collection">My Collection</v-btn>
			</template>

			<template v-else>
				<v-btn icon @click="drawer = true">
					<v-icon>mdi-menu</v-icon>
				</v-btn>
			</template>
			<v-menu min-width="200px" rounded>
				<template v-slot:activator="{ props }">
					<v-btn icon v-bind="props">
						<v-avatar color="grey" size="large">
							<v-img
								icon
								v-bind="props"
								v-if="avatarURL"
								alt="Avatar"
								:src="avatarURL"
							></v-img>
							<v-icon
								v-bind="props"
								v-else
								:color="profile.color"
								:icon="profile.icon"
							></v-icon>
						</v-avatar>
					</v-btn>
				</template>
				<v-card>
					<v-card-text>
						<div class="mx-auto text-center">
							<h3>{{ profile.name }}</h3>
							<v-divider class="my-3"></v-divider>
							<v-btn
								:prepend-icon="
									theme === 'light'
										? 'mdi-weather-sunny'
										: 'mdi-weather-night'
								"
								@click="changeTheme"
								>Toggle Theme
							</v-btn>
							<v-btn @click="profileDialog = true"
								>Profile
							</v-btn>
							<v-divider class="my-3"></v-divider>
							<v-btn @click="logout()">Logout</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-menu>
			<!-- <v-btn
				:prepend-icon="
					theme === 'light'
						? 'mdi-weather-sunny'
						: 'mdi-weather-night'
				"
				@click="changeTheme"
				>Toggle Theme</v-btn
			> -->
			<!-- <v-btn @click="logout()">Logout</v-btn> -->
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			temporary
			:location="'left'"
			:width="250"
		>
			<v-list nav dense>
				<v-list-item to="/">
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>
				<v-list-item to="/about">
					<v-list-item-title>About</v-list-item-title>
				</v-list-item>
				<v-list-item to="/collection">
					<v-list-item-title>My Collection</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container>
				<div v-if="isAuthenticated">
					<RouterView />
				</div>
				<LoginView
					v-else
					:is-authenticated="isAuthenticated"
					@authenticate="checkAuth($event)"
				/>
			</v-container>

			<v-dialog v-model="profileDialog">
				<v-form>
					<v-card class="mx-auto" width="500">
						<v-card-title>Profile</v-card-title>
						<v-card-subtitle
							>Enter your profile options here</v-card-subtitle
						>
						<v-card class="mx-auto" width="460" rounded="0">
							<v-img
								cover
								v-if="avatarURL"
								:src="avatarURL"
							></v-img>
							<v-icon
								v-else
								:color="profile.color"
								:icon="profile.icon"
							></v-icon>
							<v-file-input
								accept="image/*"
								:loading="profileIsUploading"
								:disabled="profileIsUploading"
								@change="onAvatarChange"
								:label="profilePictureChangeLabel"
							></v-file-input>
						</v-card>
						<v-card-actions>
							<v-btn @click="removeAvatar"
								>Remove Profile Picture</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-dialog>
		</v-main>
	</v-app>
</template>
