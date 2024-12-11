import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	verbose: true,

};

export default config;
