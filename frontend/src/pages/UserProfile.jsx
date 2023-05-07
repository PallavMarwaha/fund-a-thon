export default function UserProfile() {
    return (
        <div className="mx-auto lg:w-8/12">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap justify-evenly">
                    <div className="md:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 mr-4">
                        <img
                            className="object-cover object-center w-full h-full min-w-full"
                            src="https://i.pravatar.cc/600"
                            alt="stats"
                            height={600}
                            width={300}
                        />
                    </div>
                    <div className="mt-8 md:mt-auto flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                        <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-center md:text-left text-2xl mb-2 text-gray-900">
                                John Doe
                            </h1>
                            <div className="leading-relaxed">A member of Fund-a-Thon community.</div>
                            <div className="leading-relaxed mt-2">@johndoe</div>
                            <div className="leading-relaxed mt-2">mail: johndoe@mail.com</div>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
                            <p className="leading-relaxed">Fundraisers</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2>
                            <p className="leading-relaxed">Funds</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                            <p className="leading-relaxed">Likes</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
                            <p className="leading-relaxed">Comments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Most popular fundraisers */}
            <section className="mb-8 px-6">
                <h2 className="mb-2 mt-0 text-2xl font-bold leading-tight text-black font-bold">
                    Your popular fundraisers
                </h2>
                <div className="lg:grid grid-cols-3 gap-3">
                    <article className="mt-2 overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
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

                    <article className="mt-2 overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
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

                    <article className="mt-2 overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
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

                    <article className="mt-2 overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
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
            </section>
        </div>
    );
}
