import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import DayCard from "@/app/components/DayCard";

async function getWeather() {
    let res =
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&aqi=no`)
    return res.data
}

async function getWeather3(){
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&days=3&aqi=no&alerts=no`)
    return res.data
}

async function getLocation() {
    const res = await axios.get("http://ip-api.com/json");
    return `${res.data.country} ${res.data.city}`
}

export default async function Home() {
    // const current = await getWeather()
    const days3 = await getWeather3()
    return (
        <main className={styles.main}>
            {/*<h1>{current.location.name}</h1>*/}
            {/*<h3>{current.current.temp_c} °C</h3>*/}
            <DayCard data={days3.forecast.forecastday[0].day}></DayCard>
            <DayCard data={days3.forecast.forecastday[1].day}></DayCard>
            <DayCard data={days3.forecast.forecastday[2].day}></DayCard>
            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>src/app/page.tsx</code>
                </p>
                <div>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{" "}
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.vercelLogo}
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.grid}>
                <a
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Docs <span>-&gt;</span>
                    </h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                </a>

                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Learn <span>-&gt;</span>
                    </h2>
                    <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
                </a>

                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Templates <span>-&gt;</span>
                    </h2>
                    <p>Explore starter templates for Next.js.</p>
                </a>

                <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>
                        Deploy <span>-&gt;</span>
                    </h2>
                    <p>
                        Instantly deploy your Next.js site to a shareable URL with Vercel.
                    </p>
                </a>
            </div>
        </main>
    );
}
