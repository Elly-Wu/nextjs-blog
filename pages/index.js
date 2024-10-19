import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
// import Calendar from '../components/calendar';
import ShopSwiper from '../components/swipers/shop';
import HairdresserSwiper from '../components/swipers/hairdresser';
import LandingSwiper from '../components/swipers/landing';
import styles from '../styles/style.module.css';
import { getSortedPostsData } from '../lib/posts';
// import Link from 'next/link';
// import Date from '../components/date';

export default function Home() {
  // 設定狀態變數來儲存天氣描述、溫度和錯誤訊息
  const [weatherDescription, setWeatherDescription] = useState('')
  const [temperature, setTemperature] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // 使用瀏覽器的 Geolocation API 獲取使用者位置
    const getLocation = () => {
      if (navigator.geolocation) {
        // 如果瀏覽器支援 geolocation，嘗試獲取使用者位置
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 可以在此使用 position.coords.latitude 和 position.coords.longitude 查詢天氣 API，進一步使用經緯度來查詢天氣資料
          },
          (error) => {
            // 若獲取位置失敗，判斷錯誤代碼來決定錯誤訊息
            if (error.code === 1) {
              setError('使用者已拒絕存取位置。')
            } else {
              // 其他情況下的錯誤
              setError('無法獲取位置資訊')
            }
          }
        )
      } else {
        // 當瀏覽器不支援 geolocation 時，設置錯誤訊息
        setError('瀏覽器不支援地理位置')
      }
    }

    // 使用 OpenWeather API 取得天氣資料
    const fetchWeather = async () => {
      try {
        // 使用 axios 發送 GET 請求，取得天氣資料
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-5073C98D-145D-465E-BE14-6918E5D56CC0`
        )

        // 從回應中找到指定地點（這裡是高雄市）的天氣資料
        const locationWeather = response.data.records.location.find((loc) => {
          return loc.locationName === '高雄市' // 預設顯示高雄市的天氣資料
        })

        // 如果成功取得高雄市的天氣資料
        if (locationWeather) {
          // 取得天氣描述（例如：晴天、陰天
          const description =
            locationWeather.weatherElement[0].time[0].parameter.parameterName
          // 取得溫度
          const temp =
            locationWeather.weatherElement[2].time[0].parameter.parameterName
          // 更新狀態來顯示天氣描述和溫度
          setWeatherDescription(description)
          setTemperature(`${temp}°C`)
        } else {
          // 如果無法找到指定地點的天氣資料，設置錯誤訊息
          setError('無法取得指定地點的天氣資料')
        }
      } catch (error) {
        // 如果發生任何錯誤，設置錯誤訊息
        setError('無法取得天氣資料')
      }
    }

    getLocation() // 先嘗試取得使用者位置
    fetchWeather() // 無論是否獲取到位置, 嘗試取得天氣資料
  }, [])
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.blog}>
        <div className={`${styles.blogPart} ${styles.isMenu}`} />
        <div className={`${styles.blogHeader} ${styles.blogIsSticky}`}>
          <div className={`${styles.blogArticle} ${styles.headerArticle}`}>
            <div className={styles.blogBigTitle}>Elly&apos;s</div>
            <div
              className={`${styles.blogMenu} ${styles.rounded} ${styles.smallTitle}`}
            >
              Portfolio
            </div>
          </div>
          <div className={`${styles.blogArticle} ${styles.pageNumber}`}>
            {/* <Calendar /> */}
            {error ? (
              <div>{error}</div>
            ) : weatherDescription && temperature ? (
              <>
                <div>{weatherDescription}</div>
                <div>{temperature}</div>
              </>
            ) : (
              '載入中...'
            )}
          </div>
        </div>
        <div className={styles.blogHeaderContainer}>
          <div className={styles.blogHeader}>
            <div className={`${styles.blogArticle} ${styles.headerArticle}`}>
              <div className={styles.blogBigTitle}>E-store</div>
              <div
                className={`${styles.blogMenu} ${styles.smallTitle} ${styles.date}`}
              >
                08.02.2024
              </div>
            </div>
            <div className={styles.blogArticle}>
              <ShopSwiper />
              <h2>
                The final project of my front-end training is{' '}
                <span>Digital Shop</span> .
              </h2>
              <div className={styles.blogDetail}>
                <span>React/Next& NodeJS/Express</span>
                <span>MySQL</span>
              </div>
              <p>
                We took a reference from several e-stores. One of my tasks is
                setting up an all-products page that can be scrolled infinitely.
                Then I created the release functionality for the product and the
                comment system.
              </p>
              <a href="https://github.com/Elly-Wu/e-store" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-corner-down-right"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 10l5 5-5 5" />
                  <path d="M4 4v7a4 4 0 004 4h12" />
                </svg>
                See More
              </a>
            </div>
          </div>
          <div className={styles.blogHeader}>
            <div className={`${styles.blogArticle} ${styles.headerArticle}`}>
              <div className={styles.blogBigTitle}>Static Site</div>
              <div
                className={`${styles.blogMenu} ${styles.smallTitle} ${styles.date}`}
              >
                03.30.2024
              </div>
            </div>
            <div className={styles.blogArticle}>
            <HairdresserSwiper />
              <h2>
                This page&apos;s name is <span>Hairdresser Anny</span> .
              </h2>
              <div className={styles.blogDetail}>
                <span>Pug& Sass</span>
                <span>Bootstrap+ Swiper+ Gsap</span>
              </div>
              <p>
                My props of this are letting users not only browse the page to
                take a reference but also make a reservation.
              </p>
              <a
                href="https://elly-wu.github.io/Hairdresser-Anny/index.html"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-corner-down-right"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 10l5 5-5 5" />
                  <path d="M4 4v7a4 4 0 004 4h12" />
                </svg>
                See More
              </a>
            </div>
          </div>
          <div className={styles.blogHeader}>
            <div className={`${styles.blogArticle} ${styles.headerArticle}`}>
              <div className={styles.blogBigTitle}>practice</div>
              <div
                className={`${styles.blogMenu} ${styles.smallTitle} ${styles.date}`}
              >
                11.20.2023
              </div>
            </div>
            <div className={styles.blogArticle}>
            <LandingSwiper />
              <h2>
                The <span>flower shop</span> and <span>furniture store</span>{' '}
                are my landing page practice.
              </h2>
              <div className={styles.blogDetail}>
                <span>HTML& CSS& Javascript</span>
                <span>Bootstrap+ jQuery plugin</span>
              </div>
              <p>
                These are my materials from the web design beginner course.
                Practice HTML and CSS without a front-end JavaScript library.
              </p>
              <a href="https://github.com/Elly-Wu/pra-material" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-corner-down-right"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 10l5 5-5 5" />
                  <path d="M4 4v7a4 4 0 004 4h12" />
                </svg>
                See More
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.blogPart} ${styles.rightBlog}`}>
          <div className="marqueeContainer">
            <div className="marquee">
              <span>Hey guys, Welcome to my page.</span>
              <span>I will keep updating my work here!</span>
              <span>I am inspired by the Daily Prophet.</span>
            </div>
          </div>
          <div className={styles.blogRightTitleContainer}>
            <div className={styles.blogRightTitle}></div>
            <div className={`${styles.blogMenu} ${styles.rounded}`}>Skills</div>
          </div>
          <div className={styles.blogRight}>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>1</div>
                <div className="date">03.30.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>HTML+Pug&CSS+Sass</div>
              <div className={styles.blogRightPageSubtitle}>
                Familiar with HTML and PUG document structure. Adapt to
                different languages by using compile tools.
              </div>
            </div>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>2</div>
                <div className="date">08.02.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>React/Next+JSX</div>
              <div className={styles.blogRightPageSubtitle}>
                Making clear code documents keeps team members realizing well. I
                can develop complex single-page applications using the React
                JavaScript library/Next to modularize dynamic and static
                components.
              </div>
            </div>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>3</div>
                <div className="date">08.02.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>
                MySQL+phpMyAdmin & Sequelize+PDO
              </div>
              <div className={styles.blogRightPageSubtitle}>
                Realize database operations and connect it with PHP,
                Node/Express for app development.
              </div>
            </div>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>4</div>
                <div className="date">08.02.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>
                NodeJS/Express & Restful AJAX
              </div>
              <div className={styles.blogRightPageSubtitle}>
                Realizing the development document ensures collaborating well in
                a team. Use Restful AJAX to increase the efficiency of the
                interfaces’ response.
              </div>
            </div>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>5</div>
                <div className="date">08.02.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>
                PHP+PDO & phpMyAdmin
              </div>
              <div className={styles.blogRightPageSubtitle}>
                Fulfill the CRUD operation between the database and application.
              </div>
            </div>
            <div className={styles.blogRightContainer}>
              <div className={styles.blogTitleDate}>
                <div className={styles.blogRightPage}>6</div>
                <div className="date">08.02.2024</div>
              </div>
              <div className={styles.blogRightPageTitle}>Git & GitHub</div>
              <div className={styles.blogRightPageSubtitle}>
                Get used to Git version control and GitHub.
              </div>
            </div>
            <div className={styles.circle}>
              <div className={styles.circleTitle}>Contact</div>
              <div className={styles.circleSubtitle}>elly.winds@gmail.com</div>
              <div className={styles.circleSubtitle}>
                https://github.com/Elly-Wu
              </div>
              <div className={styles.circleFooter}>+886 986 745 906</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .marqueeContainer {
          overflow: hidden;
          position: relative;
          background-color: #ad9676;
          color: #e9e6e4;
          padding: 6px 0;
          width: 100%;
        }

        .marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 10s linear infinite;
        }

        .marquee span {
          display: inline-block;
          padding: 0 20px;
          font-weight: bold;
        }

        .marquee span:before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #e9e6e4;
          margin-right: 16px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
      {/* <section className={utilStyles.headingMd}>
        <p>自我介紹</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
