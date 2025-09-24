// --- DATA STORE ---
// This object is updated automatically by the converter script.
const projectData = {
    "projectId": "qauproject-2025",
    "projectTitle": "PROJECT INFO SYS",
    "systemSlug": "project-info-sys",
    "version": "1.2.0",
    "releaseDate": "2023-09-10",
    "lastUpdated": "2025-09-15",
    "status": "Active",
    "uiLanguages": [
        "en",
        "ar"
    ],
    "programmingLanguages": [
        "Python",
        "JavaScript"
    ],
    "database": "PostgreSQL",
    "frameworks": [
        "Django",
        "React"
    ],
    "architecture": "Client-Server (REST + WebSockets)",
    "license": "MIT",
    "documentationUrl": "https://docs.qau.edu.ye/",
    "homepageUrl": "https://demo.qau.edu.ye/",
    "keywords": [
        "AI",
        "Machine Learning",
        "CS"
    ],
    "maintainers": [
        {
            "name": "Saddam Al-Slfi",
            "affiliation": "Open Source Lab, Queen Arwa University",
            "role": "CS Developer",
            "email": "saddamalsalfi@qau.edu.ye",
            "github": "saddamalsalfi",
            "orcid": "0000-0002-4006-0193",
            "timeZone": "UTC+3"
        },
        {
            "name": "Eyad Hashim",
            "affiliation": "Swift Soft Pro Ltd.",
            "role": "Backend Engineer",
            "email": "eyad@swiftsoftpro.com",
            "github": "eyadhashim",
            "linkedin": "https://linkedin.com/in/eyadhashim",
            "timeZone": "UTC+0"
        }
    ],
    "organization": {
        "owningEntity": "Open Source Lab, Queen Arwa University",
        "supportContact": "support@qau.edu.ye",
        "issueTracker": "GitHub Issues",
        "communicationChannels": {
            "discussions": "https://github.com/org/repo/discussions",
            "slack": "https://workspace.slack.com/project",
            "mailingList": "project-list@example.com"
        }
    },
    "runtimeRequirements": {
        "runtimeEnvironments": [
            "Linux (Ubuntu 22.04+)",
            "Windows 11",
            "macOS Ventura"
        ],
        "dependencies": [
            "Python >= 3.9",
            "Node.js >= 18",
            "PostgreSQL >= 13"
        ],
        "optionalLibraries": [
            "NumPy >= 1.25",
            "TensorFlow >= 2.15",
            "Express.js >= 5.0"
        ],
        "buildTools": [
            "pip",
            "npm",
            "Docker"
        ]
    },
    "deployment": {
        "methods": [
            "Docker Compose",
            "Kubernetes (Helm Chart)"
        ],
        "cloudProviders": [
            "AWS",
            "Azure",
            "GCP"
        ],
        "ciCdPipelines": [
            "GitHub Actions",
            "Jenkins"
        ]
    },
    "relatedFiles": {
        "readme": "./README.md",
        "contributing": "./CONTRIBUTING.md",
        "codeowners": "./.github/CODEOWNERS",
        "security": "./.github/SECURITY.md",
        "citation": "./CITATION.cff",
        "changelog": "./CHANGELOG.md",
        "releases": "https://github.com/org/repo/releases"
    },
    "compliance": {
        "spdxLicenseId": "MIT",
        "fundingSponsor": "National Research Fund",
        "dataPolicy": "./DATA_POLICY.md",
        "accessibilityCompliance": "WCAG 2.1 AA",
        "securityAudits": "2025-05-12 (SecureCode Inc.)",
        "codeOfConduct": "./CODE_OF_CONDUCT.md"
    },
    "metrics": {
        "testCoverage": "87%",
        "buildStatus": "Passing",
        "knownIssues": "See GitHub Issues label 'known-issue'",
        "roadmapUrl": "./ROADMAP.md"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('projectTitle').textContent = projectData.projectTitle;
    document.getElementById('version-badge').textContent = `v${projectData.version}`;
    document.getElementById('status-badge').innerHTML += projectData.status;
    document.getElementById('maintainerCount').textContent = projectData.maintainers.length;
    document.getElementById('keywordCount').textContent = projectData.keywords.length;

    const maintainersGrid = document.getElementById('maintainers-grid');
    projectData.maintainers.forEach(m => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 transform transition-transform hover:scale-105";
        card.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#00A0B0] to-[#FC913A] flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">${m.name.charAt(0)}</div>
            <div>
                <h4 class="text-xl font-bold text-gray-900">${m.name}</h4>
                <p class="text-gray-600">${m.role}</p>
                <p class="text-sm text-gray-500">${m.affiliation}</p>
            </div>
        `;
        maintainersGrid.appendChild(card);
    });

    const ciCdFlow = document.getElementById('ci-cd-flow');
    projectData.deployment.ciCdPipelines.forEach(tool => {
        const step = document.createElement('div');
        step.className = 'flow-step bg-white rounded shadow-sm font-semibold text-gray-700';
        step.textContent = tool;
        ciCdFlow.appendChild(step);
    });
    const cloudStep = document.createElement('div');
    cloudStep.className = 'flow-step bg-white rounded shadow-sm font-semibold text-gray-700';
    cloudStep.textContent = 'Cloud Providers';
    ciCdFlow.appendChild(cloudStep);
    
    const orgList = document.getElementById('org-list');
    orgList.innerHTML = `
        <li><strong>Entity:</strong> ${projectData.organization.owningEntity}</li>
        <li><strong>Tracker:</strong> ${projectData.organization.issueTracker}</li>
        <li><strong>Support:</strong> ${projectData.organization.supportContact}</li>
    `;

    const complianceList = document.getElementById('compliance-list');
    complianceList.innerHTML = `
        <li><strong>License:</strong> ${projectData.compliance.spdxLicenseId}</li>
        <li><strong>Funding:</strong> ${projectData.compliance.fundingSponsor}</li>
        <li><strong>Accessibility:</strong> ${projectData.compliance.accessibilityCompliance}</li>
        <li><strong>Security Audits:</strong> ${projectData.compliance.securityAudits}</li>
    `;

    const coverageValue = parseFloat(projectData.metrics.testCoverage);
    const coverageCtx = document.getElementById('coverageChart').getContext('2d');
    new Chart(coverageCtx, {
        type: 'doughnut',
        data: {
            labels: ['Covered', 'Not Covered'],
            datasets: [{
                data: [coverageValue, 100 - coverageValue],
                backgroundColor: ['#00A0B0', '#e5e7eb'],
                borderColor: ['#fff'],
                borderWidth: 4,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: { 
                        title: (items) => items[0].label, 
                        label: (item) => `${item.raw}%` 
                    }
                }
            },
            animation: { animateScale: true, animateRotate: true }
        }
    });

    const techStackCtx = document.getElementById('techStackChart').getContext('2d');
    new Chart(techStackCtx, {
        type: 'bar',
        data: {
            labels: ['Languages', 'Frameworks', 'Databases', 'Build Tools'],
            datasets: [{
                label: 'Technology Count',
                data: [
                    projectData.programmingLanguages.length,
                    projectData.frameworks.length,
                    1, // Hardcoded for single database
                    projectData.runtimeRequirements.buildTools.length
                ],
                backgroundColor: ['#FF4E50', '#FC913A', '#F9D423', '#00A0B0'],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 1 } },
                y: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (items) => items[0].label,
                    }
                }
            }
        }
    });
});
