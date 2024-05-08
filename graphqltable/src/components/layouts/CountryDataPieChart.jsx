import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { AllCountrydata } from '@/lib/data';

const CountryDataPieChart = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {

    const storedData = localStorage.getItem('countriesData');
    const data = storedData ? JSON.parse(storedData) : [];
    setCountriesData(data);
    // window.location.reload();
  }, [localStorage.getItem('countriesData')]);


  
  console.log("inside pie chart data are", countriesData);

  const transformData = (data) => {
    const countryCount = {};
    data.forEach(country => {
      if (!countryCount[country.name]) {
        countryCount[country.name] = 1;
      } else {
        countryCount[country.name]++;
      }
    });

    return Object.entries(countryCount).map(([country, count]) => ({
      id: country,
      label: country,
      value: count
    })).filter(item => item.value === 1);
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={transformData(countriesData)}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        enableArcLinkLabels={false}
        enableArcLabels={false}
        legends={[]}
      />
    </div>
  );
};

export default CountryDataPieChart;
