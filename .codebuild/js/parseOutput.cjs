const fs = require('fs');

const loadReports = {
    snyk: true,
    coverage: true,
};

function parseSnykOutput() {
    let result;

    try {
        const output = JSON.parse(fs.readFileSync('snyk_output.json'));
        const parsedVulnerabilities =
            output.vulnerabilities &&
            output.vulnerabilities
                .map((vulnerability) => {
                    const summary = vulnerability.title;
                    const upgradePath = vulnerability.upgradePath[1];
                    const severity = vulnerability.severity;
                    const fromList = vulnerability.from.join(' > ');

                    return `${summary} (${severity})\n <pre><code>> Found on ${fromList}\n> Upgrade to ${upgradePath} to fix</pre></code>\n`;
                })
                .join('\n');

        result = `### Snyk Report Results \n\n${output.summary} \n\n${parsedVulnerabilities}`;
    } catch (err) {
        loadReports.snyk = false;
    }

    return result;
}

function parseCoverageOutput() {
    try {
        const data = fs.readFileSync('coverage.txt', 'utf-8');
        return `### Coverage Report Results\n<pre><code>${data}
    </pre></code>`;
    } catch (err) {
        loadReports.coverage = false;
    }
}

const snykOutput = parseSnykOutput();
const coverageOutput = parseCoverageOutput();

const result = `${loadReports.snyk ? snykOutput : '### Snyk Report not available'}\n\n${
    loadReports.coverage ? coverageOutput : '### Coverage Report not available'
}`;

console.log(`## Build completed successfully \n<details><summary>View details</summary>\n
  ${result}
</details>`);
