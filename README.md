# Admission Map

将同学们的学校展示在地图上的网页

## 使用方法

1. 克隆仓库

    ```bash
    git clone https://github.com/Stars-sea/admission_map.git
    ```

2. 修改`src/assets/json/admissions.json`文件, 如

    ```json
    [
        {
            "name": "张三",
            "college": "清华大学", // 将从 colleges.json 查找对应省份 (可能不全, 需要手动检测)
            "major": "计算机科学与技术"
        }
    ]
    ```

3. 再在项目根目录运行

    ```bash
    node run dev
    ```

4. 确认无误后用 `node run build` 打包  
   如果不想打包成单网页, 删去 `vite.config.ts` 就行

## 库 / 资源

Apache ECharts: <https://github.com/apache/echarts>

lodash: <https://github.com/lodash/lodash>

地图数据: <https://datav.aliyun.com/portal/school/atlas/area_selector>

思源黑体: <https://github.com/adobe-fonts/source-han-sans>

## 开源许可 / License

GPL v3: <https://github.com/Stars-sea/admission_map/blob/main/LICENSE>
