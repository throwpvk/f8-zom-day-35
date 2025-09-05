import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Weather.module.scss";

const weatherTypes = [
  { weather: "Nắng", icon: "☀️" },
  { weather: "Nắng gắt", icon: "🌞" },
  { weather: "Nắng dịu", icon: "🌅" },
  { weather: "Nắng nóng kỷ lục", icon: "🔥" },

  { weather: "Có mây", icon: "🌤️" },
  { weather: "Nhiều mây", icon: "☁️" },
  { weather: "Mây rải rác", icon: "⛅" },
  { weather: "Trời u ám", icon: "🌥️" },

  { weather: "Mưa nhẹ", icon: "🌦️" },
  { weather: "Mưa vừa", icon: "🌧️" },
  { weather: "Mưa to", icon: "🌨️" },
  { weather: "Mưa phùn", icon: "💧" },
  { weather: "Mưa rào", icon: "🌦️" },
  { weather: "Mưa đá", icon: "🧊" },

  { weather: "Giông bão", icon: "⛈️" },
  { weather: "Sấm sét", icon: "⚡" },
  { weather: "Bão nhiệt đới", icon: "🌀" },
  { weather: "Lốc xoáy", icon: "🌪️" },

  { weather: "Tuyết", icon: "❄️" },
  { weather: "Tuyết rơi nhẹ", icon: "🌨️" },
  { weather: "Bão tuyết", icon: "🌬️" },
  { weather: "Sương giá", icon: "🥶" },
];

const regions = {
  "Đồng bằng sông Hồng": [
    "Hà Nội",
    "Vĩnh Phúc",
    "Bắc Ninh",
    "Quảng Ninh",
    "Hải Dương",
    "Hải Phòng",
    "Hưng Yên",
    "Thái Bình",
    "Hà Nam",
    "Nam Định",
    "Ninh Bình",
  ],
  "Trung du miền núi phía Bắc": [
    "Hà Giang",
    "Cao Bằng",
    "Bắc Kạn",
    "Tuyên Quang",
    "Lào Cai",
    "Yên Bái",
    "Thái Nguyên",
    "Lạng Sơn",
    "Bắc Giang",
    "Phú Thọ",
    "Điện Biên",
    "Lai Châu",
    "Sơn La",
    "Hoà Bình",
  ],
  "Miền Trung": [
    "Thanh Hoá",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên Huế",
    "Đà Nẵng",
    "Quảng Nam",
    "Quảng Ngãi",
    "Bình Định",
    "Phú Yên",
    "Khánh Hoà",
    "Ninh Thuận",
    "Bình Thuận",
  ],
  "Tây Nguyên": ["Kon Tum", "Gia Lai", "Đắk Lắk", "Đắk Nông", "Lâm Đồng"],
  "Đông Nam Bộ": [
    "Bình Phước",
    "Tây Ninh",
    "Bình Dương",
    "Đồng Nai",
    "Bà Rịa - Vũng Tàu",
    "TP.HCM",
  ],
  "Đồng bằng sông Cửu Long": [
    "Long An",
    "Tiền Giang",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Đồng Tháp",
    "An Giang",
    "Kiên Giang",
    "Cần Thơ",
    "Hậu Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
  ],
};

const allCities = [].concat(...Object.values(regions));
const weatherDataInit = {};
allCities.forEach((city) => {
  const randomType = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  weatherDataInit[city] = {
    city,
    temp: Math.floor(Math.random() * 35) + 5,
    humidity: Math.floor(Math.random() * 101),
    weather: randomType.weather,
    icon: randomType.icon,
  };
});

function mostFrequentWeather(cities, data) {
  const count = {};
  cities.forEach((city) => {
    const w = data[city].weather;
    count[w] = (count[w] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(count));
  const candidates = Object.keys(count).filter((k) => count[k] === maxCount);
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  const icon = data[cities.find((c) => data[c].weather === chosen)].icon;
  return { icon, weather: chosen };
}

function RegionCard({ regionName, cities, weatherData, setWeatherData }) {
  const [selectedCity, setSelectedCity] = useState("all");
  const handleChange = (e) => setSelectedCity(e.target.value);
  const handleRefresh = () => {
    const city = selectedCity === "all" ? cities[Math.floor(Math.random() * cities.length)] : selectedCity;
    setWeatherData((prev) => {
      const newData = { ...prev };
      const randomType = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      newData[city] = {
        ...newData[city],
        temp: Math.floor(Math.random() * 35) + 5,
        humidity: Math.floor(Math.random() * 101),
        weather: randomType.weather,
        icon: randomType.icon,
      };
      return newData;
    });
  };

  const { icon, weather } = mostFrequentWeather(cities, weatherData);
  const displayData =
    selectedCity === "all"
      ? {
          temp: Math.round(cities.reduce((sum, c) => sum + weatherData[c].temp, 0) / cities.length),
          humidity: Math.round(
            cities.reduce((sum, c) => sum + weatherData[c].humidity, 0) / cities.length
          ),
          icon,
          weather,
        }
      : weatherData[selectedCity];

  return (
    <div className={styles.card}>
      <h2>{regionName}</h2>
      <select value={selectedCity} onChange={handleChange}>
        <option value="all">Toàn khu vực</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className={styles.emoji}>{displayData.icon}</div>
      <div className={styles.info}>
        <strong>{selectedCity === "all" ? "Toàn khu vực" : displayData.city}</strong>
      </div>
      <div>Nhiệt độ: {displayData.temp}°C</div>
      <div>Độ ẩm: {displayData.humidity}%</div>
      <div>Thời tiết: {displayData.weather}</div>
      <button onClick={handleRefresh}>Làm mới</button>
    </div>
  );
}

function Weather() {
  const [weatherData, setWeatherData] = useState(weatherDataInit);
  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.homeBtn}>
          <i className="fa-solid fa-house"></i>
          <span> Home</span>
        </Link>
      </div>
      {Object.keys(regions).map((region) => (
        <RegionCard
          key={region}
          regionName={region}
          cities={regions[region]}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
        />
      ))}
    </div>
  );
}

export default Weather;


