import {API, API_WithSwal} from '../../utility/API'
import _ from "lodash"

//***************** Scraping Jobs *******************//

export const _addScrapingJob = (data, callback, callbackErr) => {
    API_WithSwal.post(`/store/scraping-job/multiple`, data)
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
export const _updateArtist = (data, callback, callbackErr) => {
    API_WithSwal.post(`/artist/crm/edit/${data.id}`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (data) {
            callbackErr(data?.data?.errors)
        })
}
//************************************//
export const _addArtist = (data, callback, callbackErr) => {
    API_WithSwal.post(`/artist/crm/store`, data)
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
export const _deleteCrmArtist = (id, callback) => {
    API.delete(`/artist/crm/delete/${id}`)
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
//************************************//
export const _scrapeEmails = (id, callback, callbackError, callbackFinally) => {
    API.delete(`/playlist/artists/scrape/emails/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function (res) {
            callbackError(res)
        })
        .finally(() => {
            callbackFinally()
        })
}
//************************************//
export const _getPlaylistDetails = (id, callback) => {
    API.get(`/scraping-job/get/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getArtistInfo = (id, callback) => {
    API.get(`/artist/info/get/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _logMoveToCrmAction = (id, callback = () => {}) => {
    API.post(`/move_to_crm/log/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _checkArtistRepeat = (id, callback) => {
    API.post(`/playlist/artist/check-repeat/${id}`)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _resolveArtistConflict = (id, data, callback, callbackFinal) => {
    API.post(`/playlist/artist/repeated/action/${id}`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
        .finally(() => {
            callbackFinal()
        })
}
//************************************//
export const _editTempArtistMail = (id, data, callback) => {
    API.post(`/artist/update/temp/${id}`, data)
        .then(function ({data}) {
            callback(data)
        })
        .catch(function ({data}) {
        })
}
//************************************//
export const _getAllLogTypesWithQ = async (q = '') => {
    const {data} =  await API.get('log/getAllLogTypesWithQ', {
        params: {
            limit: 20,
            q
        }
    })
    return _.map(data.log_types, (v, k) => {
        return {value: v.id, label: v.name}
    })
}