import {API, API_WithSwal} from '../../utility/API'
import {_setAPIToken} from '../../utility/Utils'
import _ from "lodash"


//***************** Curators Vs Campaigns *******************//

export const _addCuratorVsCampaing = (data, callback, callbackErr) => {
    API.post(`/curator/curators_vs_campaigns`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//************************************//
export const _storeCuratorVsCampaignPlaylist = (data, callback, callbackErr) => {
    API_WithSwal.put(`/curator/curator_vs_campaign/playlist/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//************************************//
export const _submitCuratorVsCampaignPlaylist = (id, status, callback, callbackErr) => {
    API_WithSwal.put(`/curator/curator_vs_campaign/playlist/submit/${id}/${status}`)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//************************************//
export const _getCampaignInfo = (id, callback, callbackErr) => {
API.get(`/campaign/${id}`)
    .then(function ({data}) {
        callback(data)
    })
    .catch(function ({data}) {
    })
}
//************************************//
export const _getCampaignInfoforView = (id, callback, callbackErr) => {
    API.get(`/campaign/getforview/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}

//************************************//
export const _getCampaignByCuratorVsCampaignId = (id, callback, callbackErr) => {
API.get(`/curator/campaign/${id}`)
    .then(function ({data}) {
        callback(data)
    })
    .catch(function ({data}) {
    })
}

//************************************//
export const _getPublishedCampaigns = (data, callback, callbackErr) => {
API.get(`/published/campaigns`, {
    params: data
})
    .then(function ({data}) {
        callback(data)
    })
    .catch(function ({data}) {
    })
}


//***************** Users *******************//

export const _resendVerificationCode = () => {
    API_WithSwal.post(`/user/resend-code`)
        .then(function ({data}) {
        })
        .catch(function ({data}) {
        })
}

export const _getUserInfo = (id, callback) => {
    API.get(`/user/get-info/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}

export const _updateUser = (id, data, callback) => {
    API_WithSwal.post(`/user/update-user/${id}`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}

//***************** Payouts *******************//

//************************************//
export const _getPayoutInfo = (id, callback) => {
    API.get(`/curator/payouts/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _payPayout = (data, callback, callbackErr) => {
    const formData = new FormData()
    _.each(data, (x, key) => {
        if (key === 'attachment_link') {
            if (!_.isString(x)) {
                formData.append(key, x[0])
            }
        } else {
            formData.append(key, x)
        }
    })
    API_WithSwal.post(`/curator/payout/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//***************** Invoices *******************//

//************************************//
export const _getInvoiceInfo = (id, callback) => {
    API.get(`/artist/invoices/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _payInvoice = (data, callback, callbackErr) => {
  API_WithSwal.post(`/artist/invoice/${data.id}`, data)
    .then(function () {
      callback()
    })
    .catch(function (data) {
      callbackErr(data?.data?.errors)
    })
}
//************************************//
export const _login = ({email, password}, callback, callbackErr) => {
    API.post('user/login', {email, password})
        .then(function (res) {
            callback(res)
        })
        .catch(function (res) {
            callbackErr(res)
        })
}

//************************************//
export const _autoLogin = (dispatch, ability, callback) => {
  const storageUserToken = JSON.parse(localStorage.getItem('AUTH_TOKEN'))
  const sessionUserToken = JSON.parse(sessionStorage.getItem('AUTH_TOKEN'))
  let user = (sessionUserToken || false)
  if (user && user.token && user.user) {
    _setAPIToken(user.token)
    // dispatch({type:"USER_LOGIN", userData:user.user, token:user.token})
    // if (user.user.abilities) {
    //   ability.update(user.user.abilities)
    // }
    API.get('user/info', {email: user.email, token: user.token})
      .then(function (res) {
        if (res.data.token) {
          const {data} = res
          sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({email: user.email, token: data.token, user: data.user}))
          _setAPIToken(data.token)
          dispatch({type: "USER_LOGIN", userData: data.user, token: data.token})
          if (data.user.abilities) {
            ability.update(data.user.abilities)
          }
        }
        callback()
      })
      .catch(function (res) {
        localStorage.removeItem('AUTH_TOKEN')
        sessionStorage.removeItem('AUTH_TOKEN')
        callback()
      })
  } else if (user = (storageUserToken || false)) {
    if (user && user.token && user.email) {
      _setAPIToken(user.token)
      API.get('user/info', {email: user.email, token: user.token})
        .then(function (res) {
          if (res.data.token) {
            const {data} = res
            sessionStorage.setItem("AUTH_TOKEN", JSON.stringify({email: user.email, token: data.token, user: data.user}))
            _setAPIToken(data.token)
            dispatch({type: "USER_LOGIN", userData: data.user, token: data.token})
            if (data.user.abilities) {
              ability.update(data.user.abilities)
            }
          }
          callback()
        })
        .catch(function (res) {
          localStorage.removeItem('AUTH_TOKEN')
          sessionStorage.removeItem('AUTH_TOKEN')
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
export const _getAllGenresWithQ = async (q = '') => {
    const {data} =  await API.get('genre/getAllGenresWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.genres, (v, k) => {
        return {value: v.id, label: v.name}
    })
}

//************************************//
export const _getAllInterestsWithQ = (q = '', type, callback) => {
    API.get('interest/getAllInterestsWithQ', {
        params: {
            limit: 20,
            q,
            type
        }
    }).then(function ({data}) {
        callback(data)
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
export const _register = (data, callback, callbackErr) => {
    API.post('/user/store-user', data)
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
export const _resetPassword = (data, callback, callbackErr) => {
    API.post('/user/reset-password', data)
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
    //     API.post('/logout')
    //         .then(function () {
                // ** Remove user, accessToken & refreshToken from localStorage
                localStorage.removeItem('AUTH_TOKEN')
                sessionStorage.removeItem('AUTH_TOKEN')
                _setAPIToken('')
                dispatch({ type: 'USER_LOGOUT' })
            //     location.reload()
            // })
            // .catch(function ({data}) {
            // })
    }
}
//************************************//
export const _getMyProfile = (dispatch) => {
    API.get('/user/account/my-profile')
        .then(function ({data}) {
            const userToken = JSON.parse(sessionStorage.getItem('AUTH_TOKEN'))
            userToken.user = {...userToken.user, ...data.basic_info}
            sessionStorage.setItem("AUTH_TOKEN", JSON.stringify(userToken))
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
//************************************//
export const _getAllGenresWithQForFilter = (q = '', callback) => {
    API.get('genre/getAllGenresWithQ', {
        params: {
            limit: 100,
            q
        }
    }).then(function({data}) {
        callback(data.genres)
    })
}
//************************************//
export const _getAllTiersWithQForFilter =  (q = '', type, callback) => {
    API.get('tier/getAllTiersWithQ', {
        params: {
            limit: 100,
            q,
            type
        }
    }).then(({data}) => {
        callback(data.tiers)
    })
}
