/* jshint esversion: 6 */

const
	{ version } = require('./package'),
	{ request } = require('./request'),
	paths = { hostname: "api.server-discord.com" };

/**
 * @author SQDSH
 * @module
 * @param {string} token
 */
module.exports = function (token) {
	if(!token) return console.error("[sdc-api] Ошибка аргументов | Не указан API ключ!");

	/**
	 * @function
	 * @param {string} uri
	 * @param {string} method
	 * @param {object} data
	 * @returns {{path: string, headers: {Authorization: string, 'User-Agent': string}, hostname: string, method: string, body: object}|void}
	 */
	let options = (uri, method = "GET", data = null) => {
		if (!uri) return console.error("[sdc-api] Ошибка в работе модуля | Не указан адрес метода.");

		let toRequest = {
			method: method,
			hostname: paths.hostname,
			path: "/v2" + uri,
			headers: {
				'User-Agent': `sdc-api/${version} (${uri})`,
				'Authorization': 'SDC ' + token
			}
		};
		
		if(data !== null) toRequest.body = data;
		return toRequest;
	};

	/**
	 * @function
	 * @param {string} guildID
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.guild = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");

		return request(options(`/guild/${guildID}`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	/**
	 * @function
	 * @param {string} guildID
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.guildPlace = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");

		return request(options(`/guild/${guildID}/place`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	/**
	 * @function
	 * @param {string} guildID
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.guildRated = (guildID) => {
		if(!guildID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID сервера!");

		return request(options(`/guild/${guildID}/rated`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	/**
	 * @function
	 * @param {string} userID
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.userRated = (userID) => {
		if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");

		return request(options(`/user/${userID}/rated`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	/**
	 * @function
	 * @param {string} userID
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.warns = (userID) => {
		if(!userID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID пользователя!");

		return request(options(`/warns/${userID}`))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};

	/**
	 * @function
	 * @param {string} botID
	 * @param {object} data
	 * @returns {PromiseLike<Object>|Promise<Object>|void}
	 */
	this.updateStat = (botID, data = { servers: 0, shards: 0 }) => {
		if(!botID) return console.error("[sdc-api] Ошибка аргументов | Не указан ID бота!");
		if(!data.servers || !data.shards) return console.error("[sdc-api] Ошибка аргументов | В объекте не обнаружены servers и shards!");
		
		return request(options(`/bots/${botID}/stats`, "POST", data))
			.then((r) => r, (e) => console.error("[sdc-api] Ошибка в работе | ", e));
	};
};