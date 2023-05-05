export const routes = {
    home: "/",
    account: {
        login: "/account/login",
        signup: "/account/signup",
    },
    about: "/about",
    fundraisers: {
        base: "/fundraisers",
        detail: ":fundraiserSlug",
        create: "/fundraisers/create",
    },
};
