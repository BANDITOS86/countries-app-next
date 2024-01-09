import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  translations: {
    rus: {
      common: string;
      official: string;
    };
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
};

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 m">
      {countries.map((country) => (
        <Link href={`/country/${country.name.common}`} key={country.name.common}>
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl">
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
              <Image src={country.flags.svg} fill alt={country.flags.svg} />
            </div>
            <h2 className="font-bold text-xl text-center mt-1">
              {country.translations.rus.common}
            </h2>
          </article>
        </Link>
      ))}
    </section>
  );
}
