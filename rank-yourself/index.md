---
layout: default
title: Duke of AI | Rank Yourself
---

<section id="rank-yourself">
    <div id="rank-inner" style="display: flex; flex-wrap: nowrap; transition: all 0.5s ease; position: relative;">
        <div id="rank-content" style="flex: 1 1 100%; min-width: 0; transition: flex 0.5s ease;">
            <h1>Where Do You Rank?</h1>
            <p>In the near future, our value and capabilities will be inherently linked to our fluency with Artificial Intelligence. This living glossary serves as a checklist to help you identify your current tier in the new AI hierarchy.</p>
            <p>Review the metrics below and honestly assess where you stand. The goal isn't just to find yourself—it's to figure out what it takes to level up.</p>
        
            <div class="table-wrapper" style="margin-top: 2.5rem; overflow-x: auto;">
                <table class="rank-chart" style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--text-main);">
                            <th style="padding: 1rem; font-weight: 600;">Rank</th>
                            <th style="padding: 1rem; font-weight: 600;">Est. Pop %</th>
                            <th style="padding: 1rem; font-weight: 600;">Awareness</th>
                            <th style="padding: 1rem; font-weight: 600;">Usage</th>
                            <th style="padding: 1rem; font-weight: 600;">Output / Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;"><strong>The Serf</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">84%</a></td>
                            <td style="padding: 1rem;">Knows AI exists (saw it in the news).</td>
                            <td style="padding: 1rem;">Does not use AI. Might resist it.</td>
                            <td style="padding: 1rem;">Manual workflows. Vulnerable to automation.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;"><strong>The Freeman</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~10%</a></td>
                            <td style="padding: 1rem;">Has an account on ChatGPT or similar.</td>
                            <td style="padding: 1rem;">Drafts emails, asks simple questions.</td>
                            <td style="padding: 1rem;">Slight efficiency bump; core work unchanged.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;"><strong>The Knight</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~4.5%</a></td>
                            <td style="padding: 1rem;">Knows models, agents, and their limitations (e.g. Claude vs. GPT).</td>
                            <td style="padding: 1rem;">Daily use: brainstorming, doc summaries, basic code.</td>
                            <td style="padding: 1rem;">Does the work of 1.5 to 2 traditional workers.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;"><strong>The Baron</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~1%</a></td>
                            <td style="padding: 1rem;">Understands prompt engineering &amp; context loading. Follows AI trends like OpenClaw.</td>
                            <td style="padding: 1rem;">Regular agent use.</td>
                            <td style="padding: 1rem;">Executes multi-disciplinary tasks (e.g. coding + UI).</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;"><strong>The Earl</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~0.4%</a></td>
                            <td style="padding: 1rem;">Fluent in most AI usages.</td>
                            <td style="padding: 1rem;">Builds automation tools chaining multiple models/agents.</td>
                            <td style="padding: 1rem;">Operates at the level of a small, well-equipped team.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color); background-color: rgba(0, 0, 0, 0.03);">
                            <td style="padding: 1rem;"><strong>The Duke</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~0.01%</a></td>
                            <td style="padding: 1rem;">Deeply understands AI architectures.</td>
                            <td style="padding: 1rem;">Deploys highly available AI native systems/agents.</td>
                            <td style="padding: 1rem;">Architect level. Creates 10x-100x productivity gains.</td>
                        </tr>
                        <tr>
                            <td style="padding: 1rem;"><strong>The Monarch</strong></td>
                            <td style="padding: 1rem;"><a href="#" class="pop-link" style="color: var(--text-main); text-decoration: underline; text-decoration-style: dotted; cursor: pointer;">~0.0001%</a></td>
                            <td style="padding: 1rem;">Masters the frontier of AI research and science.</td>
                            <td style="padding: 1rem;">Creates foundational models & directs the ecosystem.</td>
                            <td style="padding: 1rem;">Shapes the future of human-AI integration.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="globe-container-wrap">
            <div style="position: relative; width: 350px; height: 350px; margin: auto;">
                <button id="close-globe">X</button>
                <div id="globe-viz" style="width: 100%; height: 100%; border-radius: 50%; overflow: hidden; transform: rotateZ(23.5deg);"></div>
            </div>
        </div>
    </div>

    <style>
        #globe-container-wrap {
            width: 0;
            padding-left: 0;
            opacity: 0;
            position: sticky;
            top: 2rem;
            align-self: flex-start;
            flex-shrink: 0;
            transition: all 0.5s ease;
            overflow: visible;
            z-index: 50;
        }
        #rank-inner.has-globe #globe-container-wrap {
            width: 350px;
            padding-left: 2rem;
            opacity: 1;
        }
        #close-globe {
            position: absolute;
            top: -10px;
            right: -10px;
            z-index: 100;
            padding: 4px 10px;
            cursor: pointer;
            background: var(--border-color, #ccc);
            color: var(--text-main, #000);
            border: none;
            border-radius: 4px;
            font-weight: bold;
            font-family: sans-serif;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        #close-globe:hover { opacity: 1; }
        
        @media (max-width: 900px) {
            #rank-inner.has-globe { flex-direction: column-reverse; }
            #rank-inner.has-globe #globe-container-wrap {
                width: 100%;
                padding-left: 0;
                margin-bottom: 2rem;
                display: flex;
                justify-content: center;
                position: relative;
            }
            #close-globe { right: 0px; top: 0px; margin: 10px; }
        }
    </style>

    <script src="https://unpkg.com/globe.gl"></script>
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        let myGlobe;
        const container = document.getElementById('rank-inner');
        const viz = document.getElementById('globe-viz');
        const closeBtn = document.getElementById('close-globe');

        // General population hubs
        const generalRegions = [
          { lat: 22, lng: 79, var: 8, weight: 1.4 },   // India
          { lat: 35, lng: 105, var: 10, weight: 1.4 }, // China
          { lat: 5, lng: 20, var: 15, weight: 1.2 },   // Africa
          { lat: 48, lng: 10, var: 8, weight: 0.5 },   // Europe
          { lat: 38, lng: -95, var: 10, weight: 0.3 }, // USA
          { lat: -15, lng: -55, var: 12, weight: 0.2 },// South America
          { lat: -5, lng: 110, var: 8, weight: 0.2 },  // Indonesia
          { lat: 35, lng: 135, var: 2, weight: 0.1 },  // Japan
        ];

        // Advanced hubs (focus on US, China, and SV)
        const advancedRegions = [
          { lat: 38, lng: -95, var: 8, weight: 1.5 },  // USA
          { lat: 35, lng: 105, var: 8, weight: 1.2 },  // China
          { lat: 48, lng: 10, var: 5, weight: 0.2 },   // Europe
          { lat: 37, lng: -122, var: 2, weight: 0.5 }, // SF / Silicon Valley Hub
        ];

        function getRandomPoint(regionsList) {
            let maxW = regionsList.reduce((s, r) => s + r.weight, 0);
            let r = Math.random() * maxW;
            let region = regionsList[0];
            for (let reg of regionsList) {
                r -= reg.weight;
                if (r <= 0) { region = reg; break; }
            }
            // Add gaussian-like noise
            const randomN = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;
            return {
                lat: region.lat + randomN() * region.var,
                lng: region.lng + randomN() * region.var,
                size: Math.random() * 0.4 + 0.1,
                color: '#d4a373' 
            };
        }

        function updateGlobeTheme(globeObj) {
            if (!globeObj) return;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const imgUrl = isDark ? 'https://unpkg.com/three-globe/example/img/earth-dark.jpg' : 'https://unpkg.com/three-globe/example/img/earth-day.jpg';
            globeObj.globeImageUrl(imgUrl);
        }

        // Listen for theme changes to swap globe map layer
        const themeObserver = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                if(m.attributeName === 'data-theme') updateGlobeTheme(myGlobe);
            });
        });
        themeObserver.observe(document.documentElement, { attributes: true });

        // Close Globe logic
        closeBtn.addEventListener('click', () => {
            container.classList.remove('has-globe');
        });

        document.querySelectorAll('.pop-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tr = e.target.closest('tr');
                const rankName = tr.querySelector('td:nth-child(1)').innerText.trim();
                const pctStr = e.target.innerText.trim();
                
                container.classList.add('has-globe');

                // Route distribution logic
                const top3 = ["The Earl", "The Duke", "The Monarch"];
                const activeRegions = top3.includes(rankName) ? advancedRegions : generalRegions;

                // Parse percentage to determine number of dots
                const num = parseFloat(pctStr.replace(/[^\d.]/g, ''));
                let count = Math.max(1, Math.round(num * 12)); 
                if (num < 0.01) count = 1;
                // Add a small cluster multiplier for very small percentages so it's visible, but representative
                if (num < 0.1 && num > 0) count = Math.max(1, Math.round(num * 100));

                const gData = [...Array(count).keys()].map(() => getRandomPoint(activeRegions));

                if (!myGlobe) {
                    myGlobe = Globe()(viz)
                      .backgroundColor('rgba(0,0,0,0)')
                      .pointAltitude(0.015)
                      .pointColor('color')
                      .pointRadius('size');
                      
                    myGlobe.controls().autoRotate = true;
                    myGlobe.controls().autoRotateSpeed = 2.0;

                    // Execute after transition finishes so width calculations are accurate
                    setTimeout(() => {
                        myGlobe.width(350).height(350);
                        updateGlobeTheme(myGlobe);
                        myGlobe.pointsData(gData);
                    }, 500);
                } else {
                    myGlobe.pointsData(gData);
                }
            });
        });
    });
    </script>
</section>
