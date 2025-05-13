const featuredTestimonial = {
    body: 'They didn’t just meet expectations — they redefined them. Our entire team is better off because of this experience.',
    author: {
        name: 'Emily Chen',
        handle: 'emchen',
        imageUrl:
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
}

const testimonials = [
    [
        [
            {
                body: 'From day one, the team made me feel supported and heard. The results spoke for themselves within weeks.',
                author: {
                    name: 'Leslie Alexander',
                    handle: 'lesliealexander',
                    imageUrl:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            {
                body: 'They took the time to understand our unique challenges and crafted a solution that was not only effective but also sustainable.',
                author: {
                    name: 'Camilla Williamson',
                    handle: 'camwilliamson',
                    imageUrl:
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            {
                body: 'The team’s attention to detail and commitment to our goals was evident in every interaction. They truly care about their clients.',
                author: {
                    name: 'Brian Foster',
                    handle: 'brianfoster',
                    imageUrl:
                        'https://images.unsplash.com/photo-1696487774190-3e6755c4706b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
        [
            {
                body: 'Every conversation was productive, every milestone clear. It’s rare to feel this confident in a partnership.',
                author: {
                    name: 'Floyd Miles',
                    handle: 'floydmiles',
                    imageUrl:
                        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            }
        ],
    ],
    [
        [
            {
                body: 'Working with them was a breath of fresh air. Professional, passionate, and genuinely invested in our success.',
                author: {
                    name: 'Tom Cook',
                    handle: 'tomcook',
                    imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
        [
            {
                body: 'We’ve collaborated with many agencies before, but none matched the clarity, creativity, and care they delivered.',
                author: {
                    name: 'Leonard Krasner',
                    handle: 'leonardkrasner',
                    imageUrl:
                        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            {
                body: 'This wasn’t just a service — it was a journey that transformed how we work and how we show up to our customers.',
                author: {
                    name: 'jacob Jones',
                    handle: 'jacobjones',
                    imageUrl:
                        'https://images.unsplash.com/photo-1696315289656-d088e53cc6b6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
            {
                body: 'Smart, focused, and kind — you can tell they genuinely care about delivering something meaningful.',
                author: {
                    name: 'Jenny Wilson',
                    handle: 'jennywilson',
                    imageUrl:
                        'https://images.unsplash.com/photo-1663707332674-569fb9b0ca2a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
            },
        ],
    ],
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Testimonials() {
    return (
        <div className="relative isolate bg-white pt-24 pb-32 sm:pt-32">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#101828] to-[#fffbeb]"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#fffbeb] to-[#101828] xl:mr-[calc(50%-12rem)] xl:ml-0"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base/7 font-semibold text-indigo-600">Testimonials</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                        We are a people-first company seeking action driven results and meaningful impact.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                    <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                        <blockquote className="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
                            <p>{`“${featuredTestimonial.body}”`}</p>
                        </blockquote>
                        <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                            <img
                                alt=""
                                src={featuredTestimonial.author.imageUrl}
                                className="size-10 flex-none rounded-full bg-gray-50"
                            />
                            <div className="flex-auto">
                                <div className="font-semibold">{featuredTestimonial.author.name}</div>
                                <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                            </div>
                            <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" />
                        </figcaption>
                    </figure>
                    {testimonials.map((columnGroup, columnGroupIdx) => (
                        <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                            {columnGroup.map((column, columnIdx) => (
                                <div
                                    key={columnIdx}
                                    className={classNames(
                                        (columnGroupIdx === 0 && columnIdx === 0) ||
                                            (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                                            ? 'xl:row-span-2'
                                            : 'xl:row-start-1',
                                        'space-y-8',
                                    )}
                                >
                                    {column.map((testimonial) => (
                                        <figure
                                            key={testimonial.author.handle}
                                            className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                                        >
                                            <blockquote className="text-gray-900">
                                                <p>{`“${testimonial.body}”`}</p>
                                            </blockquote>
                                            <figcaption className="mt-6 flex items-center gap-x-4">
                                                <img alt="" src={testimonial.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                                                <div>
                                                    <div className="font-semibold">{testimonial.author.name}</div>
                                                    <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
