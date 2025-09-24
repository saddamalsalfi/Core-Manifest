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

// --- STATE MANAGEMENT ---
let currentView = 'overview';
let charts = {}; // To hold chart instances

// --- UI RENDERING FUNCTIONS ---
const contentArea = document.getElementById('content-area');
const mainTitle = document.getElementById('main-title');
const mainSubtitle = document.getElementById('main-subtitle');

const views = {
    overview: {
        title: "Overview",
        subtitle: "A summary of the project's current status and key information.",
        render: () => {
            contentArea.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl border border-slate-200"><h3 class="text-sm font-medium text-slate-500">Version</h3><p class="text-2xl font-semibold text-slate-900 mt-1">${projectData.version}</p></div>
                    <div class="bg-white p-6 rounded-xl border border-slate-200"><h3 class="text-sm font-medium text-slate-500">Status</h3><p class="text-2xl font-semibold text-green-600 mt-1">${projectData.status}</p></div>
                    <div class="bg-white p-6 rounded-xl border border-slate-200"><h3 class="text-sm font-medium text-slate-500">License</h3><p class="text-2xl font-semibold text-slate-900 mt-1">${projectData.license}</p></div>
                    <div class="bg-white p-6 rounded-xl border border-slate-200"><h3 class="text-sm font-medium text-slate-500">Last Updated</h3><p class="text-2xl font-semibold text-slate-900 mt-1">${projectData.lastUpdated}</p></div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div class="lg:col-span-3 card">
                        <h3 class="text-lg font-semibold mb-4">Project Details</h3>
                        <div class="space-y-3 text-slate-600">
                            <p><strong>Project ID:</strong> ${projectData.projectId}</p>
                            <p><strong>Architecture:</strong> ${projectData.architecture}</p>
                            <p><strong>Keywords:</strong> ${projectData.keywords.join(', ')}</p>
                            <p><strong>Documentation:</strong> <a href="${projectData.documentationUrl}" target="_blank" class="text-blue-600 hover:underline">View Docs</a></p>
                            <p><strong>Homepage:</strong> <a href="${projectData.homepageUrl}" target="_blank" class="text-blue-600 hover:underline">Visit Homepage</a></p>
                        </div>
                    </div>
                    <div class="lg:col-span-2 card">
                        <h3 class="text-lg font-semibold mb-4">Technology Stack</h3>
                        <div class="chart-container" style="height: 250px; max-width: 100%;">
                            <canvas id="techStackChart"></canvas>
                        </div>
                    </div>
                </div>
            `;
            renderTechStackChart();
        }
    },
    people: {
        title: "People & Organization",
        subtitle: "Details about the maintainers and the owning organization.",
        render: () => {
            const maintainersHTML = projectData.maintainers.map(m => `
                <div class="card">
                    <h4 class="text-xl font-bold">${m.name}</h4>
                    <p class="text-blue-600 font-medium">${m.role}</p>
                    <p class="text-slate-500 text-sm mt-1">${m.affiliation}</p>
                    <div class="mt-4 border-t pt-4 space-y-2 text-sm">
                        <p><strong>Email:</strong> ${m.email}</p>
                        <p><strong>GitHub:</strong> <a href="https://github.com/${m.github}" target="_blank" class="text-blue-600 hover:underline">${m.github}</a></p>
                        ${m.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${m.linkedin}" target="_blank" class="text-blue-600 hover:underline">View Profile</a></p>` : ''}
                        <p><strong>Time Zone:</strong> ${m.timeZone}</p>
                    </div>
                </div>
            `).join('');
            
            contentArea.innerHTML = `
                <div class="mb-8">
                    <h3 class="text-2xl font-bold mb-4">Maintainers</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${maintainersHTML}
                    </div>
                </div>
                 <div>
                    <h3 class="text-2xl font-bold mb-4">Organization</h3>
                    <div class="card">
                       <h4 class="text-xl font-bold">${projectData.organization.owningEntity}</h4>
                       <div class="mt-4 space-y-2 text-slate-600">
                         <p><strong>Support Contact:</strong> ${projectData.organization.supportContact}</p>
                         <p><strong>Issue Tracker:</strong> ${projectData.organization.issueTracker}</p>
                         <p><strong>Discussions:</strong> <a href="${projectData.organization.communicationChannels.discussions}" target="_blank" class="text-blue-600 hover:underline">GitHub Discussions</a></p>
                       </div>
                    </div>
                </div>
            `;
        }
    },
    technical: {
        title: "Technical Details",
        subtitle: "Information on runtime requirements and deployment methods.",
        render: () => {
            contentArea.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="card">
                        <h3 class="text-xl font-bold mb-4">Runtime Requirements</h3>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li><strong>Environments:</strong> ${projectData.runtimeRequirements.runtimeEnvironments.join(', ')}</li>
                            <li><strong>Dependencies:</strong> ${projectData.runtimeRequirements.dependencies.join(', ')}</li>
                            <li><strong>Optional Libraries:</strong> ${projectData.runtimeRequirements.optionalLibraries.join(', ')}</li>
                            <li><strong>Build Tools:</strong> ${projectData.runtimeRequirements.buildTools.join(', ')}</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3 class="text-xl font-bold mb-4">Deployment</h3>
                         <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li><strong>Methods:</strong> ${projectData.deployment.methods.join(', ')}</li>
                            <li><strong>Cloud Providers:</strong> ${projectData.deployment.cloudProviders.join(', ')}</li>
                            <li><strong>CI/CD Pipelines:</strong> ${projectData.deployment.ciCdPipelines.join(', ')}</li>
                        </ul>
                    </div>
                </div>
            `;
        }
    },
    health: {
        title: "Project Health & Compliance",
        subtitle: "Metrics, status, and compliance information.",
        render: () => {
            const coverage = parseInt(projectData.metrics.testCoverage.replace('%', ''));
            contentArea.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="card">
                        <h3 class="text-xl font-bold mb-4">Metrics</h3>
                        <div class="flex items-center space-x-8">
                            <div class="chart-container" style="height: 150px; width: 150px; max-width: 150px;">
                                <canvas id="coverageChart"></canvas>
                            </div>
                            <div class="space-y-2">
                                 <p><strong>Test Coverage:</strong> <span class="font-semibold text-blue-600">${projectData.metrics.testCoverage}</span></p>
                                 <p><strong>Build Status:</strong> <span class="font-semibold text-green-600">${projectData.metrics.buildStatus}</span></p>
                                 <p><strong>Known Issues:</strong> ${projectData.metrics.knownIssues}</p>
                                 <p><strong>Roadmap:</strong> <a href="${projectData.metrics.roadmapUrl}" target="_blank" class="text-blue-600 hover:underline">View Roadmap</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h3 class="text-xl font-bold mb-4">Compliance</h3>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li><strong>SPDX License ID:</strong> ${projectData.compliance.spdxLicenseId}</li>
                            <li><strong>Funding Sponsor:</strong> ${projectData.compliance.fundingSponsor}</li>
                            <li><strong>Accessibility:</strong> ${projectData.compliance.accessibilityCompliance}</li>
                            <li><strong>Security Audits:</strong> ${projectData.compliance.securityAudits}</li>
                        </ul>
                    </div>
                </div>
            `;
            renderCoverageChart(coverage);
        }
    }
};

function destroyCharts() {
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
}

function renderTechStackChart() {
    if (charts.tech) charts.tech.destroy();
    const ctx = document.getElementById('techStackChart').getContext('d');
    charts.tech = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Languages', 'Frameworks', 'Databases', 'Build Tools'],
            datasets: [{
                label: 'Count',
                data: [
                    projectData.programmingLanguages.length,
                    projectData.frameworks.length,
                    1, 
                    projectData.runtimeRequirements.buildTools.length
                ],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } },
            plugins: { legend: { display: false } }
        }
    });
}

function renderCoverageChart(coverage) {
    if (charts.coverage) charts.coverage.destroy();
    const ctx = document.getElementById('coverageChart').getContext('2d');
    charts.coverage = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Covered', 'Not Covered'],
            datasets: [{
                data: [coverage, 100 - coverage],
                backgroundColor: ['#3b82f6', '#e5e7eb'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } } }
        }
    });
}

function showView(viewName) {
    currentView = viewName;
    const view = views[viewName];
    
    mainTitle.textContent = view.title;
    mainSubtitle.textContent = view.subtitle;

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.sidebar-link[onclick="showView('${viewName}')"]`).classList.add('active');

    destroyCharts();
    view.render();
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    showView('overview');
});
