import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import world404 from "public/images/world404.png";
import person404 from "public/images/person404.png";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="A website that provides information about countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
      </Head>

      <main className="w-full min-h-screen h-full flex flex-col 2xl:gap-16 gap-12 bg-atlas-404 overflow-y-hidden">
        <section className="w-full 2xl:pt-12 pt-4 relative">
          <div className={`font-heading w-36 flex items-center absolute left-16 text-atlas-gold`}>
            <Link href="/" className="w-full">
              <h1 className="text-5xl leading-atlas-heading antialiased">ATLAS</h1>
            </Link>
          </div>
          <Link
            href="/?search=1"
            className="cursor-pointer  absolute right-24 top-12 w-7 h-7 flex justify-center items-center"
          >
            <span className="w-5 h-5 block rotate-45 border-white border-solid border-b-4 border-l-4"></span>
          </Link>
          <button
            className="cursor-pointer  absolute right-10 top-[3.3rem] w-7 h-7 flex justify-center items-center"
            onClick={() => {
              router.push(`/`);
            }}
          >
            <span className="w-5 h-5 block rotate-45 border-white border-solid border-t-4 border-l-4"></span>
          </button>
        </section>
        <section className="w-full h-full">
          <div className="w-full h-full relative flex justify-end items-end">
            <Image
              src={world404}
              alt="World"
              className="w-110 !max-w-max absolute 2xl:right-40 md:-top-28 md:-right-28 -right-32 2xl:-top-32 top-10 object-cover"
            />
          </div>
          <div className="w-full h-full relative">
            <Image
              src={person404}
              alt="World"
              className="w-56 2xl:h-100 md:h-80 h-60 !max-w-max absolute md:left-24 left-6 2xl:top-80 md:top-60 top-[32rem] object-cover"
            />
          </div>
          <div className="fixed text-atlas-gold w-110 2xl:right-40 md:-right-14 md:top-[31rem] -right-60 2xl:top-[38rem] top-[28rem] flex-col gap-4 flex items-center justify-center antialiased">
            <h1 className={` font-heading font-semibold 2xl:text-9xl md:text-7xl text-4xl`}>404</h1>
            <p className="font-sans md:text-xl text-sm font-semibold">
              Oops, sorry this isn’t the country you’re looking for.
            </p>
            <p className="font-sans text-xs">
              Try to enter a country’s name in the search page please.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
