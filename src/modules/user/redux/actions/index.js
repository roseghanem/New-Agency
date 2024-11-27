import {API, API_WithSwal} from '../../utility/API'
import {_setAPIToken} from '../../utility/Utils'
import _ from "lodash"

//************************************//
export const _login = ({email, password}, callback, callbackErr) => {
    API.post('admin/login', {email, password})
        .then(function (res) {
            callback(res)
        })
        .catch(function (res) {
            callbackErr(res)
        })
}

//************************************//
export const _autoLogin = (dispatch, ability, callback) => {
  const storageUserToken = JSON.parse(localStorage.getItem('USER_TOKEN'))
  const sessionUserToken = JSON.parse(sessionStorage.getItem('USER_TOKEN'))
  let user = (sessionUserToken || false)
  if (user && user.token && user.user) {
    _setAPIToken(user.token)
    // dispatch({type:"USER_LOGIN", userData:user.user, token:user.token})
    // if (user.user.abilities) {
    //   ability.update(user.user.abilities)
    // }
    API.get('admin/info', {email: user.email, token: user.token})
      .then(function (res) {
        if (res.data.token) {
          const {data} = res
          sessionStorage.setItem("USER_TOKEN", JSON.stringify({email: user.email, token: data.token, user: data.user}))
          _setAPIToken(data.token)
          dispatch({type: "USER_LOGIN", userData: data.user, token: data.token})
          if (data.user.abilities) {
            ability.update(data.user.abilities)
          }
        }
        callback()
      })
      .catch(function (res) {
        localStorage.removeItem('USER_TOKEN')
        sessionStorage.removeItem('USER_TOKEN')
        callback()
      })
  } else if (user = (storageUserToken || false)) {
    if (user && user.token && user.email) {
      _setAPIToken(user.token)
      API.get('admin/info', {email: user.email, token: user.token})
        .then(function (res) {
          if (res.data.token) {
            const {data} = res
            sessionStorage.setItem("USER_TOKEN", JSON.stringify({email: user.email, token: data.token, user: data.user}))
            _setAPIToken(data.token)
            dispatch({type: "USER_LOGIN", userData: data.user, token: data.token})
            if (data.user.abilities) {
              ability.update(data.user.abilities)
            }
          }
          callback()
        })
        .catch(function (res) {
          localStorage.removeItem('USER_TOKEN')
          sessionStorage.removeItem('USER_TOKEN')
          callback()
        })
    }
  } else {
    callback()
  }
}

//***************** Admins *******************//

export const _addAdmin = (data, callback, callbackErr) => {
  API_WithSwal.post(`/admins`, data)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _editAdminInfo = (data, callback, callbackErr) => {
  API_WithSwal.put(`/admins/${data.id}`, data)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _deleteAdmin = (id, callback) => {
  API.delete(`/admins/${id}`)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function ({data}) {
    })
}

//***************** Scraping Jobs *******************//

export const _addScrapingJob = (data, callback, callbackErr) => {
  API_WithSwal.post(`/scrapingjobs`, data)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _editScrapingJob = (data, callback, callbackErr) => {
  API_WithSwal.put(`/scrapingjobs/${data.id}`, data)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _deleteScrapingJob = (id, callback) => {
  API.delete(`/scrapingjobs/${id}`)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function ({data}) {
    })
}
//************************************//
export const _startScrapingJob = (id, callback) => {
  API.delete(`/scrapingjob/start-scraping/${id}`)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function ({data}) {
    })
}

//***************** Notifications *******************//

export const _sendPushNotification = (data, callback, callbackErr) => {
  API_WithSwal.post(`/notifications`, data)
    .then(function ({data}) {
      callback(data)
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _getAllAdminsWithQ = async (q = '') => {
  const {data} =  await API.get('admin/getAllAdminsWithQ', {
    params: {
      limit: 20,
      q
    }
  })
  return _.map(data.municipalities, (v, k) => {
    return {value: v.id, label: v.name}
  })
}

//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
//************************************//
export const _loginTwoFactor = ({email, code}, callback, callbackErr) => {
  API.post('/login-2fa', {email, code})
    .then(function (res) {
      callback(res)
    })
    .catch(function ({data}) {
      callbackErr(data)
    })
}
//************************************//
export const _register = ({firstName, lastName, email}, callback, callbackErr) => {
    API.post('/register', {first_name: firstName, last_name: lastName, email})
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
            callbackErr(data.data)
        })
}
//************************************//
export const _forgetPassword = ({email}, callback, callbackErr) => {
    API.post('/forget-password', {email})
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
            callbackErr(data.data)
        })
}
//************************************//
export const _resetPassword = ({email, currentPassword, newPassword}, callback, callbackErr) => {
    API.post('/reset-password', {email, current_password:currentPassword, new_password:newPassword})
        .then(function (res) {
            callback(res)
        })
        .catch(function ({data}) {
            callbackErr(data.data)
        })
}
//************************************//
export const _changePassword = (data, callback, callbackErr) => {
  API.post('/user/account/change-password', {...data})
    .then(function ({data}) {
      callback(data)
    })
    .catch(function ({data}) {
      callbackErr(data.data)
    })
}
//************************************//
export const _logout = () => {
    return dispatch => {
        API.post('/logout')
            .then(function () {
                // ** Remove user, accessToken & refreshToken from localStorage
                localStorage.removeItem('USER_TOKEN')
                sessionStorage.removeItem('USER_TOKEN')
                _setAPIToken('')
                dispatch({ type: 'USER_LOGOUT' })
                location.reload()
            })
            .catch(function ({data}) {
            })
    }
}
//************************************//
export const _getMyProfile = (dispatch) => {
    API.get('/user/account/my-profile')
        .then(function ({data}) {
            const userToken = JSON.parse(sessionStorage.getItem('USER_TOKEN'))
            userToken.user = {...userToken.user, ...data.basic_info}
            sessionStorage.setItem("USER_TOKEN", JSON.stringify(userToken))
            dispatch({type: 'USER_MY_PROFILE', data})
        })
        .catch(function (res) {})
}
//************************************//
export const _changeBasicInfo = (data, callback, callbackErr) => {
    return dispatch => {
        API.post('/user/account/change-basic-info', data)
          .then(function ({data}) {
              _getMyProfile(dispatch)
          })
          .catch(function ({data}) {
              callbackErr(data.data)
          })
    }

}
//************************************//
export const _changeGeneralInfo = (data, callback, callbackErr) => {
    return dispatch => {
        API.post('/user/account/change-general-info', {...data})
          .then(function ({data}) {
              _getMyProfile(dispatch)
          })
          .catch(function ({data}) {
              callbackErr(data.data)
          })
    }

}
//************************************//
export const _saveSupportEmail = (data, callback, callbackErr) => {
    API.post('support/store', {...data})
      .then(function ({data}) {
      })
      .catch(function ({data}) {
          callbackErr(data.data)
      })

}
