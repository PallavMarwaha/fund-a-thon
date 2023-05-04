export function PostDetail() {
    return (
        <div className="md:container mx-auto flex flex-wrap py-6">
            <section className="w-full md:w-2/3 flex flex-col items-center px-3 mx-auto">
                <article className="flex flex-col shadow my-4">
                    <a href="#" className="hover:opacity-75">
                        <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
                    </a>
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">
                            4th May, 2023 - 10th May, 2023
                        </a>
                        <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
                            Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
                        </a>
                        <p href="#" className="text-sm pb-8">
                            <a href="#" className="font-semibold hover:text-gray-800">
                                - David Grzyb
                            </a>
                            , Published on April 25th, 2020
                        </p>
                        <h1 className="text-2xl font-bold pb-3">Introduction</h1>
                        <p className="pb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero
                            suscipit suscipit eu eu urna. Proin bibendum urna mattis ante malesuada ultrices. Etiam in
                            turpis vitae elit dictum aliquet. Donec mattis risus in turpis dapibus, eget tempus sem
                            tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                            mus. In est enim, imperdiet sed ornare quis, pellentesque vel risus. Nunc vitae vestibulum
                            turpis. Quisque eget eleifend urna. Etiam et vulputate purus, ut egestas sem. Vestibulum
                            ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis quis neque
                            non urna venenatis mollis et at massa. Pellentesque sem lacus, malesuada vel hendrerit
                            molestie, mollis vel elit.
                        </p>
                        <h1 className="text-2xl font-bold pb-3">Heading</h1>
                        <p className="pb-3">
                            Vivamus nec facilisis elit, quis congue justo. In non augue ex. Aenean pretium facilisis
                            hendrerit. Sed sed imperdiet dui. Etiam faucibus a diam sed vehicula. Nullam commodo lacus
                            tincidunt, tincidunt orci sed, dapibus leo. Vivamus vulputate quis risus a ultricies.
                            Aliquam luctus id tellus non condimentum. Aenean maximus viverra ipsum eget vestibulum.
                            Morbi ut tincidunt sem, efficitur volutpat tortor. Donec scelerisque, ipsum eu efficitur
                            semper, neque turpis sodales quam, in aliquam elit lacus varius lorem. Ut ut diam id leo
                            efficitur malesuada eget in velit. Pellentesque tristique orci nunc, vitae fermentum nibh
                            luctus eu. Mauris condimentum justo sed ipsum egestas varius.
                        </p>
                        <p className="pb-3">
                            Sed sagittis odio a volutpat feugiat. Cras aliquam varius justo, a rhoncus ante bibendum id.
                            Nulla maximus nisl sed enim maximus, ut dictum lectus hendrerit. Fusce venenatis tincidunt
                            eros. Phasellus quis augue vulputate ipsum pellentesque fringilla. Morbi nec tempor felis.
                            Maecenas sollicitudin pellentesque dui, sit amet scelerisque mauris elementum nec. Cras ante
                            metus, mattis in malesuada in, fermentum a nunc. Suspendisse potenti. Sed tempor lacus sed
                            commodo dignissim. Quisque dictum, dolor auctor iaculis cursus, ipsum urna porttitor ex, sed
                            consequat nisi tellus eget ante. Duis molestie mollis eros, eu sollicitudin mauris lobortis
                            quis.
                        </p>
                        <p className="pb-3">
                            Vivamus sed neque nec massa scelerisque imperdiet eget id sapien. Fusce elementum mi id
                            malesuada luctus. Proin quis lorem id leo porta interdum non ac nisl. Integer nulla sem,
                            ultrices sed neque eget, blandit condimentum metus. Aliquam eget malesuada sapien. Curabitur
                            aliquet orci sit amet ex tincidunt convallis. Mauris urna mi, consequat mattis mollis a,
                            dignissim eget sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                            cubilia Curae; Nam facilisis sem diam, viverra consequat metus consequat vel. Cras a mi eu
                            ex luctus malesuada quis eu ante. Aliquam erat volutpat.
                        </p>
                        <h1 className="text-2xl font-bold pb-3">Conclusion</h1>
                        <p className="pb-3">
                            Donec vulputate auctor leo lobortis congue. Sed elementum pharetra turpis. Nulla at
                            condimentum odio. Vestibulum ullamcorper enim eget porttitor bibendum. Proin eros nibh,
                            maximus vitae nisi a, blandit ultricies lectus. Vivamus eu maximus lacus. Maecenas imperdiet
                            iaculis neque, vitae efficitur felis vestibulum sagittis. Nunc a eros aliquet, egestas
                            tortor hendrerit, posuere diam. Proin laoreet, ligula non eleifend bibendum, orci nulla
                            luctus ipsum, dignissim convallis quam dolor et nulla.
                        </p>
                        <hr className="m-4" />

                        {/* <h1 className="text-2xl font-bold pb-3">Fundraiser info</h1> */}
                        <div className="">
                            <progress id="js-progressbar" className="uk-progress" value="10" max="100"></progress>
                            <div className="flex justify-between">
                                <p className="pb-3">Rs.600</p>
                                <p className="pb-3">Rs.10000</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pb-3 uk-text-meta">(Funds raised)</p>
                                <p className="pb-3 uk-text-meta">(Funds required)</p>
                            </div>
                        </div>

                        <div>
                            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                                <p className="text-xl font-semibold pb-5">Photos</p>
                                <div className="grid grid-cols-3 gap-3">
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* Comments */}
                <div>
                    <h2 className="font-bold text-2xl m-2">Comments</h2>
                    <article className="uk-comment bg-gray-50 p-4" role="comment">
                        <header className="uk-comment-header">
                            <div className="uk-grid-medium uk-flex-middle flex">
                                <div className="uk-width-auto">
                                    <img
                                        className="uk-comment-avatar"
                                        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                                        width="80"
                                        height="80"
                                        alt=""
                                    />
                                </div>
                                <div className="uk-width-expand">
                                    <h4 className="uk-comment-title uk-margin-remove">
                                        <a className="uk-link-reset" href="#">
                                            User
                                        </a>
                                    </h4>
                                    <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                        <li>
                                            <a href="#">12 days ago</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </header>
                        <div className="uk-comment-body">
                            <p>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                                sanctus est Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                    </article>
                </div>

                {/* TODO: Add navigation and about author divs */}
                {/* Previous and Next links */}
                {/* <div className="w-full flex pt-6">
                    <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                        <p className="text-lg text-blue-800 font-bold flex items-center">
                            <i className="fas fa-arrow-left pr-1"></i> Previous
                        </p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </a>
                    <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                        <p className="text-lg text-blue-800 font-bold flex items-center justify-end">
                            Next <i className="fas fa-arrow-right pl-1"></i>
                        </p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </a>
                </div> */}

                {/* About the author */}
                {/* <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                    <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                        <img
                            src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                            className="rounded-full shadow h-32 w-32"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center md:justify-start">
                        <p className="font-semibold text-2xl">David</p>
                        <p className="pt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero
                            suscipit suscipit eu eu urna.
                        </p>
                    </div>
                </div> */}
            </section>
        </div>
    );
}
