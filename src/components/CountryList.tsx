// CountryList.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

interface Country {
  capital: string[];
  region: string;
  population: number;
  subregion: string;
  flags: { svg: string };
  name: {
    common: string;
    official: string;
  };
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[]; // Add borders field
}

export function CountryList() {
  let {id}=useParams<string>()
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((res) => {
        console.log("API response:", res.data);
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const countryData: Country = res.data[0];
          setCountry(countryData);
        } else {
          setCountry(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setError("Error fetching country data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  const currencyName = country.currencies
    ? Object.values(country.currencies)[0].name
    : "N/A";
  const languageName = country.languages
    ? Object.values(country.languages)[0]
    : "N/A";
  const topLevelDomain = country.tld ? country.tld[0] : "N/A";

  return (
    <main className="w-full min-h-screen px-10 py-5">
      <Link to="/">
        <button className="w-[100px] h-[40px] border-[1px] 
        shadow-lg shadow-gray-500 dark:shadow-black border-black flex items-center justify-center gap-2">
          <FaArrowLeft />
          Back
        </button>
      </Link>

      <section className="w-full mt-10">
        <div className="">
          <div className="grid lg:flex justify-between items-center">
            <div className="bg-slate-900">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-[550px] object-cover"
              />
            </div>
            <div className="py-3">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold">
                    {country.name.common}
                  </h1>
                  <p className="font-bold pt-3">
                    Native Name: {country.name.official}
                  </p>
                  <p className="pt-5">
                    Population: {country.population.toLocaleString()}
                  </p>
                  <p className="pt-5">Region: {country.region}</p>
                  <p className="pt-5">Subregion: {country.subregion}</p>
                  <p className="pt-5">
                    Capital: {country.capital.join(", ")}
                  </p>
                  <p className="pt-5 ">
                    Borders: <span className="">  {country.borders.join(", ")}  </span>
                  </p>
                </div>
                <div className="mt-[50px]">
                  <p>Top Level Domain: {topLevelDomain}</p>
                  <p className="pt-5">Currency: {currencyName}</p>
                  <p className="pt-5">Language: {languageName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
