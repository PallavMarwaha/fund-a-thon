export default function UserFundraisers() {
    return (
        <div className="mx-auto">
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-center whitespace-nowrap text-gray-800 uppercase hover:text-gray-700 text-5xl">
                        Dashboard
                    </a>
                    <p className="text-lg text-gray-600 text-center">Here are your recently created fundraisers.</p>
                </div>
            </header>

            <div className="text-center">
                <form>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <div className="uk-inline md:w-6/12">
                                <a className="uk-form-icon" href="#" data-uk-icon="icon: search"></a>
                                <input className="uk-input" type="text" aria-label="Clickable icon" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="container p-6 mx-auto space-y-3 lg:space-y-0 lg:grid grid-cols-3 gap-3">
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
                    <img
                        alt="Office"
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                            10th Oct 2022
                        </time>

                        <a href="#">
                            <h3 className="mt-0.5 text-lg text-gray-900">
                                How to position your furniture for positivity
                            </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                            pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                            quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                            atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>
                    </div>
                </article>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
                    <img
                        alt="Office"
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                            10th Oct 2022
                        </time>

                        <a href="#">
                            <h3 className="mt-0.5 text-lg text-gray-900">
                                How to position your furniture for positivity
                            </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                            pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                            quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                            atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>
                    </div>
                </article>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
                    <img
                        alt="Office"
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                            10th Oct 2022
                        </time>

                        <a href="#">
                            <h3 className="mt-0.5 text-lg text-gray-900">
                                How to position your furniture for positivity
                            </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                            pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                            quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                            atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>
                    </div>
                </article>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
                    <img
                        alt="Office"
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        className="h-56 w-full object-cover"
                    />

                    <div className="bg-white p-4 sm:p-6">
                        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                            10th Oct 2022
                        </time>

                        <a href="#">
                            <h3 className="mt-0.5 text-lg text-gray-900">
                                How to position your furniture for positivity
                            </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                            pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                            quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                            atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
