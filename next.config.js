/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		MAP_API_KEY: process.env.MAP_API_KEY,
		API_URL: process.env.API_URL
	}
};
