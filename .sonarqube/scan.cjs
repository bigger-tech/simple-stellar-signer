const scanner = require('sonarqube-scanner');
const argv = require('minimist')(process.argv.slice(2));

const { token, host, project } = argv;

if (!host || !token || !project) {
    throw new Error('Too few arguments');
}

scanner(
    {
        serverUrl: host,
        login: token,
        token: token,
        options: {
            'sonar.projectName': project,
            'sonar.exclusions':
                '**/main.ts, **/configuration/*.ts, **/*.module.ts, **/*.interface.ts, **/*.domain.ts, **/*.enum.ts, **/*.dto.ts, **/*.spec.ts, **/*.client.ts, **/*.errors.ts, **/*.schema.ts, auth.dynamo.utils.ts',
            'sonar.sources': 'src',
            'sonar.language': 'ts',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.sourceEncoding': 'UTF-8',
        },
    },
    () => process.exit(),
);
