import {API, API_WithSwal, SPOTIFY_API} from "../../utility/API"
import _ from "lodash"
import axios from "axios"
import {API_WithSwal as Artist_API_WithSwal} from '@modules/artist/utility/API'

//***************** Genres *******************//

export const _addGenre = (data, callback, callbackErr) => {
    API_WithSwal.post(`/genres`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _editGenre = (data, callback, callbackErr) => {
    API_WithSwal.put(`/genres/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteGenre = (id, callback) => {
    API.delete(`/genres/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
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

//***************** Tiers *******************//

export const _addTier = (data, callback, callbackErr) => {
    API_WithSwal.post(`/tiers`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _editTier = (data, callback, callbackErr) => {
    API_WithSwal.put(`/tiers/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteTier = (id, callback) => {
    API.delete(`/tiers/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getAllTiersWithQ = async (q = '', type) => {
    const {data} =  await API.get('tier/getAllTiersWithQ', {
        params: {
            limit: 20,
            q,
            type
        }
    })
    return _.map(data.tiers, (v, k) => {
        return {value: v.id, label: `${v.name} - $${v.price}`}
    })
}
//************************************//
export const _getAllTiers = (q = '', type, callback) => {
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

//***************** Users *******************//

//************************************//
export const _approveUser = (id, callback) => {
    API.delete(`/user/${id}/approve`)
      .then(function ({data}) {
          callback(data)
      })
      .catch(function ({data}) {
      })
}
//************************************//
export const _declineUser = (id, callback) => {
    API.delete(`/user/${id}/decline`)
      .then(function ({data}) {
          callback(data)
      })
      .catch(function ({data}) {
      })
}
//************************************//
export const _getUserInfo = (id, callback) => {
    API.get(`/users/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getArtistInfo = (id, callback) => {
    API.get(`/users/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _addUser = (data, callback, callbackErr) => {
    API_WithSwal.post(`/users`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _editUser = (data, callback, callbackErr) => {
    API_WithSwal.put(`/users/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteUser = (id, callback) => {
    API.delete(`/users/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getAllArtistsWithQ = async (q = '') => {
    const {data} =  await API.get('user/getAllArtistsWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.users, (v, k) => {
        return {value: v.id, label: v.name}
    })
}
//************************************//
export const _getAllCuratorsWithQ = async (q = '') => {
    const {data} =  await API.get('user/getAllCuratorsWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.users, (v, k) => {
        return {value: v.id, label: v.name}
    })
}
//************************************//
export const _getAllCuratorVsCampaignStatusWithQ = async (q = '') => {
    const {data} =  await API.get('statuses/getAllCuratorVsCampaignStatusWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.statuses, (v, k) => {
        return {value: v.id, label: v.name}
    })
}

//***************** Genres *******************//

export const _addUserType = (data, callback, callbackErr) => {
    API_WithSwal.post(`/userTypes`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _editUserType = (data, callback, callbackErr) => {
    API_WithSwal.put(`/userTypes/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteUserType = (id, callback) => {
    API.delete(`/userTypes/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}

//***************** Interests *******************//

export const _addInterest = (data, callback, callbackErr) => {
    API_WithSwal.post(`/interests`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _editInterest = (data, callback, callbackErr) => {
    API_WithSwal.put(`/interests/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteInterest = (id, callback) => {
    API.delete(`/interests/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}


//************************************//
export const _getAllUserTypesWithQ = async (q = '') => {
    const {data} =  await API.get('userType/getAllUserTypesWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.userTypes, (v, k) => {
        return {value: v.id, label: v.name}
    })
}


//************************************//
export const _getAllCampaignTypesWithQ = async (q = '') => {
    const {data} =  await API.get('campaignType/getAllCampaignTypesWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.campaignTypes, (v, k) => {
        return {value: v.id, label: v.name}
    })
}

//***************** Languages *******************//

//************************************//
export const _getAllLanguagesWithQ = async (q = '') => {
    const {data} =  await API.get('language/getAllLanguagesWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.languages, (v, k) => {
        return {value: v.id, label: v.name}
    })
}


//***************** Campaigns *******************//

export const _getCampaignInfo = (id, callback) => {
    API.get(`/campaigns/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _addCampaign = (data, callback, callbackErr) => {
    const formData = new FormData()
    _.each(data, (x, key) => {
        if (key === 'media_link' && !_.isString(x)) {
            if (!_.isEmpty(x)) {
                formData.append(key, x[0])
            }
        } else {
            if (x) {
                formData.append(key, x)
            }
        }
    })

    if (process.env.REACT_APP_AUTH_MODULE === 'artist') {
        Artist_API_WithSwal.post(`/artist/campaigns`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(function () {
                callback()
            })
            .catch(function (data) {
                callbackErr(data?.data?.errors)
            })
    } else {
        API_WithSwal.post(`/campaigns`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(function () {
                callback()
            })
            .catch(function (data) {
                callbackErr(data?.data?.errors)
            })
    }
}
//************************************//
export const _editCampaign = (data, callback, callbackErr) => {
    const formData = new FormData()
    _.each(data, (x, key) => {
        if (key === 'media_link') {
            if (!_.isString(x)) {
                formData.append(key, x[0])
            }
        } else {
            formData.append(key, x)
        }
    })
    if (process.env.REACT_APP_AUTH_MODULE === 'artist') {
        Artist_API_WithSwal.post(process.env.REACT_APP_AUTH_MODULE === 'artist' ? `/artist/campaign/update/${data.id}` : `/campaign/update/${data.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(function () {
                callback()
            })
            .catch(function (data) {
                callbackErr(data?.data?.errors)
            })
    } else {
        API_WithSwal.post(process.env.REACT_APP_AUTH_MODULE === 'artist' ? `/artist/campaign/update/${data.id}` : `/campaign/update/${data.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(function () {
                callback()
            })
            .catch(function (data) {
                callbackErr(data?.data?.errors)
            })
    }
}
//************************************//
export const _deleteCampaign = (id, callback) => {
    API.delete(`/campaigns/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
// //************************************//
// export const _checkUriUrl = (link, callback) => {
//     if (_.startsWith(link, 'https://open.spotify.com/track/')) {
//         const id = link.split('/')[link.split('/').length - 1]
//         SPOTIFY_API.get(`/tracks/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('spotify_token')}`}})
//             .then((data) => callback(data))
//     }
// }
//************************************//
export const _checkUriUrl = (link, callback) => {
    if (_.startsWith(link, 'https://open.spotify.com/track/')) {
        const track_id = link.split('/')[link.split('/').length - 1]
        SPOTIFY_API.get(`/get-track`, {
            params: {
                track_id
            }
        })
          .then(({data}) => callback({code: 1, other: data?.track}))
    } else {
        callback({code:2})
    }
}
//************************************//
// export const _checkPlaylistIfTrackIsValid = (link, callback) => {
//
//     if (_.startsWith(link, 'https://open.spotify.com/playlist/')) {
//         const id = link.split('/')[link.split('/').length - 1]
//         SPOTIFY_API.get(`/playlists/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('spotify_token')}`}})
//           .then((data) => callback(data))
//     }
// }
export const _checkPlaylistIfTrackIsValid = (link, callback) => {

    if (_.startsWith(link, 'https://open.spotify.com/playlist/')) {
        const playlist_id = link.split('/')[link.split('/').length - 1]
        SPOTIFY_API.get(`/get-playlist`, {
            params: {
                playlist_id
            }
        })
          .then(({data}) => callback({code:1, ...data?.playlist}))
    } else {
        callback({code: 2})
    }
}
//************************************//
export const _publishCampaign = (id, callback) => {
    API.post(`/campaign/${id}/publish`, {publish_date:'2022-10-10'})
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _approveCampaign = (id, callback) => {
    API.delete(`/campaign/${id}/approve`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _declineCampaign = (id, callback) => {
    API.delete(`/campaign/${id}/decline`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _storeCampaignBudget = (data, callback) => {
    API.post(`/campaign/${data.id}/storeBudget`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}

//***************** Payouts *******************//

//************************************//
export const _getPayoutInfo = (id, callback) => {
    API.get(`/payouts/${id}`)
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
    API_WithSwal.post(`/payout/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//************************************//
export const _payPayoutWithWise = (id, callback, callbackErr) => {
    API.post(`/payout/pay/wise/${id}`)
      .then(function ({data}) {
          callback(data)
      })
      .catch(function ({data}) {
      })
}
//***
//***************** Invoices *******************//

//************************************//
export const _getInvoiceInfo = (id, callback) => {
    API.get(`/invoices/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _payInvoice = (data, callback, callbackErr) => {
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
    API_WithSwal.post(`/invoice/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}

//***************** Curators Vs Campaigns *******************//

export const _addCuratorVsCampaing = (data, callback, callbackErr) => {
    API_WithSwal.post(`/curators_vs_campaigns`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _addAdminVsCampaign = (data, callback, callbackErr) => {
    API_WithSwal.post(`/campaign/admins_vs_campaigns/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _editCuratorVsCampaign = (data, callback, callbackErr) => {
    API_WithSwal.put(`/curators_vs_campaigns/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _storeCuratorVsCampaignPlaylist = (data, callback, callbackErr) => {
    API_WithSwal.put(`/curator_vs_campaign/playlist/${data.id}`, data)
        .then(function () {
            callback()
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _storeCuratorVsCampaignPlaylistPositioning = (data, callback, callbackErr) => {
    API.put(`/curator_vs_campaign/playlist/positioning/${data.id}`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _resetPassword = (user_id, callback, callbackErr) => {
    API_WithSwal.post(`/reset-password`, {user_id})
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//

export const _inviteUser = (user_id, callback, callbackErr) => {
    API_WithSwal.post(`/invite-user`, {user_id})
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _deleteCuratorVsCampaignPlaylistPositioning = (id, callback = () => {}, callbackErr = () => {}) => {
    API_WithSwal.delete(`/curator_vs_campaign/position-history/destroy/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _approveCuratorVsCampaign = (id, callback) => {
    API.delete(`/curator_vs_campaign/${id}/approve`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _declineCuratorVsCampaign = (id, callback) => {
    API.delete(`/curator_vs_campaign/${id}/decline`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _changeCuratorVsCampaignStatus = (id, status, callback) => {
    API.delete(`/curator_vs_campaign/change_status/${id}/${status}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getDashboardSummary = (callback, callbackErr) => {
    API.get(`/campaigns/getSummary`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
            // callbackErr(data.errors)
        })
}
//************************************//
export const _getPaymentSummary = (callback, callbackErr) => {
    API.get(`campaigns/paymentSymmary`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
            // callbackErr(data.errors)
        })
}

