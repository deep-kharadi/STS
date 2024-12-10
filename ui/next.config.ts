// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;
import { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactStrictMode: false,  // Enables React's Strict Mode for identifying potential problems
	// swcMinify: true,        // Enables SWC-based minification for better performance
	// ExperimentalConfig: {
	//   appDir: true
	//   // Enables future Next.js features that are experimental
	//   // appDir: true,         // Enables the new App Directory feature (if needed)
	// },
	images: {
		// Allows you to configure image optimization settings
		domains: ["example.com"], // Replace with your allowed image domains
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
}

export default nextConfig
