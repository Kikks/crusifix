/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com", "via.placeholder.com"]
	},
	env: {
		MAP_API_KEY: process.env.MAP_API_KEY,
		API_URL: process.env.API_URL
	}
};
