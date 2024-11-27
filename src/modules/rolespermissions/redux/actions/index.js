
//***************** Roles And Permissions *******************//

import _ from "lodash"
import {API, API_WithSwal} from "../../utility/API"

export const _getPermissions = (callback, callbackErr) => {
	API.get(`/permissions`)
		.then(function ({data}) {
			callback(data)
		})
		.catch(function (data) {
			callbackErr(data?.data?.errors)
		})
}
//************************************//
export const _getRoles = (callback, callbackErr) => {
	API.get(`/roles`)
		.then(function ({data}) {
			callback(data)
		})
		.catch(function (data) {
			callbackErr(data?.data?.errors)
		})
}
//************************************//
export const _addRole = (data, callback, callbackErr) => {
	API_WithSwal.post(`/roles`, data)
		.then(function ({data}) {
			callback(data)
		})
		.catch(function (data) {
			callbackErr(data?.data?.errors)
		})
}
//************************************//
export const _editRole = (data, callback, callbackErr) => {
	API_WithSwal.put(`/roles/${data.id}`, data)
		.then(function ({data}) {
			callback(data)
		})
		.catch(function (data) {
			callbackErr(data?.data?.errors)
		})
}
//************************************//
export const _deleteRole = (id, callback) => {
	API.delete(`/roles/${id}`)
		.then(function ({data}) {
			callback(data)
		})
		.catch(function ({data}) {
		})
}

//************************************//
export const _getAllRolesWithQ = async (q = '') => {
	const {data} =  await API.get('getAllRolesWithQ', {
		params: {
			limit: 20,
			q
		}
	})
	return _.map(data.roles, (v, k) => {
		return {value: v.id, label: v.name.replace("_", " ")}
	})
}
