document.addEventListener('DOMContentLoaded', () => {
    let myGlobe;
    const container = document.getElementById('rank-inner');
    const viz = document.getElementById('globe-viz');
    const closeBtn = document.getElementById('close-globe');

    let globalPopData = [];
    let countriesGeojson = null;
    let currentRankData = { num: 100, isTop3: false };

    // Fetch accurate global population data
    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/world_population.csv')
      .then(res => res.text())
      .then(csv => {
          globalPopData = csv.split('\n').slice(1).map(line => {
              const [lat, lng, pop] = line.split(',');
              if(!lat || !lng) return null;
              return { lat: +lat, lng: +lng, pop: +pop };
          }).filter(Boolean);
          
          if (myGlobe) updateGlobeData();
      });

    // Fetch countries GeoJSON for contours
    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(geojson => {
          countriesGeojson = geojson.features;
          if (myGlobe) updateGlobeData();
      });

    function updateGlobeTheme() {
        if (!myGlobe) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            myGlobe.globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
                   .showGlobe(true)
                   .showAtmosphere(true);
        } else {
            myGlobe.globeImageUrl('')
                   .showGlobe(false)
                   .showAtmosphere(false);
        }
        // re-render points since base coloring depends on theme
        if (globalPopData.length) updateGlobeData();
    }

    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            if(m.attributeName === 'data-theme') updateGlobeTheme();
        });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    closeBtn.addEventListener('click', () => {
        container.classList.remove('has-globe');
    });

    function updateGlobeData() {
        if (!globalPopData.length) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const baseColor = isDark ? 'rgba(255,255,255, 0.05)' : 'rgba(0,0,0, 0.15)';
        const highlightColor = isDark ? '#10b981' : '#d4a373'; 
        
        const { num, isTop3, rankName } = currentRankData;

        // Determine active subset size
        let activeCount = Math.max(5, Math.floor(globalPopData.length * (num / 100)));
        if (num < 0.1) activeCount = Math.max(5, Math.floor(globalPopData.length * 0.005));

        let eligible = globalPopData;

        const isTechHub = (c) => {
            const inBeijing = c.lat >= 39 && c.lat <= 41 && c.lng >= 115 && c.lng <= 118;
            const inShanghaiAndHangzhou = c.lat >= 29 && c.lat <= 32 && c.lng >= 119 && c.lng <= 122;
            const inShenzhen = c.lat >= 22 && c.lat <= 24 && c.lng >= 112 && c.lng <= 115;
            const inBayArea = c.lat >= 37 && c.lat <= 39 && c.lng >= -123 && c.lng <= -121;
            const inLA = c.lat >= 33 && c.lat <= 35 && c.lng >= -119 && c.lng <= -117;
            const inNY = c.lat >= 40 && c.lat <= 42 && c.lng >= -75 && c.lng <= -73;
            const inSeattle = c.lat >= 46 && c.lat <= 48 && c.lng >= -123 && c.lng <= -121;
            const inBoston = c.lat >= 41 && c.lat <= 43 && c.lng >= -72 && c.lng <= -70;
            const inAustin = c.lat >= 29.5 && c.lat <= 31 && c.lng >= -99 && c.lng <= -96.5;
            const inLondon = c.lat >= 51 && c.lat <= 52 && c.lng >= -1 && c.lng <= 1;
            const inParis = c.lat >= 48 && c.lat <= 49 && c.lng >= 1.5 && c.lng <= 3.5;
            const inTorontoMontreal = c.lat >= 43 && c.lat <= 46.5 && c.lng >= -80 && c.lng <= -72.5;
            const inTelAviv = c.lat >= 31.5 && c.lat <= 32.5 && c.lng >= 34 && c.lng <= 35.5;
            const inTokyo = c.lat >= 35 && c.lat <= 36.5 && c.lng >= 139 && c.lng <= 140.5;

            return inBeijing || inShanghaiAndHangzhou || inShenzhen || inBayArea || inLA || inNY || inSeattle || inBoston || 
                   inAustin || inLondon || inParis || inTorontoMontreal || inTelAviv || inTokyo;
        };

        if (rankName === "The Monarch") {
            // Strictly specific Tech Hubs
            eligible = globalPopData.filter(isTechHub);
        } else if (isTop3) {
            // The Earl, The Duke (+EU)
            eligible = globalPopData.filter(c => {
                const inEU = c.lat >= 40 && c.lat <= 60 && c.lng >= -10 && c.lng <= 30;
                return isTechHub(c) || inEU;
            });
        }
        
        // Randomly pick `activeCount` from eligible
        let shuffled = [...eligible].sort(() => 0.5 - Math.random());
        let selectedSet = new Set(shuffled.slice(0, activeCount));

        const gData = globalPopData.map(c => {
            const active = selectedSet.has(c);
            return {
                lat: c.lat,
                lng: c.lng,
                size: active ? (Math.random() * 0.15 + 0.1) : 0.02,
                color: active ? highlightColor : baseColor
            };
        });

        myGlobe.pointsData(gData);

        if (countriesGeojson) {
            const strokeColor = isDark ? 'rgba(255,255,255, 0.15)' : 'rgba(0,0,0, 0.15)';
            myGlobe.polygonsData(countriesGeojson)
                   .polygonCapColor(() => 'rgba(0,0,0,0)')
                   .polygonSideColor(() => 'rgba(0,0,0,0)')
                   .polygonStrokeColor(() => strokeColor)
                   .polygonAltitude(0.005);
        }
    }

    document.querySelectorAll('.pop-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tr = e.target.closest('tr');
            const rankName = tr.querySelector('td:nth-child(1)').innerText.trim();
            const pctStr = e.target.innerText.trim();
            
            container.classList.add('has-globe');

            const top3 = ["The Earl", "The Duke", "The Monarch"];
            const isTop3 = top3.includes(rankName);
            const num = parseFloat(pctStr.replace(/[^\d.]/g, ''));

            currentRankData = { num, isTop3, rankName };

            if (!myGlobe) {
                myGlobe = Globe()(viz)
                  .backgroundColor('rgba(0,0,0,0)')
                  .pointAltitude(0.015)
                  .pointColor('color')
                  .pointRadius('size');
                  
                myGlobe.controls().autoRotate = true;
                myGlobe.controls().autoRotateSpeed = 2.0;

                setTimeout(() => {
                    myGlobe.width(viz.clientWidth).height(viz.clientHeight);
                    updateGlobeTheme();
                }, 500);
            } else {
                updateGlobeData();
            }
        });
    });
});
