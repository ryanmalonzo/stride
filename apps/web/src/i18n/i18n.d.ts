import type auth from "./locales/en/auth.json";
import type form from "./locales/en/form.json";
import type misc from "./locales/en/misc.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "auth";
		resources: {
			auth: typeof auth;
			form: typeof form;
			misc: typeof misc;
		};
	}
}
