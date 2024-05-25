import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
interface Country {
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
  name: {
    common: string;
  };
  id: number;
}

export default function Country() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    // Filter countries based on search term and selected region
    let filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <main className="w-full min-h-screen px-10  ">
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 md:mb-0 px-4 py-2 w-full md:w-auto border rounded-lg shadow-md dark:bg-gray-900  "
          />
          {/* Region dropdown */}
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="px-4 py-2 w-full md:w-auto border rounded-lg shadow-md dark:bg-gray-900 "
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md  hover:scale-[1.1] hover:transition-all hover:duration-500 
              dark:border border-black
              "
            >
              <Link to={`/list/${index}`}>
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 hover:transition-all duration-500 hover:text-xl">
                    {country.name.common}
                  </h3>
                  <p className="mb-2">
                    <span className="font-semibold">Population:</span>{" "}
                    {country.population.toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Region:</span>{" "}
                    {country.region}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Capital:</span>{" "}
                    {country.capital}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
