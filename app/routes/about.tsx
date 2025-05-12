
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Header from '~/components/Header'
import Footer from '~/components/Footer'


const stats = [
  { label: 'Founded in', value: '2025' },
  { label: 'Team size', value: '8' },
  { label: 'Based', value: 'UK' },
]
const values = [
  {
    name: 'Pride in the details',
    description:
      'We care deeply about quality. Whether it’s clean design or thoughtful features, we believe great work is built through care, craft, and consistency.',
  },
  {
    name: 'Wired to wander',
    description:
      'Curiosity fuels everything we do — from reimagining how people experience travel to helping them find joy in unexpected places.',
  },
  {
    name: 'Real people, real stories',
    description:
      'We show up as ourselves: honest, imperfect, and always human. That’s where true connection starts — with authenticity.',
  },
  {
    name: 'Do the right thing',
    description:
      'We’re led by values, not just metrics. We build with empathy and try to leave things better than we found them — for people and the planet.',
  },
  {
    name: 'Find joy in the journey',
    description:
      'Life isn’t just about ticking off destinations. It’s about the people you meet, the lessons you learn, and the stories you collect along the way.',
  },
  {
    name: 'Driven by meaning',
    description:
      'We support ideas that matter — from sustainability to representation — and turn them into action through passion-driven projects.',
  },
];
const team = [
  {
    name: 'Chris Columbus',
    role: 'Co-Founder & CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1633210153148-be1c64c030a6?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Charlie Darwin',
    role: 'Co-Founder & CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1602985392664-d823a33836db?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Nelly Bly',
    role: 'Head of Design',
    imageUrl:
      'https://images.unsplash.com/photo-1604946590896-55a1becbe5d6?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Ernie Shackleton',
    role: 'Head of People & Ops',
    imageUrl:
      'https://images.unsplash.com/photo-1577976085628-ea1297582be9?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Frederica Magellan',
    role: 'Lead Frontend Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1563245132-43ac8e6b73e1?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Mark Polo',
    role: 'Lead Backend Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1609637082285-1aa1e1a63c16?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Emily Earhart',
    role: 'Mobile Engineer',
    imageUrl:
      'https://images.unsplash.com/photo-1565374605948-39525344e745?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Ernest Flemingway',
    role: 'Copywriter',
    imageUrl:
      'https://images.unsplash.com/photo-1545843572-37efa8f47704?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
]

export default function About() {

  return (
    <>
      <Header />

      <main className="isolate mt-32">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  Track the journey. Treasure the moments.
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                  Live in the moment while your adventures are saved for later. Our app helps you capture the memories that matter — whether you share them with the world, a loved one, or just keep them for yourself.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt="https://images.unsplash.com/photo-1681767908512-f8e41259338d?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        src="https://images.unsplash.com/photo-1681767908512-f8e41259338d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg pointer-events-none"
                      />
                     
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1530231810657-c657c81a437d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg pointer-events-none"
                      />
                      
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1656764984947-62d237d9d469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg pointer-events-none"
                      />
                      
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1542909356-08e5625abea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg pointer-events-none"
                      />
                      
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1677138732554-7ae0610f19a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg pointer-events-none"
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our goal is to help you plan, track and rekindle every moment, step by step.</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl/8 text-gray-600">
                We’re on a mission to reignite the spirit of exploration. Our app is your personal travel companion — capturing memories, moments, and milestones from your journeys, whether you’re backpacking across continents or finding magic in your own backyard. Every adventure, big or small, shapes who we are and how we see the world.
                </p>
                <p className="mt-10 max-w-xl text-base/7 text-gray-700">
                Our app helps you plan your next trip, log unforgettable moments, and relive the journey through photos and storytelling. From spontaneous road trips to dream destinations, we believe every journey leaves a mark — not just on a map, but on the soul.
                </p>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            className="aspect-5/2 w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our values</h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              What matters to us is that you have a love of exploration and adventure, and a desire to share your experiences with others.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>


        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our team</h2>
            <p className="mt-6 text-lg/8 text-gray-600">
            From remote villages to buzzing capitals, we’ve chased sunsets, lost luggage, made lifelong friends, and found magic in the unknown. We build this app with the same spirit we travel with — bold, curious, and full of heart.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img alt="" src={person.imageUrl} className="mx-auto size-24 rounded-full" />
                <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-sm/6 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>

      
      </main>
      <Footer />
      </>
  )
}
