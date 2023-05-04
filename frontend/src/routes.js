export const routes = {
    home: "/",
    account: {
        login: "/account/login",
        signup: "/account/signup",
    },
    fundraisers: {
        detail: ":fundraiserSlug",
    },
};
