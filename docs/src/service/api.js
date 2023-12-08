const API = "https://disease.sh/v3/covid-19";

export default async function fetchData(url) {
  try {
    const response = await fetch(`${API}/${url}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
