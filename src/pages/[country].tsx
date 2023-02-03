import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { fetcher } from "lib/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fetchCountry = await fetch(`https://restcountries.com/v3.1/name/${params?.country}`);
  const countryData = await fetchCountry.json();
  if (!countryData) {
    return {
      notFound: true,
    };
  }
  const fetchWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${countryData?.[0]?.name?.official}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  const weatherData = await fetchWeather.json();
  const fetchImages = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${
      `landmarks in ` + countryData?.[0].name?.common
    }&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
  );
  const countryImages = await fetchImages.json();
  return {
    props: { countryData, weatherData, countryImages },
  };
};

export default function CountryPage({
  countryData,
  weatherData,
  countryImages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { country } = router.query;
  const { data, error, isLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${country}`,
    fetcher
  );
  if (error) router.push(`/404`);
  if (isLoading) return <div>Loading...</div>;
  console.log(`Images: `, countryImages);
  console.log(`weather Data: `, weatherData);
  return (
    <>
      <Head>
        <title>{country}</title>
        <meta name="description" content="A website that provides information about countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section>
          <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <h1 className="text-red-900 text-7xl">{countryData[0]?.name?.official}</h1>
            <img
              className="w-1/2 h-1/2"
              src={countryImages?.results?.[0].urls?.full}
              alt="country Image"
            />
          </div>
        </section>
      </main>
    </>
  );
}
