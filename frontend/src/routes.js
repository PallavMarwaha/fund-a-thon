export const routes = {
    home: "/",
    account: {
        login: "/account/login",
        signup: "/account/signup",
        dashboard: "/account/dashboard",
    },
    about: "/about",
    fundraisers: {
        base: "/fundraisers",
        detail: ":fundraiserSlug",
        create: "/fundraisers/create",
    },
};
