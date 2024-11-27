// You can customize the template with the help of this file
import localConfigs from '@fwsrc/configs/themeConfigs'
import {Sun, Moon, Cloud} from 'react-feather'
import _ from "lodash"

//Template config options
const basicConfigs = {
  app: {
    appName: 'FrameWork',
    appLogoImage: require('@src/assets/images/logo/logo.png').default,
    images:{
      login:  require(`../assets/images/pages/login.svg`).default,
      loginDark:  require(`../assets/images/pages/login-dark.svg`).default,
      register:  require(`../assets/images/pages/register.svg`).default,
      registerDark:  require(`../assets/images/pages/register-dark.svg`).default,
      forgetPassword:  require(`../assets/images/pages/forgot-password.svg`).default,
      forgetPasswordDark:  require(`../assets/images/pages/forgot-password-dark.svg`).default
    },
    footerUrl:'#'
  },
  layout: {
    isRTL: false,
    skin: 'semi-dark', // light, dark, bordered, semi-dark
    skinOptions:{
      light:{nextSkin:'semi-dark', icon: <Sun className='ficon' />},
      "semi-dark":{nextSkin:'dark', icon: <Cloud className='ficon' />},
      dark:{nextSkin:'light', icon: <Moon className='ficon' />}
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

// const themeConfig = _.merge(basicConfigs, localConfigs)
const themeConfig = {...basicConfigs, ...localConfigs}

export default themeConfig
