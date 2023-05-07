export const routes = {
    home: "/",
    account: {
        login: "/account/login",
        signup: "/account/signup",
        dashboard: {
            base: "/account/dashboard",
            fundraisers: "fundraisers",
        },
    },
    about: "/about",
    fundraisers: {
        base: "/fundraisers",
        detail: ":fundraiserSlug",
        create: "/fundraisers/create",
    },
};
