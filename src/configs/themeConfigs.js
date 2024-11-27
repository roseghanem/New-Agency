import {Cloud, Moon, Sun} from "react-feather"

const localConfigs = {
	app: {
		appName: 'Liberty Music PR ',
		menuAppName: 'Liberty',
		appLogoImage: require(`@fwsrc/assets/images/logo.png`).default,
		menuLogoImageLight: require(`@fwsrc/assets/images/logo.png`).default,
		menuLogoImageDark: require(`@fwsrc/assets/images/logo.png`).default,
		images:{
			login:  require(`@modules/user/assets/images/login.svg`).default,
			loginDark:  require(`@modules/user/assets/images/login-dark.svg`).default,
			register:  require(`@modules/user/assets/images/register.svg`).default,
			registerDark:  require(`@modules/user/assets/images/register-dark.svg`).default,
			forgetPassword:  require(`@modules/user/assets/images/forgot-password.svg`).default,
			forgetPasswordDark:  require(`@modules/user/assets/images/forgot-password-dark.svg`).default
		},
		footerUrl:'#'
	},
	layout: {
		isRTL: false,
		skin: 'light', // light, dark, bordered, semi-dark
		skinOptions:{
			light: {nextSkin: 'light', icon: <Moon className='ficon' />}
		},
		routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
		type: 'vertical', // vertical, horizontal
		contentWidth: 'full', // full, boxed
		menu: {
			isHidden: false,
			isCollapsed: true
		},
		navbar: {
			// ? For horizontal menu, navbar type will work for navMenu type
			type: 'floating', // static , sticky , floating, hidden
			backgroundColor: 'white' // BS color options [primary, success, etc]
		},
		footer: {
			type: 'sticky' // static, sticky, hidden
		},
		customizer: false,
		scrollTop: true // Enable scroll to top button
	}
}
export default localConfigs
