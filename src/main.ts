import * as echarts from 'echarts';
import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes.d.ts';
import * as _ from 'lodash';
import chinaGeoJSON from './assets/json/china.json';
import './assets/styles.css';
import { getProvinceData, ProvinceData } from './data';

function resizeContainer(ele: HTMLElement | null) {
  ele!.style.width = window.innerWidth + 'px';
  ele!.style.height = window.innerHeight + 'px';
}

function tooltipFormatter(params: { data: ProvinceData }): string | undefined {
  const data: ProvinceData = params.data;
  if (!data) { return; }

  let strHtml = '<div>';
  strHtml += '<table cellspacing="8" class="table">';
  strHtml += `<caption>${data.name} (${data.value / 20} 人)</caption>`;

  _.orderBy(data.admissions, 'college')
    .forEach(admission => {
      strHtml += `<tr>
        <td>${admission.college}</td>
        <td>${admission.name}</td>
        <td>${admission.major}</td>
      </tr>`;
    });

  strHtml += '</table>';
  strHtml += '</div>'
  return strHtml;
}

function displayInfo(params: echarts.ECElementEvent) {
  const infoBox = document.getElementById("info_box")!;

  const data: ProvinceData = params.data as ProvinceData;
  if (!data || data.admissions.length == 0) {
    infoBox.style.opacity = "0%";
    return;
  }

  let strHtml = '<div>';
  strHtml += '<table cellspacing="8" class="table">';
  strHtml += `<caption class="info_header">${data.name} (${data.value / 20} 人)</caption>`;

  _.orderBy(data.admissions, 'college')
    .forEach(admission => {
      strHtml += `<tr>
        <td>${admission._college?.city}</td>
        <td>${admission.college}</td>
        <td>${admission.name}</td>
        <td>${admission.major}</td>
      </tr>`;
    });

  strHtml += '</table>';
  strHtml += '</div>'

  infoBox.style.opacity = "100%";
  infoBox.innerHTML = strHtml;
}

function init() {
  const main = document.getElementById("main");
  resizeContainer(main);

  const mapChart = echarts.init(main);
  echarts.registerMap('china', chinaGeoJSON as GeoJSONSourceInput);

  const data = getProvinceData();

  let option1 = {
    visualMap: {
      show: true
    },
    tooltip: {
      trigger: 'item',
      showContent: true,
      alwaysShowContent: false,
      hideDelay: 0,
      formatter: () => ''
    },
    series: [{
      type: 'map',
      map: 'china',
      data: data,

      top: '',
      bottom: '0px',

      roam: true,
      zoom: 1.45,
      scaleLimit: {
        min: 1,
        max: 3
      },

      itemStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: 10,
        areaColor: "rgba(255, 255, 255, 0.3)"
      },

      emphasis: {
        itemStyle: {
          borderWidth: 2,
          areaColor: "#8ec5fc",
        }
      },

      select: {
        itemStyle: {
          areaColor: "#94bfff"
        }
      },

      tooltip: {
        position: 'bottom',
        backgroundColor: "white",
        borderColor: '#9a9c9d',
        textStyle: {
          color: "gray"
        },
        formatter: tooltipFormatter
      }
    }],
  }; //地图的某些配置
  mapChart.setOption(option1);
  mapChart.on('click', displayInfo);
}

init();
